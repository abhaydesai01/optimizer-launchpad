"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Candidate = {
  articleId: string;
  title: string;
  slug: string;
  keyword: string;
  priority: number;
  status: string;
};

type PublishResult = {
  articleId: string;
  title: string;
  success: boolean;
  message: string;
  url?: string;
};

type Props = {
  candidates: Candidate[];
  defaultSelectedIds: string[];
};

const MAX_BULK_PUBLISH = 10;

export function BulkPublishTopKeywords({ candidates, defaultSelectedIds }: Props) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelectedIds);
  const [publishing, setPublishing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<PublishResult[]>([]);

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const selectedCandidates = useMemo(
    () => candidates.filter((candidate) => selectedSet.has(candidate.articleId)),
    [candidates, selectedSet],
  );

  function toggleSelection(articleId: string) {
    setSelectedIds((prev) => {
      if (prev.includes(articleId)) {
        return prev.filter((id) => id !== articleId);
      }
      if (prev.length >= MAX_BULK_PUBLISH) {
        return prev;
      }
      return [...prev, articleId];
    });
  }

  function selectTopTen() {
    setSelectedIds(candidates.slice(0, MAX_BULK_PUBLISH).map((candidate) => candidate.articleId));
  }

  async function publishSelected() {
    if (selectedCandidates.length === 0 || publishing) return;
    setPublishing(true);
    setProgress(0);
    setResults([]);

    const nextResults: PublishResult[] = [];
    for (let index = 0; index < selectedCandidates.length; index += 1) {
      const candidate = selectedCandidates[index];
      try {
        const response = await fetch("/api/admin/publish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ articleId: candidate.articleId }),
        });
        const data = (await response.json().catch(() => ({}))) as {
          success?: boolean;
          error?: string;
          url?: string;
        };

        nextResults.push({
          articleId: candidate.articleId,
          title: candidate.title,
          success: response.ok && Boolean(data.success),
          message:
            response.ok && data.success
              ? "Published"
              : data.error || "Failed to publish",
          url: data.url,
        });
      } catch (error) {
        nextResults.push({
          articleId: candidate.articleId,
          title: candidate.title,
          success: false,
          message: error instanceof Error ? error.message : "Network error",
        });
      }

      setProgress(index + 1);
      setResults([...nextResults]);
    }

    setPublishing(false);
    router.refresh();
  }

  return (
    <section className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[#222735]">Bulk publish top 10 blogs</h2>
          <p className="mt-1 text-sm text-[#646D82]">
            Sorted by target keyword priority. Only publish-ready articles are shown.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={selectTopTen}
            disabled={publishing}
            className="rounded-lg border border-[#D6DEEC] px-3 py-2 text-sm font-medium text-[#1F2740]"
          >
            Select top 10
          </button>
          <button
            onClick={publishSelected}
            disabled={publishing || selectedCandidates.length === 0}
            className="rounded-lg bg-[#10B981] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {publishing
              ? `Publishing ${progress}/${selectedCandidates.length}...`
              : `Publish selected (${selectedCandidates.length})`}
          </button>
        </div>
      </div>

      {candidates.length === 0 ? (
        <div className="mt-4 rounded-xl border border-[#E2E7F0] bg-[#F8FAFC] p-4 text-sm text-[#646D82]">
          No publish-ready articles found yet. Complete review/schema steps first.
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-[#646D82]">
                <th className="pb-2">Select</th>
                <th className="pb-2">Target keyword</th>
                <th className="pb-2">Title</th>
                <th className="pb-2">Priority</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E7F0]">
              {candidates.map((candidate) => (
                <tr key={candidate.articleId}>
                  <td className="py-2 pr-3">
                    <input
                      type="checkbox"
                      checked={selectedSet.has(candidate.articleId)}
                      onChange={() => toggleSelection(candidate.articleId)}
                      disabled={
                        publishing ||
                        (!selectedSet.has(candidate.articleId) &&
                          selectedCandidates.length >= MAX_BULK_PUBLISH)
                      }
                    />
                  </td>
                  <td className="py-2 pr-3 text-[#222735]">{candidate.keyword}</td>
                  <td className="py-2 pr-3 text-[#646D82]">
                    {candidate.title || candidate.slug}
                  </td>
                  <td className="py-2 pr-3 text-[#646D82]">{candidate.priority}</td>
                  <td className="py-2 pr-3 text-[#646D82]">{candidate.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {results.length > 0 ? (
        <div className="mt-4 space-y-2">
          {results.map((result) => (
            <div
              key={result.articleId}
              className={`rounded-lg border p-3 text-sm ${
                result.success
                  ? "border-[#C7F0DF] bg-[#F0FDF4] text-[#065F46]"
                  : "border-[#F5D0D0] bg-[#FEF2F2] text-[#991B1B]"
              }`}
            >
              <p className="font-medium">{result.title}</p>
              <p>{result.message}</p>
              {result.url ? (
                <a href={result.url} className="underline">
                  View live article →
                </a>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
