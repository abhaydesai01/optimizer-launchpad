import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import PipelineLog from "@/lib/models/PipelineLog";
import { anthropicClient } from "@/lib/ai";
import { requireAdmin } from "@/lib/require-admin";
import { logPipelineFailure } from "@/lib/pipeline-log";

export async function POST(request: Request) {
  let articleIdForLogging: string | undefined;
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;

    await connectDB();
    const { articleId, notes, changeRequest, approveAsIs } = (await request.json()) as {
      articleId?: string;
      notes?: string;
      changeRequest?: string;
      approveAsIs?: boolean;
    };
    if (!articleId) {
      return NextResponse.json({ error: "articleId is required" }, { status: 400 });
    }
    articleIdForLogging = articleId;

    const article = await Article.findById(articleId);
    if (!article) return NextResponse.json({ error: "Article not found" }, { status: 404 });

    let finalContent = article.finalContent || article.draft || "";
    let status: "review_done" | "awaiting_review" = "review_done";

    if (!approveAsIs) {
      const response = await anthropicClient.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 3500,
        messages: [
          {
            role: "user",
            content: `Rewrite this draft with editor notes.

Editor notes:
${notes ?? ""}

Change requests:
${changeRequest ?? ""}

Current draft:
${article.draft}

Return only the revised markdown article.`,
          },
        ],
      });
      const first = response.content[0];
      if (first && first.type === "text") {
        finalContent = first.text;
      }
      status = "awaiting_review";
    }

    article.humanNotes = [notes, changeRequest].filter(Boolean).join("\n\n");
    article.finalContent = finalContent;
    article.status = status;
    await article.save();

    await PipelineLog.create({
      articleId: article._id,
      step: "review",
      status: "completed",
      notes: approveAsIs ? "Approved in review step" : "Draft regenerated with notes",
    });

    return NextResponse.json({ success: true, status });
  } catch (error) {
    console.error(error);
    await logPipelineFailure(
      articleIdForLogging,
      "review",
      error instanceof Error ? error.message : "Failed to process review",
    );
    return NextResponse.json({ error: "Failed to process review" }, { status: 500 });
  }
}
