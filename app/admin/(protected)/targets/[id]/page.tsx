import Link from "next/link";
import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Target from "@/lib/models/Target";
import { StartPipelineButton } from "@/app/admin/components/StartPipelineButton";

export default async function TargetDetailPage({
  params,
}: {
  params: { id: string };
}) {
  await connectDB();
  const target = await Target.findById(params.id).lean();
  if (!target) notFound();

  return (
    <main className="space-y-6">
      <Link href="/admin/targets" className="text-sm text-[#2563EB]">
        ← Back to targets
      </Link>
      <section className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
        <h1 className="display text-2xl font-bold text-[#222735]">{target.prompt}</h1>
        <div className="mt-4 space-y-2 text-sm text-[#646D82]">
          <p>
            <strong className="text-[#222735]">Primary keyword:</strong> {target.keyword}
          </p>
          <p>
            <strong className="text-[#222735]">Secondary keywords:</strong>{" "}
            {target.secondaryKeywords?.join(", ") || "—"}
          </p>
          <p>
            <strong className="text-[#222735]">Priority:</strong> {target.priority}
          </p>
          <p>
            <strong className="text-[#222735]">Status:</strong> {target.status}
          </p>
        </div>
        <div className="mt-6">
          {target.articleId ? (
            <Link
              href={`/admin/articles/${target.articleId}`}
              className="rounded-lg bg-[#222735] px-4 py-2 text-sm font-semibold text-white"
            >
              Open Pipeline
            </Link>
          ) : (
            <StartPipelineButton targetId={String(target._id)} />
          )}
        </div>
      </section>
    </main>
  );
}
