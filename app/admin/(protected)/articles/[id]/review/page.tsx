import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import Target from "@/lib/models/Target";
import { PipelineHeader } from "@/app/admin/components/PipelineHeader";
import { ReviewStepClient } from "@/app/admin/components/ReviewStepClient";

export default async function ReviewStepPage({
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
      <ReviewStepClient
        articleId={String(article._id)}
        draft={article.draft || ""}
        initialNotes={article.humanNotes || ""}
      />
    </main>
  );
}
