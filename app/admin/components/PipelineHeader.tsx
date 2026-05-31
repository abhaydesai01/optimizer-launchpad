import { PipelineStatus } from "@/app/admin/components/PipelineStatus";

type PipelineState =
  | "brief_pending"
  | "draft_pending"
  | "awaiting_review"
  | "review_done"
  | "schema_injected"
  | "published";

export function PipelineHeader({
  articleId,
  title,
  status,
  updatedAt,
}: {
  articleId: string;
  title: string;
  status: PipelineState;
  updatedAt: Date;
}) {
  return (
    <section className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h1 className="display text-xl font-semibold text-[#222735]">{title}</h1>
        <span className="rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-semibold text-[#3730A3]">
          {status}
        </span>
      </div>
      <p className="mb-4 text-xs text-[#646D82]">
        Last updated: {new Date(updatedAt).toLocaleString()}
      </p>
      <PipelineStatus articleId={articleId} status={status} />
    </section>
  );
}
