"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function StartPipelineButton({ targetId }: { targetId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <button
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        const response = await fetch("/api/admin/start-pipeline", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetId }),
        });
        const data = await response.json();
        setLoading(false);
        if (data?.articleId) router.push(`/admin/articles/${data.articleId}`);
      }}
      className="rounded-lg bg-[#222735] px-4 py-2 text-sm font-semibold text-white"
    >
      {loading ? "Starting..." : "Start Pipeline →"}
    </button>
  );
}
