"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type QueueResult = {
  ok: boolean;
  processed: number;
  sent: number;
  failed: number;
  error?: string;
};

export function RunFounderQueueButton() {
  const router = useRouter();
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function runQueue() {
    setRunning(true);
    setMessage("");
    setIsError(false);
    try {
      const response = await fetch("/api/jobs/process-founder-emails", {
        method: "POST",
      });
      const result = (await response.json().catch(() => ({}))) as Partial<QueueResult>;

      if (!response.ok || !result.ok) {
        setIsError(true);
        setMessage(result.error || "Failed to run founder queue.");
        return;
      }

      setMessage(
        `Queue run complete: processed ${result.processed ?? 0}, sent ${result.sent ?? 0}, failed ${result.failed ?? 0}.`,
      );
      router.refresh();
    } catch {
      setIsError(true);
      setMessage("Failed to run founder queue.");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="mt-3">
      <button
        onClick={runQueue}
        disabled={running}
        className="rounded-full bg-[#222735] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {running ? "Running queue..." : "Run Founder Queue Now"}
      </button>
      {message ? (
        <p className={`mt-2 text-sm ${isError ? "text-[#DC2626]" : "text-[#15803D]"}`}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
