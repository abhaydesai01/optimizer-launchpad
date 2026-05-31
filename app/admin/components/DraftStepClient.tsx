"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function readabilityScore(text: string) {
  const sentences = Math.max(text.split(/[.!?]+/).filter(Boolean).length, 1);
  const words = text.trim().split(/\s+/).filter(Boolean);
  const syllables = words.reduce((count, word) => {
    const syl = word
      .toLowerCase()
      .replace(/e\b/g, "")
      .match(/[aeiouy]{1,2}/g);
    return count + Math.max(1, syl?.length ?? 1);
  }, 0);
  const w = Math.max(words.length, 1);
  return 206.835 - 1.015 * (w / sentences) - 84.6 * (syllables / w);
}

export function DraftStepClient({
  articleId,
  brief,
  initialDraft,
}: {
  articleId: string;
  brief: Record<string, unknown>;
  initialDraft: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState(initialDraft);

  const words = useMemo(
    () => draft.trim().split(/\s+/).filter(Boolean).length,
    [draft],
  );
  const readability = useMemo(() => readabilityScore(draft), [draft]);

  async function generateDraft() {
    setLoading(true);
    const response = await fetch("/api/admin/generate-draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId, brief }),
    });
    const data = await response.json();
    setLoading(false);
    if (data?.draft) {
      setDraft(data.draft);
      router.refresh();
    }
  }

  return (
    <section className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
      <h2 className="text-lg font-semibold text-[#222735]">Step 2 — Generate Draft</h2>
      <button
        onClick={generateDraft}
        disabled={loading}
        className="mt-4 rounded-lg bg-[#222735] px-4 py-2 text-sm font-semibold text-white"
      >
        {loading ? "Claude is writing your article..." : "Generate Draft"}
      </button>

      {draft ? (
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap gap-3 text-xs text-[#646D82]">
            <span className="rounded-full bg-[#EEF2FF] px-2 py-1">Words: {words}</span>
            <span className="rounded-full bg-[#EEF2FF] px-2 py-1">
              Flesch score: {readability.toFixed(1)}
            </span>
          </div>
          <article className="prose prose-sm max-w-none rounded-xl border border-[#E2E7F0] p-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{draft}</ReactMarkdown>
          </article>
          <div className="flex gap-2">
            <button
              onClick={generateDraft}
              className="rounded-lg border border-[#E2E7F0] px-3 py-2 text-xs"
            >
              Regenerate Draft
            </button>
            <button
              onClick={() => router.push(`/admin/articles/${articleId}/review`)}
              className="rounded-lg bg-[#2563EB] px-3 py-2 text-xs font-semibold text-white"
            >
              Proceed to Review →
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
