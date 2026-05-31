"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type SchemaPayload = {
  faqSchema: Record<string, unknown>;
  articleSchema: Record<string, unknown>;
  internalLinks: { anchorText: string; targetUrl: string; context: string }[];
};

export function SchemaStepClient({
  articleId,
  payload,
  finalContent,
  h1,
  slug,
  metaTitle,
  metaDescription,
}: {
  articleId: string;
  payload?: SchemaPayload | null;
  finalContent: string;
  h1: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState<SchemaPayload | null>(payload ?? null);
  const [preview, setPreview] = useState(finalContent);

  async function inject() {
    setLoading(true);
    const response = await fetch("/api/admin/inject-schema", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        articleId,
        finalContent: preview,
        h1,
        slug,
        metaTitle,
        metaDescription,
      }),
    });
    const data = await response.json();
    setLoading(false);
    if (data?.schema) {
      setSchema(data.schema);
      if (data.finalContent) setPreview(data.finalContent);
      router.refresh();
    }
  }

  return (
    <section className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
      <h2 className="text-lg font-semibold text-[#222735]">Step 4 — Schema Injection</h2>
      <button
        onClick={inject}
        disabled={loading}
        className="mt-4 rounded-lg bg-[#222735] px-4 py-2 text-sm font-semibold text-white"
      >
        {loading ? "Claude is generating schema..." : "Inject Schema"}
      </button>

      {schema ? (
        <div className="mt-6 space-y-4">
          <pre className="overflow-x-auto rounded-xl border border-[#E2E7F0] bg-[#F8F9FC] p-3 text-xs">
            {JSON.stringify(schema.faqSchema, null, 2)}
          </pre>
          <pre className="overflow-x-auto rounded-xl border border-[#E2E7F0] bg-[#F8F9FC] p-3 text-xs">
            {JSON.stringify(schema.articleSchema, null, 2)}
          </pre>
          <div className="rounded-xl border border-[#E2E7F0] p-3 text-sm">
            <p className="mb-2 font-semibold">Internal links</p>
            <ul className="list-disc pl-5">
              {schema.internalLinks?.map((link) => (
                <li key={`${link.anchorText}-${link.targetUrl}`}>
                  {link.anchorText} → {link.targetUrl}
                </li>
              ))}
            </ul>
          </div>
          <article className="prose prose-sm max-w-none rounded-xl border border-[#E2E7F0] p-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{preview}</ReactMarkdown>
          </article>
          <div className="flex gap-2">
            <button
              onClick={inject}
              className="rounded-lg border border-[#E2E7F0] px-3 py-2 text-xs"
            >
              Regenerate Schema
            </button>
            <button
              onClick={() => router.push(`/admin/articles/${articleId}/publish`)}
              className="rounded-lg bg-[#2563EB] px-3 py-2 text-xs font-semibold text-white"
            >
              Proceed to Publish →
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
