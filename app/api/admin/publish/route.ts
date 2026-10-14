import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import Target from "@/lib/models/Target";
import PipelineLog from "@/lib/models/PipelineLog";
import { anthropicClient } from "@/lib/ai";
import {
  assertPublishableArticleSchema,
  enforcedArticleSchema,
  mergeInjectedSchema,
} from "@/lib/article-schema";
import { DEFAULT_AUTHOR } from "@/lib/default-author";
import { excerptFromMarkdown, sourcesFromBrief } from "@/lib/excerpt";
import { requireAdmin } from "@/lib/require-admin";
import { logPipelineFailure } from "@/lib/pipeline-log";
import { submitToIndexNow } from "@/lib/indexnow";

async function generateLinkedInDraft(articleTitle: string, articleUrl: string) {
  const response = await anthropicClient.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 500,
    messages: [
      {
        role: "user",
        content: `Write a 150-word LinkedIn post for the Optimizer360 team account.
Topic: ${articleTitle}
URL: ${articleUrl}

Rules:
- Strong opening hook
- Operator-level direct voice
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

    if (article.status === "schema_injected" || article.status === "review_done") {
      const existingSchema = article.schemaJson?.articleSchema;
      try {
        if (existingSchema) {
          assertPublishableArticleSchema(existingSchema);
        } else {
          article.schemaJson = mergeInjectedSchema({
            article,
            headline: article.title || article.brief?.h1 || article.slug,
            claudeFaq: article.schemaJson?.faqSchema,
            internalLinks: article.schemaJson?.internalLinks,
          });
        }
      } catch {
        article.schemaJson = {
          ...(article.schemaJson || {}),
          articleSchema: enforcedArticleSchema(article, article.title || article.slug),
          faqSchema: article.schemaJson?.faqSchema || { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [] },
          internalLinks: article.schemaJson?.internalLinks || [],
        };
      }
      try {
        assertPublishableArticleSchema(article.schemaJson.articleSchema);
      } catch (schemaError) {
        return NextResponse.json(
          {
            error:
              schemaError instanceof Error
                ? schemaError.message
                : "Article schema is invalid. Re-run schema injection.",
          },
          { status: 400 },
        );
      }
    }

    article.authorName = article.authorName || DEFAULT_AUTHOR.name;
    article.authorSlug = article.authorSlug || DEFAULT_AUTHOR.slug;
    article.excerpt = article.excerpt || excerptFromMarkdown(finalContent);
    if (!article.sources?.length) {
      article.sources = sourcesFromBrief(article.brief?.statsToInclude);
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
    if (process.env.NODE_ENV === "production") {
      try {
        indexNowStatus = await submitToIndexNow([
          `https://optimizer360.ai/blog/${article.slug}`,
          "https://optimizer360.ai/feed.xml",
          "https://optimizer360.ai/llms.txt",
          "https://optimizer360.ai/blog",
        ]);
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
