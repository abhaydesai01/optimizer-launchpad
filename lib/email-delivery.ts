import { Resend } from "resend";

type SendEmailArgs = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text?: string;
  attachments?: Array<{ filename: string; content: Buffer }>;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendEmailWithRetry(
  resend: Resend,
  args: SendEmailArgs,
  retries = 1,
) {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const result = await resend.emails.send(args);
      if (result.error) {
        throw new Error(result.error.message || "Email provider returned an error");
      }
      if (!result.data?.id) {
        throw new Error("Email provider did not return a delivery id");
      }
      return result.data.id;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown email error");
      if (attempt < retries) {
        await sleep(300);
      }
    }
  }

  throw lastError || new Error("Email delivery failed");
}
