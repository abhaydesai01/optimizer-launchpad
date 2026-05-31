import { notFound, redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import Target from "@/lib/models/Target";

export default async function ArticlePipelinePage({
  params,
}: {
  params: { id: string };
}) {
  await connectDB();
  const article = await Article.findById(params.id).lean();
  if (!article) notFound();
  const target = await Target.findById(article.targetId).lean();
  if (!target) notFound();

  const currentPath =
    article.status === "brief_pending"
      ? "brief"
      : article.status === "draft_pending"
        ? "draft"
        : article.status === "awaiting_review"
          ? "review"
          : article.status === "review_done"
            ? "schema"
            : "publish";

  redirect(`/admin/articles/${params.id}/${currentPath}`);
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  await connectDB();
  const article = await Article.findById(params.id).select("title brief.h1").lean();
  return {
    title: article?.title || article?.brief?.h1 || "Admin Article",
  };
}
