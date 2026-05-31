import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Target from "@/lib/models/Target";
import Article from "@/lib/models/Article";
import PipelineLog from "@/lib/models/PipelineLog";
import { requireAdmin } from "@/lib/require-admin";
import { logPipelineFailure } from "@/lib/pipeline-log";
import { resolveUniqueArticleSlug } from "@/lib/slug";

export async function POST(request: Request) {
  let articleIdForLogging: string | undefined;
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;

    await connectDB();
    const { targetId } = (await request.json()) as { targetId?: string };
    if (!targetId) {
      return NextResponse.json({ error: "targetId is required" }, { status: 400 });
    }

    const target = await Target.findById(targetId);
    if (!target) return NextResponse.json({ error: "Target not found" }, { status: 404 });

    if (target.articleId) {
      return NextResponse.json({
        articleId: String(target.articleId),
        reused: true,
      });
    }

    const slug = await resolveUniqueArticleSlug(target.keyword || target.prompt);

    const article = await Article.create({
      targetId: target._id,
      slug,
      title: target.prompt,
      status: "brief_pending",
    });
    articleIdForLogging = String(article._id);

    target.articleId = article._id;
    target.status = "in_progress";
    await target.save();

    await PipelineLog.create({
      articleId: article._id,
      step: "brief",
      status: "started",
      notes: "Pipeline started from dashboard",
    });

    return NextResponse.json({ articleId: String(article._id) });
  } catch (error) {
    console.error(error);
    await logPipelineFailure(
      articleIdForLogging,
      "brief",
      error instanceof Error ? error.message : "Failed to start pipeline",
    );
    return NextResponse.json({ error: "Failed to start pipeline" }, { status: 500 });
  }
}
