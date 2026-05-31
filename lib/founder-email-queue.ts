import { Resend } from "resend";
import { sendEmailWithRetry } from "@/lib/email-delivery";
import { founderMessageTemplate } from "@/lib/email-templates";
import SubmissionLog from "@/lib/models/SubmissionLog";

export function getFounderEmailDelayMinutes() {
  const parsed = Number(process.env.FOUNDER_EMAIL_DELAY_MINUTES || "7");
  if (!Number.isFinite(parsed)) return 7;
  return Math.min(Math.max(Math.round(parsed), 1), 120);
}

export function getFounderEmailScheduledFor() {
  const delayMinutes = getFounderEmailDelayMinutes();
  return new Date(Date.now() + delayMinutes * 60_000);
}

export async function scheduleFounderEmail(submissionLogId: string) {
  const scheduledFor = getFounderEmailScheduledFor();
  await SubmissionLog.findByIdAndUpdate(submissionLogId, {
    founderEmailStatus: "pending",
    founderEmailScheduledFor: scheduledFor,
    founderEmailError: "",
  });
  return scheduledFor;
}

type FounderPayload = {
  name: string;
  email: string;
  businessName: string;
  industry: string;
};

function parseFounderPayload(
  requestType: string,
  payload: Record<string, unknown>,
): FounderPayload | null {
  const name = typeof payload.name === "string" ? payload.name : "";
  const email = typeof payload.email === "string" ? payload.email : "";
  const industry = typeof payload.industry === "string" ? payload.industry : "your category";

  const businessName =
    requestType === "audit"
      ? typeof payload.brand === "string"
        ? payload.brand
        : ""
      : typeof payload.company === "string"
        ? payload.company
        : "";

  if (!name || !email || !businessName) {
    return null;
  }

  return { name, email, businessName, industry };
}

export async function processFounderEmailQueue(limit = 25) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is required to process founder email queue");
  }

  const calLink =
    process.env.NEXT_PUBLIC_CAL_LINK ||
    "https://cal.com/abhay-desai/free-geo-strategy-call-optimizer360";

  const dueItems = await SubmissionLog.find({
    founderEmailStatus: "pending",
    founderEmailScheduledFor: { $lte: new Date() },
  })
    .sort({ founderEmailScheduledFor: 1 })
    .limit(limit);

  const resend = new Resend(apiKey);
  let processed = 0;
  let sent = 0;
  let failed = 0;

  for (const item of dueItems) {
    processed += 1;
    const payload = parseFounderPayload(
      String(item.requestType),
      (item.requestPayload || {}) as Record<string, unknown>,
    );

    if (!payload) {
      failed += 1;
      await SubmissionLog.findByIdAndUpdate(item._id, {
        founderEmailStatus: "failed",
        founderEmailError: "Founder payload missing required fields",
        founderEmailLastAttemptAt: new Date(),
        $inc: { founderEmailAttempts: 1 },
      });
      continue;
    }

    try {
      const founderEmailId = await sendEmailWithRetry(resend, {
        from: "Abhay at Optimizer360 <hello@optimizer360.ai>",
        to: [payload.email],
        subject: `Founder note: GEO growth for ${payload.businessName}`,
        html: founderMessageTemplate({
          name: payload.name,
          businessName: payload.businessName,
          industry: payload.industry,
          calLink,
        }),
        text: `Hi ${payload.name},

I am Abhay from Optimizer360. Thanks for your request for ${payload.businessName}.

In ${payload.industry}, AI-led discovery is now a core growth lever.
Our approach combines strategy + execution to turn AI visibility into qualified pipeline.

Tagline: Visibility in AI answers becomes pipeline in your CRM.

Book a founder-led GEO call: ${calLink}

— Abhay
Optimizer360`,
      });

      sent += 1;
      await SubmissionLog.findByIdAndUpdate(item._id, {
        founderEmailStatus: "sent",
        founderEmailId,
        founderEmailError: "",
        founderEmailLastAttemptAt: new Date(),
        $inc: { founderEmailAttempts: 1 },
      });
    } catch (error) {
      failed += 1;
      await SubmissionLog.findByIdAndUpdate(item._id, {
        founderEmailStatus: "failed",
        founderEmailError:
          error instanceof Error ? error.message : "Founder email send failed",
        founderEmailLastAttemptAt: new Date(),
        $inc: { founderEmailAttempts: 1 },
      });
    }
  }

  return {
    processed,
    sent,
    failed,
  };
}
