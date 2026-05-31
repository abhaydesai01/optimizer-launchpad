import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import Target from "@/lib/models/Target";
import { PipelineHeader } from "@/app/admin/components/PipelineHeader";
import { PublishStepClient } from "@/app/admin/components/PublishStepClient";

export default async function PublishStepPage({
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
      <PublishStepClient
        articleId={String(article._id)}
        title={article.title || article.brief?.h1 || target.prompt}
        slug={article.slug}
        wordCount={article.wordCount || 0}
        metaTitle={article.metaTitle || ""}
        metaDescription={article.metaDescription || ""}
        keyword={target.keyword}
        targetPrompt={target.prompt}
      />
    </main>
  );
}
