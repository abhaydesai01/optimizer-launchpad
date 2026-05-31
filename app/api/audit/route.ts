import { NextResponse } from "next/server";
import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import { AuditDocument } from "@/components/AuditDocument";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { verifyRecaptchaToken } from "@/lib/recaptcha";
import { sendEmailWithRetry } from "@/lib/email-delivery";
import {
  auditOwnerTemplate,
  auditThankYouTemplate,
} from "@/lib/email-templates";
import SubmissionLog from "@/lib/models/SubmissionLog";
import { scheduleFounderEmail } from "@/lib/founder-email-queue";

const auditSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  brand: z.string().trim().min(2),
  website: z.string().trim().url(),
  industry: z.string().trim().min(2),
  competitors: z.string().trim().optional().default("Not provided"),
  product: z.string().trim().min(5),
  recaptchaToken: z.string().trim().optional().default(""),
});

function auditId() {
  return `AUD-${Date.now().toString(36).toUpperCase()}`;
}

export async function POST(request: Request) {
  let submissionLogId: string | undefined;
  let ownerEmailSent = false;
  let customerEmailSent = false;
  let customerEmailAttempted = false;
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit({
    key: `audit:${clientIp}`,
    limit: 3,
    windowMs: 10 * 60 * 1000,
  });
  if (!rateLimit.allowed) {
    await connectDB();
    await SubmissionLog.create({
      requestType: "audit",
      requestStatus: "blocked",
      ipAddress: clientIp,
      requestPayload: { reason: "rate_limited" },
      ownerEmailStatus: "skipped",
      customerEmailStatus: "skipped",
      founderEmailStatus: "skipped",
      notes: "Request blocked by rate limiter",
    });
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  const body = await request.json().catch(() => ({}));
  const parsed = auditSchema.safeParse(body);
  if (!parsed.success) {
    await connectDB();
    await SubmissionLog.create({
      requestType: "audit",
      requestStatus: "failed",
      ipAddress: clientIp,
      requestPayload: {
        rawBody: body,
      },
      ownerEmailStatus: "skipped",
      customerEmailStatus: "skipped",
      founderEmailStatus: "skipped",
      notes: "Validation failed for audit request",
    });
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  const payload = parsed.data;
  await connectDB();
  const submissionLog = await SubmissionLog.create({
    requestType: "audit",
    requestStatus: "received",
    ipAddress: clientIp,
    requestPayload: {
      name: payload.name,
      email: payload.email,
      brand: payload.brand,
      website: payload.website,
      industry: payload.industry,
      competitors: payload.competitors,
      product: payload.product,
      hasRecaptchaToken: Boolean(payload.recaptchaToken),
    },
    ownerEmailStatus: "pending",
    customerEmailStatus: "pending",
    founderEmailStatus: "pending",
  });
  submissionLogId = String(submissionLog._id);

  const recaptchaConfigured = Boolean(process.env.RECAPTCHA_SECRET_KEY);
  if (recaptchaConfigured) {
    if (!payload.recaptchaToken) {
      await SubmissionLog.findByIdAndUpdate(submissionLogId, {
        requestStatus: "blocked",
        ownerEmailStatus: "skipped",
        customerEmailStatus: "skipped",
        founderEmailStatus: "skipped",
        notes: "Captcha token is missing",
      });
      return NextResponse.json({ error: "Captcha token is missing." }, { status: 400 });
    }
    try {
      const recaptcha = await verifyRecaptchaToken(payload.recaptchaToken, clientIp);
      if (
        !recaptcha.success ||
        (typeof recaptcha.score === "number" && recaptcha.score < 0.5)
      ) {
        await SubmissionLog.findByIdAndUpdate(submissionLogId, {
          requestStatus: "blocked",
          ownerEmailStatus: "skipped",
          customerEmailStatus: "skipped",
          founderEmailStatus: "skipped",
          notes: "Captcha verification failed",
        });
        return NextResponse.json({ error: "Captcha verification failed." }, { status: 400 });
      }
    } catch {
      await SubmissionLog.findByIdAndUpdate(submissionLogId, {
        requestStatus: "blocked",
        ownerEmailStatus: "skipped",
        customerEmailStatus: "skipped",
        founderEmailStatus: "skipped",
        notes: "Captcha verification unavailable",
      });
      return NextResponse.json({ error: "Captcha verification unavailable." }, { status: 503 });
    }
  } else if (process.env.NODE_ENV === "production") {
    await SubmissionLog.findByIdAndUpdate(submissionLogId, {
      requestStatus: "blocked",
      ownerEmailStatus: "skipped",
      customerEmailStatus: "skipped",
      founderEmailStatus: "skipped",
      notes: "Captcha not configured in production",
    });
    return NextResponse.json(
      { error: "Captcha is not configured on the server." },
      { status: 503 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.TO_EMAIL;
  const calLink =
    process.env.NEXT_PUBLIC_CAL_LINK ||
    "https://cal.com/abhay-desai/free-geo-strategy-call-optimizer360";
  const missingEmailVars = [
    !apiKey ? "RESEND_API_KEY" : null,
    !toEmail ? "TO_EMAIL" : null,
  ].filter(Boolean);

  if (missingEmailVars.length > 0) {
    await SubmissionLog.findByIdAndUpdate(submissionLogId, {
      requestStatus: "failed",
      ownerEmailStatus: "skipped",
      customerEmailStatus: "skipped",
      founderEmailStatus: "skipped",
      notes: `Missing email env vars: ${missingEmailVars.join(", ")}`,
    });
    return NextResponse.json(
      {
        error: `Server email configuration is missing: ${missingEmailVars.join(", ")}`,
        missing: missingEmailVars,
      },
      { status: 500 },
    );
  }

  try {
    const id = auditId();
    const resend = new Resend(apiKey as string);
    const ownerRecipient = toEmail as string;
    const pdf = await renderToBuffer(
      AuditDocument({
        brand: payload.brand,
        website: payload.website,
        industry: payload.industry,
        contactName: payload.name,
        competitors: payload.competitors,
        product: payload.product,
      }),
    );

    const ownerEmailId = await sendEmailWithRetry(resend, {
      from: "Optimizer360 <hello@optimizer360.ai>",
      to: [ownerRecipient],
      subject: `⚡ NEW AUDIT REQUEST - ${payload.brand} (${payload.industry})`,
      html: auditOwnerTemplate({
        name: payload.name,
        email: payload.email,
        brand: payload.brand,
        website: payload.website,
        industry: payload.industry,
        competitors: payload.competitors,
        product: payload.product,
        auditId: id,
      }),
      text: `New GEO audit request (${id})
Contact: ${payload.name} <${payload.email}>
Brand: ${payload.brand}
Website: ${payload.website}
Industry: ${payload.industry}
Competitors: ${payload.competitors}
Product: ${payload.product}
Submitted: ${new Date().toISOString()}

Action: prepare and send GEO audit PDF within 48 hours.`,
      attachments: [
        {
          filename: `${id}-geo-audit.pdf`,
          content: pdf,
        },
      ],
    });
    await SubmissionLog.findByIdAndUpdate(submissionLogId, {
      ownerEmailStatus: "sent",
      ownerEmailId,
    });
    ownerEmailSent = true;

    customerEmailAttempted = true;
    const customerEmailId = await sendEmailWithRetry(resend, {
      from: "Abhay at Optimizer360 <hello@optimizer360.ai>",
      to: [payload.email],
      subject: `Your GEO audit request for ${payload.brand} is confirmed`,
      html: auditThankYouTemplate({
        name: payload.name,
        brand: payload.brand,
        calLink,
      }),
      text: `Hi ${payload.name},

Your free GEO audit request for ${payload.brand} has been received.
We will send your personalized report within 48 hours.

Book a strategy call: ${calLink}

— Team Optimizer360`,
    });
    await SubmissionLog.findByIdAndUpdate(submissionLogId, {
      customerEmailStatus: "sent",
      customerEmailId,
      notes: `Owner and customer emails sent for auditId ${id}`,
    });
    customerEmailSent = true;

    try {
      const scheduledFor = await scheduleFounderEmail(submissionLogId);
      await SubmissionLog.findByIdAndUpdate(submissionLogId, {
        requestStatus: "processed",
        notes: `Owner and customer emails sent for auditId ${id}; founder email queued for ${scheduledFor.toISOString()}`,
      });
    } catch (scheduleError) {
      await SubmissionLog.findByIdAndUpdate(submissionLogId, {
        requestStatus: "processed",
        founderEmailStatus: "failed",
        founderEmailError:
          scheduleError instanceof Error
            ? scheduleError.message
            : "Failed to queue founder email",
        notes: `Owner and customer emails sent for auditId ${id}; founder email queue scheduling failed`,
      });
    }

    return NextResponse.json({ ok: true, id });
  } catch (error) {
    console.error("Audit email delivery failed", error);
    await SubmissionLog.findByIdAndUpdate(submissionLogId, {
      requestStatus: "failed",
      ownerEmailStatus: ownerEmailSent ? "sent" : "failed",
      customerEmailStatus: customerEmailAttempted
        ? customerEmailSent
          ? "sent"
          : "failed"
        : "skipped",
      ownerEmailError: ownerEmailSent
        ? ""
        : error instanceof Error
          ? error.message
          : "Email send failed",
      customerEmailError: customerEmailSent
        ? ""
        : customerEmailAttempted
          ? error instanceof Error
            ? error.message
            : "Email send failed"
          : "",
      founderEmailStatus: "skipped",
      founderEmailError: "",
      notes: "Email delivery failed during audit flow before founder queue scheduling",
    });
    return NextResponse.json(
      { error: "Unable to process audit request. Email delivery failed." },
      { status: 502 },
    );
  }
}
