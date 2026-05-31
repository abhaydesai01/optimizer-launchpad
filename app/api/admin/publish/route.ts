import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import Target from "@/lib/models/Target";
import PipelineLog from "@/lib/models/PipelineLog";
import { anthropicClient } from "@/lib/ai";
import { requireAdmin } from "@/lib/require-admin";
import { logPipelineFailure } from "@/lib/pipeline-log";

async function generateLinkedInDraft(articleTitle: string, articleUrl: string) {
  const response = await anthropicClient.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 500,
    messages: [
      {
        role: "user",
        content: `Write a 150-word LinkedIn post for Salil Chaturvedi.
Topic: ${articleTitle}
URL: ${articleUrl}

Rules:
- Strong opening hook
- Founder-level direct voice
- Max 2 hashtags`,
      },
    ],
  });
  const first = response.content[0];
  return first && first.type === "text" ? first.text.trim() : "";
}

export async function POST(request: Request) {
  let articleIdForLogging: string | undefined;
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;

    await connectDB();
    const { articleId } = (await request.json()) as { articleId?: string };
    if (!articleId) {
      return NextResponse.json({ error: "articleId is required" }, { status: 400 });
    }
    articleIdForLogging = articleId;

    const article = await Article.findById(articleId);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    const finalContent = (article.finalContent || article.draft || "").trim();
    if (!finalContent) {
      return NextResponse.json(
        { error: "Article content is empty. Generate draft before publishing." },
        { status: 400 },
      );
    }

    const allowedStatuses = new Set(["review_done", "schema_injected"]);
    if (!allowedStatuses.has(article.status)) {
      return NextResponse.json(
        {
          error:
            "Article is not ready to publish. Complete review/schema steps first.",
          currentStatus: article.status,
        },
        { status: 400 },
      );
    }

    if (article.status === "schema_injected") {
      const hasArticleSchema =
        Boolean(article.schemaJson) &&
        typeof article.schemaJson === "object" &&
        Boolean((article.schemaJson as Record<string, unknown>).articleSchema);
      if (!hasArticleSchema) {
        return NextResponse.json(
          { error: "Schema is missing. Re-run schema injection before publishing." },
          { status: 400 },
        );
      }
    }

    article.published = true;
    article.publishedAt = new Date();
    article.status = "published";
    article.linkedinDraft = await generateLinkedInDraft(
      article.title || article.brief?.h1 || article.slug,
      `https://optimizer360.ai/blog/${article.slug}`,
    );
    await article.save();

    await Target.findByIdAndUpdate(article.targetId, { status: "published" });

    await PipelineLog.create({
      articleId: article._id,
      step: "publish",
      status: "completed",
      notes: `Published at optimizer360.ai/blog/${article.slug}`,
    });

    let indexNowStatus = "skipped";
    if (process.env.INDEXNOW_KEY) {
      try {
        const pingResponse = await fetch("https://api.indexnow.org/indexnow", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            host: "optimizer360.ai",
            key: process.env.INDEXNOW_KEY,
            urlList: [`https://optimizer360.ai/blog/${article.slug}`],
          }),
        });
        indexNowStatus = pingResponse.ok ? "submitted" : `failed_${pingResponse.status}`;
      } catch (indexNowError) {
        indexNowStatus = "failed_exception";
        await PipelineLog.create({
          articleId: article._id,
          step: "publish",
          status: "failed",
          notes:
            indexNowError instanceof Error
              ? `IndexNow ping failed: ${indexNowError.message}`
              : "IndexNow ping failed",
        });
      }
    }

    if (indexNowStatus !== "skipped" && !indexNowStatus.startsWith("failed_exception")) {
      await PipelineLog.create({
        articleId: article._id,
        step: "publish",
        status: indexNowStatus === "submitted" ? "completed" : "failed",
        notes: `IndexNow status: ${indexNowStatus}`,
      });
    }

    return NextResponse.json({
      success: true,
      url: `/blog/${article.slug}`,
      linkedinDraft: article.linkedinDraft,
      indexNowStatus,
    });
  } catch (error) {
    console.error(error);
    await logPipelineFailure(
      articleIdForLogging,
      "publish",
      error instanceof Error ? error.message : "Failed to publish article",
    );
    return NextResponse.json({ error: "Failed to publish article" }, { status: 500 });
  }
}
