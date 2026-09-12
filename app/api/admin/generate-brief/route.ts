import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import Target from "@/lib/models/Target";
import PipelineLog from "@/lib/models/PipelineLog";
import { anthropicClient, extractJson } from "@/lib/ai";
import { requireAdmin } from "@/lib/require-admin";
import { logPipelineFailure } from "@/lib/pipeline-log";
import { DEFAULT_AUTHOR } from "@/lib/default-author";
import { sourcesFromBrief } from "@/lib/excerpt";
import { resolveUniqueArticleSlug } from "@/lib/slug";

export async function POST(request: Request) {
  let articleIdForLogging: string | undefined;
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;

    await connectDB();
    const { articleId, targetId, prompt, keyword, secondaryKeywords } =
      (await request.json()) as {
        articleId?: string;
        targetId?: string;
        prompt?: string;
        keyword?: string;
        secondaryKeywords?: string[];
      };

    if (!articleId || !targetId || !prompt || !keyword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    articleIdForLogging = articleId;

    const response = await anthropicClient.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1200,
      messages: [
        {
          role: "user",
          content: `You are an AEO/GEO content strategist for Optimizer360.
Generate an article brief.

Primary prompt: "${prompt}"
Primary keyword: "${keyword}"
Secondary keywords: ${(secondaryKeywords ?? []).join(", ")}

Rules:
- H1 exact user-style question
- The draft's first 40-60 words must directly answer the H1
- Include both a Sources H2 and an FAQ H2
- 800-1000 words target
- Every statistic MUST include a public https URL in "source". If you cannot cite a public URL, omit the statistic entirely
- Do not invent client names, awards, citation rates, traffic numbers, or guarantees
- Optimizer360.ai never promises citations; engines decide

Return only JSON:
{
  "h1": "...",
  "slug": "...",
  "metaTitle": "...",
  "metaDescription": "...",
  "h2s": ["...", "...", "...", "...", "Sources", "FAQ: Common Questions"],
  "keyPoints": ["...", "...", "...", "..."],
  "statsToInclude": [
    {"stat": "...", "context": "...", "source": "https://..."}
  ],
  "angle": "...",
  "wordCountTarget": 900
}`,
        },
      ],
    });

    const first = response.content[0];
    if (!first || first.type !== "text") {
      return NextResponse.json({ error: "Unexpected response type" }, { status: 500 });
    }
    const brief = extractJson(first.text);
    const candidateSlug =
      typeof brief.slug === "string" && brief.slug.trim().length > 0
        ? brief.slug
        : keyword;
    const uniqueSlug = await resolveUniqueArticleSlug(candidateSlug, articleId);

    const article = await Article.findByIdAndUpdate(
      articleId,
      {
        brief,
        slug: uniqueSlug,
        title: brief.h1 || prompt,
        metaTitle: brief.metaTitle || "",
        metaDescription: brief.metaDescription || "",
        sources: sourcesFromBrief(brief.statsToInclude),
        authorName: DEFAULT_AUTHOR.name,
        authorSlug: DEFAULT_AUTHOR.slug,
        authorRole: DEFAULT_AUTHOR.role,
        status: "draft_pending",
      },
      { new: true },
    );

    if (!article) return NextResponse.json({ error: "Article not found" }, { status: 404 });

    await Target.findByIdAndUpdate(targetId, { status: "in_progress" });
    await PipelineLog.create({
      articleId: article._id,
      step: "brief",
      status: "completed",
      notes: "Brief generated with Claude",
    });

    return NextResponse.json({ brief });
  } catch (error) {
    console.error(error);
    await logPipelineFailure(
      articleIdForLogging,
      "brief",
      error instanceof Error ? error.message : "Failed to generate brief",
    );
    return NextResponse.json({ error: "Failed to generate brief" }, { status: 500 });
  }
}
