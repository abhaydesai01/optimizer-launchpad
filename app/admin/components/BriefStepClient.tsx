"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type BriefPayload = {
  h1: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h2s: string[];
  keyPoints: string[];
  statsToInclude: { stat: string; context: string; source: string }[];
  angle: string;
  wordCountTarget: number;
};

export function BriefStepClient({
  articleId,
  targetId,
  prompt,
  keyword,
  secondaryKeywords,
  initialBrief,
}: {
  articleId: string;
  targetId: string;
  prompt: string;
  keyword: string;
  secondaryKeywords: string[];
  initialBrief?: BriefPayload | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [brief, setBrief] = useState<BriefPayload | null>(initialBrief ?? null);

  async function generateBrief() {
    setLoading(true);
    const response = await fetch("/api/admin/generate-brief", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId, targetId, prompt, keyword, secondaryKeywords }),
    });
    const data = await response.json();
    setLoading(false);
    if (data?.brief) {
      setBrief(data.brief);
      router.refresh();
    }
  }

  return (
    <section className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
      <h2 className="text-lg font-semibold text-[#222735]">Step 1 — Generate Brief</h2>
      <p className="mt-2 text-sm text-[#646D82]">
        Target prompt: {prompt} | Primary keyword: {keyword}
      </p>
      <button
        onClick={generateBrief}
        disabled={loading}
        className="mt-4 rounded-lg bg-[#222735] px-4 py-2 text-sm font-semibold text-white"
      >
        {loading ? "Claude is building your article brief..." : "Generate Brief"}
      </button>

      {brief ? (
        <div className="mt-6 rounded-xl border border-[#E2E7F0] p-4 text-sm text-[#222735]">
          <p>
            <strong>H1:</strong> {brief.h1}
          </p>
          <p>
            <strong>Slug:</strong> {brief.slug}
          </p>
          <p>
            <strong>Meta title:</strong> {brief.metaTitle}
          </p>
          <p>
            <strong>Meta description:</strong> {brief.metaDescription}
          </p>
          <p className="mt-3 font-semibold">H2 sections</p>
          <ul className="list-disc pl-5">
            {brief.h2s?.map((h2) => <li key={h2}>{h2}</li>)}
          </ul>
          <p className="mt-3 font-semibold">Key points</p>
          <ul className="list-disc pl-5">
            {brief.keyPoints?.map((point) => <li key={point}>{point}</li>)}
          </ul>
          <p className="mt-3 font-semibold">Stats</p>
          <ul className="list-disc pl-5">
            {brief.statsToInclude?.map((stat) => (
              <li key={`${stat.stat}-${stat.source}`}>
                {stat.stat} — {stat.context} ({stat.source})
              </li>
            ))}
          </ul>
          <p className="mt-3">
            <strong>Angle:</strong> {brief.angle}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={generateBrief}
              className="rounded-lg border border-[#E2E7F0] px-3 py-2 text-xs"
            >
              Regenerate Brief
            </button>
            <button
              onClick={() => router.push(`/admin/articles/${articleId}/draft`)}
              className="rounded-lg bg-[#2563EB] px-3 py-2 text-xs font-semibold text-white"
            >
              Approve & Generate Draft →
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
