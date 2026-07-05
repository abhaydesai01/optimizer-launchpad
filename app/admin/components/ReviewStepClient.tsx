"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ReviewStepClient({
  articleId,
  draft,
  initialNotes,
}: {
  articleId: string;
  draft: string;
  initialNotes: string;
}) {
  const router = useRouter();
  const [notes, setNotes] = useState(initialNotes);
  const [changeRequest, setChangeRequest] = useState("");
  const [approveAsIs, setApproveAsIs] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <section className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
      <h2 className="text-lg font-semibold text-[#222735]">Step 3 — Your Review</h2>
      <p className="text-sm text-[#646D82]">
        Read the draft, add your insight, then approve or regenerate.
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <article className="prose prose-sm max-h-[70vh] overflow-y-auto rounded-xl border border-[#E2E7F0] p-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{draft || "No draft yet."}</ReactMarkdown>
        </article>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#222735]">Your perspective</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="h-36 w-full rounded-xl border border-[#E2E7F0] p-3 text-sm"
            placeholder="Add India-specific context or brand POV..."
          />
          <label className="block text-sm font-medium text-[#222735]">
            Anything to remove or change?
          </label>
          <textarea
            value={changeRequest}
            onChange={(e) => setChangeRequest(e.target.value)}
            className="h-24 w-full rounded-xl border border-[#E2E7F0] p-3 text-sm"
            placeholder="Optional specific section changes..."
          />

          <div className="space-y-2 text-sm text-[#222735]">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={approveAsIs}
                onChange={() => setApproveAsIs(true)}
              />
              Yes — draft is good, save notes and continue
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={!approveAsIs}
                onChange={() => setApproveAsIs(false)}
              />
              No — rewrite with my notes first
            </label>
          </div>

          <button
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              await fetch("/api/admin/review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  articleId,
                  notes,
                  changeRequest,
                  approveAsIs,
                }),
              });
              setLoading(false);
              router.refresh();
              if (approveAsIs) {
                router.push(`/admin/articles/${articleId}/schema`);
              }
            }}
            className="rounded-lg bg-[#222735] px-4 py-2 text-sm font-semibold text-white"
          >
            {loading ? "Saving..." : "Save Review Decision →"}
          </button>
        </div>
      </div>
    </section>
  );
}
