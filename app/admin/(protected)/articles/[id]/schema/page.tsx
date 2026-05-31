import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import Target from "@/lib/models/Target";
import { PipelineHeader } from "@/app/admin/components/PipelineHeader";
import { SchemaStepClient } from "@/app/admin/components/SchemaStepClient";

export default async function SchemaStepPage({
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
      <SchemaStepClient
        articleId={String(article._id)}
        payload={Object.keys(article.schemaJson || {}).length ? article.schemaJson : null}
        finalContent={article.finalContent || article.draft || ""}
        h1={article.brief?.h1 || article.title || target.prompt}
        slug={article.slug}
        metaTitle={article.metaTitle || article.brief?.metaTitle || ""}
        metaDescription={article.metaDescription || article.brief?.metaDescription || ""}
      />
    </main>
  );
}
