import Link from "next/link";
import { StepCard } from "@/app/admin/components/StepCard";

const steps = [
  { key: "brief", label: "BRIEF", path: "brief" },
  { key: "draft", label: "DRAFT", path: "draft" },
  { key: "review", label: "REVIEW", path: "review" },
  { key: "schema", label: "SCHEMA", path: "schema" },
  { key: "publish", label: "PUBLISH", path: "publish" },
];

const statusOrder = {
  brief_pending: 0,
  draft_pending: 1,
  awaiting_review: 2,
  review_done: 3,
  schema_injected: 4,
  published: 5,
};

export function PipelineStatus({
  articleId,
  status,
}: {
  articleId: string;
  status: keyof typeof statusOrder;
}) {
  const current = statusOrder[status] ?? 0;
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-[760px] items-center gap-2">
        {steps.map((step, index) => {
          const stepStatus =
            index < current
              ? "completed"
              : index === current
                ? "active"
                : "pending";
          return (
            <div key={step.key} className="flex items-center gap-2">
              <Link href={`/admin/articles/${articleId}/${step.path}`}>
                <StepCard step={step.label} status={stepStatus} />
              </Link>
              {index < steps.length - 1 ? (
                <span className="text-[#9AA4B7]">→</span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
