import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import Target from "@/lib/models/Target";
import { PipelineHeader } from "@/app/admin/components/PipelineHeader";
import { BriefStepClient } from "@/app/admin/components/BriefStepClient";

export default async function BriefStepPage({
  params,
}: {
  params: { id: string };
}) {
  await connectDB();
  const article = await Article.findById(params.id).lean();
  if (!article) notFound();
  const target = await Target.findById(article.targetId).lean();
  if (!target) notFound();

  return (
    <main className="space-y-4">
      <PipelineHeader
        articleId={String(article._id)}
        title={article.title || article.brief?.h1 || target.prompt}
        status={article.status}
        updatedAt={article.updatedAt}
      />
      <BriefStepClient
        articleId={String(article._id)}
        targetId={String(target._id)}
        prompt={target.prompt}
        keyword={target.keyword}
        secondaryKeywords={target.secondaryKeywords || []}
        initialBrief={Object.keys(article.brief || {}).length ? article.brief : null}
      />
    </main>
  );
}
