import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";

export async function GET() {
  try {
    await connectDB();

    const totalArticles = await Article.countDocuments();
    const publishedArticles = await Article.countDocuments({ published: true });
    const latest = await Article.findOne({ published: true })
      .sort({ publishedAt: -1 })
      .select("slug title publishedAt")
      .lean();

    return NextResponse.json({
      ok: true,
      totalArticles,
      publishedArticles,
      latestPublishedSlug: latest?.slug || null,
      latestPublishedTitle: latest?.title || null,
      latestPublishedAt: latest?.publishedAt || null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown DB error",
      },
      { status: 500 },
    );
  }
}
