"use client";

import { useState } from "react";

export function PublishStepClient({
  articleId,
  title,
  slug,
  wordCount,
  metaTitle,
  metaDescription,
  keyword,
  targetPrompt,
}: {
  articleId: string;
  title: string;
  slug: string;
  wordCount: number;
  metaTitle: string;
  metaDescription: string;
  keyword: string;
  targetPrompt: string;
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; url?: string } | null>(null);

  return (
    <section className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
      <h2 className="text-lg font-semibold text-[#222735]">Step 5 — Publish</h2>
      <p className="mt-2 text-sm text-[#646D82]">One button. Article goes live.</p>

      <div className="mt-4 rounded-xl border border-[#E2E7F0] p-4 text-sm">
        <p>
          <strong>Title:</strong> {title}
        </p>
        <p>
          <strong>URL:</strong> optimizer360.ai/blog/{slug}
        </p>
        <p>
          <strong>Words:</strong> {wordCount}
        </p>
        <p>
          <strong>Read time:</strong> {Math.max(1, Math.ceil(wordCount / 200))} min read
        </p>
        <p>
          <strong>Meta title:</strong> {metaTitle}
        </p>
        <p>
          <strong>Meta description:</strong> {metaDescription}
        </p>
        <p>
          <strong>Target prompt:</strong> {targetPrompt}
        </p>
        <p>
          <strong>Primary keyword:</strong> {keyword}
        </p>
      </div>

      <button
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          const response = await fetch("/api/admin/publish", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ articleId }),
          });
          const data = await response.json();
          setLoading(false);
          setResult(data);
        }}
        className="mt-4 rounded-lg bg-[#10B981] px-5 py-2 text-sm font-semibold text-white"
      >
        {loading ? "Publishing..." : "🚀 Publish Article"}
      </button>

      {result?.success ? (
        <div className="mt-4 rounded-xl border border-[#C7F0DF] bg-[#F0FDF4] p-4 text-sm text-[#065F46]">
          <p className="font-semibold">✓ Article Published</p>
          {result.url ? (
            <a href={result.url} className="underline">
              View live →
            </a>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
