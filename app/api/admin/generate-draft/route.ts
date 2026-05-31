import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import PipelineLog from "@/lib/models/PipelineLog";
import { anthropicClient } from "@/lib/ai";
import { requireAdmin } from "@/lib/require-admin";
import { logPipelineFailure } from "@/lib/pipeline-log";

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export async function POST(request: Request) {
  let articleIdForLogging: string | undefined;
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;

    await connectDB();
    const { articleId, brief } = (await request.json()) as {
      articleId?: string;
      brief?: {
        h1?: string;
        slug?: string;
        h2s?: string[];
        keyPoints?: string[];
        statsToInclude?: unknown[];
        angle?: string;
        wordCountTarget?: number;
      };
    };

    if (!articleId || !brief) {
      return NextResponse.json({ error: "Missing articleId or brief" }, { status: 400 });
    }
    articleIdForLogging = articleId;

    await PipelineLog.create({
      articleId,
      step: "draft",
      status: "started",
      notes: "Draft generation started",
    });

    const response = await anthropicClient.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: `Write a complete GEO-optimized article in Markdown.

H1: ${brief.h1 ?? ""}
Slug: ${brief.slug ?? ""}
H2 sections: ${(brief.h2s ?? []).join(" | ")}
Key points: ${(brief.keyPoints ?? []).join(" | ")}
Stats to include: ${JSON.stringify(brief.statsToInclude ?? [])}
Angle: ${brief.angle ?? ""}
Word count minimum: ${brief.wordCountTarget ?? 900}

Rules:
1) Start with H1 as title.
2) First paragraph directly answers the H1 in 2-3 sentences.
3) Include source attribution with statistics.
4) End with FAQ section with 5 Q&As.
5) Finish with CTA to free GEO audit.`,
        },
      ],
    });

    const first = response.content[0];
    if (!first || first.type !== "text") {
      return NextResponse.json({ error: "Unexpected response type" }, { status: 500 });
    }

    const draft = first.text.trim();
    const wordCount = countWords(draft);

    await Article.findByIdAndUpdate(articleId, {
      draft,
      finalContent: draft,
      wordCount,
      status: "awaiting_review",
    });

    await PipelineLog.create({
      articleId,
      step: "draft",
      status: "completed",
      notes: `Draft generated (${wordCount} words)`,
    });

    return NextResponse.json({ draft, wordCount });
  } catch (error) {
    console.error(error);
    await logPipelineFailure(
      articleIdForLogging,
      "draft",
      error instanceof Error ? error.message : "Failed to generate draft",
    );
    return NextResponse.json({ error: "Failed to generate draft" }, { status: 500 });
  }
}
