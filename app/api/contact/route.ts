import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { verifyRecaptchaToken } from "@/lib/recaptcha";
import {
  contactOwnerTemplate,
  contactThankYouTemplate,
} from "@/lib/email-templates";
import { sendEmailWithRetry } from "@/lib/email-delivery";
import SubmissionLog from "@/lib/models/SubmissionLog";
import { scheduleFounderEmail } from "@/lib/founder-email-queue";

const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  company: z.string().trim().min(2),
  website: z.string().trim().url(),
  industry: z.string().trim().min(2),
  source: z.string().trim().optional().default("Not specified"),
  recaptchaToken: z.string().trim().optional().default(""),
});

export async function POST(request: Request) {
  let submissionLogId: string | undefined;
  let ownerEmailSent = false;
  let customerEmailSent = false;
  let customerEmailAttempted = false;
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit({
    key: `contact:${clientIp}`,
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!rateLimit.allowed) {
    await connectDB();
    await SubmissionLog.create({
      requestType: "contact",
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
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    await connectDB();
    await SubmissionLog.create({
      requestType: "contact",
      requestStatus: "failed",
      ipAddress: clientIp,
      requestPayload: {
        rawBody: body,
      },
      ownerEmailStatus: "skipped",
      customerEmailStatus: "skipped",
      founderEmailStatus: "skipped",
      notes: "Validation failed for contact request",
    });
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  const payload = parsed.data;
  await connectDB();
  const submissionLog = await SubmissionLog.create({
    requestType: "contact",
    requestStatus: "received",
    ipAddress: clientIp,
    requestPayload: {
      name: payload.name,
      email: payload.email,
      company: payload.company,
      website: payload.website,
      industry: payload.industry,
      source: payload.source,
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
    const resend = new Resend(apiKey as string);
    const ownerRecipient = toEmail as string;
    const ownerEmailId = await sendEmailWithRetry(resend, {
      from: "Optimizer360 <hello@optimizer360.ai>",
      to: [ownerRecipient],
      subject: `New Contact - ${payload.company} (${payload.industry})`,
      html: contactOwnerTemplate({
        name: payload.name,
        email: payload.email,
        company: payload.company,
        website: payload.website,
        industry: payload.industry,
        source: payload.source,
      }),
      text: `New contact form submission
Name: ${payload.name}
Email: ${payload.email}
Company: ${payload.company}
Website: ${payload.website}
Industry: ${payload.industry}
Source: ${payload.source}
Time: ${new Date().toISOString()}`,
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
      subject: "Thank you for contacting Optimizer360",
      html: contactThankYouTemplate({
        name: payload.name,
        company: payload.company,
        calLink,
      }),
      text: `Hi ${payload.name},

Thanks for reaching out to Optimizer360. We have received your request for ${payload.company} and will reply within 24 hours.

Book a call: ${calLink}
Free GEO audit: https://optimizer360.ai/?audit=true

— Team Optimizer360`,
    });
    await SubmissionLog.findByIdAndUpdate(submissionLogId, {
      customerEmailStatus: "sent",
      customerEmailId,
      notes: "Owner and customer emails sent; founder email queued",
    });
    customerEmailSent = true;

    try {
      const scheduledFor = await scheduleFounderEmail(submissionLogId);
      await SubmissionLog.findByIdAndUpdate(submissionLogId, {
        requestStatus: "processed",
        notes: `Owner and customer emails sent; founder email queued for ${scheduledFor.toISOString()}`,
      });
    } catch (scheduleError) {
      await SubmissionLog.findByIdAndUpdate(submissionLogId, {
        requestStatus: "processed",
        founderEmailStatus: "failed",
        founderEmailError:
          scheduleError instanceof Error
            ? scheduleError.message
            : "Failed to queue founder email",
        notes: "Owner and customer emails sent; founder email queue scheduling failed",
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact email delivery failed", error);
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
      notes: "Email delivery failed during contact flow before founder queue scheduling",
    });
    return NextResponse.json(
      { error: "Unable to submit contact request. Email delivery failed." },
      { status: 502 },
    );
  }
}
