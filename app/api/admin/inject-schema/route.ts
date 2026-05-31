import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import PipelineLog from "@/lib/models/PipelineLog";
import { anthropicClient, applyInternalLinks, extractJson } from "@/lib/ai";
import { requireAdmin } from "@/lib/require-admin";
import { logPipelineFailure } from "@/lib/pipeline-log";

export async function POST(request: Request) {
  let articleIdForLogging: string | undefined;
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;

    await connectDB();
    const { articleId, finalContent, h1, slug, metaTitle, metaDescription } =
      (await request.json()) as {
        articleId?: string;
        finalContent?: string;
        h1?: string;
        slug?: string;
        metaTitle?: string;
        metaDescription?: string;
      };

    if (!articleId || !finalContent || !h1 || !slug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    articleIdForLogging = articleId;

    await PipelineLog.create({
      articleId,
      step: "schema",
      status: "started",
      notes: "Schema generation started",
    });

    const response = await anthropicClient.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1600,
      messages: [
        {
          role: "user",
          content: `Generate AEO schema JSON.

Article H1: "${h1}"
Slug: /blog/${slug}
Meta title: "${metaTitle ?? ""}"
Meta description: "${metaDescription ?? ""}"
Site: optimizer360.ai
Article content:
${finalContent}

Return only valid JSON:
{
  "faqSchema": { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [] },
  "articleSchema": { "@context": "https://schema.org", "@type": "Article" },
  "internalLinks": [
    { "anchorText": "GEO optimization", "targetUrl": "/", "context": "..." },
    { "anchorText": "Autonomous Revenue Engine", "targetUrl": "/are", "context": "..." }
  ]
}`,
        },
      ],
    });

    const first = response.content[0];
    if (!first || first.type !== "text") {
      return NextResponse.json({ error: "Unexpected response type" }, { status: 500 });
    }

    const schema = extractJson(first.text);
    const internalLinks = Array.isArray(schema.internalLinks) ? schema.internalLinks : [];
    const linkedContent = applyInternalLinks(finalContent, internalLinks);

    await Article.findByIdAndUpdate(articleId, {
      schemaJson: schema,
      finalContent: linkedContent,
      status: "schema_injected",
    });

    await PipelineLog.create({
      articleId,
      step: "schema",
      status: "completed",
      notes: "Schema injected and links applied",
    });

    return NextResponse.json({ schema, finalContent: linkedContent });
  } catch (error) {
    console.error(error);
    await logPipelineFailure(
      articleIdForLogging,
      "schema",
      error instanceof Error ? error.message : "Failed to inject schema",
    );
    return NextResponse.json({ error: "Failed to inject schema" }, { status: 500 });
  }
}
