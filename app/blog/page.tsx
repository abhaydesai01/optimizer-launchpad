import type { Metadata } from "next";
import Link from "next/link";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import Target from "@/lib/models/Target";
import { SubPageShell } from "@/components/marketing/SubPageShell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Optimizer360.ai insights on AI SEO, Generative Engine Optimisation (GEO), and autonomous distribution systems.",
  alternates: { canonical: "https://optimizer360.ai/blog" },
};

export default async function BlogPage() {
  let articles: {
    _id: unknown;
    slug: string;
    title: string;
    metaDescription: string;
    publishedAt?: Date;
    wordCount?: number;
    targetId?: unknown;
  }[] = [];
  let targetMap = new Map<string, { keyword?: string }>();

  try {
    await connectDB();
    articles = await Article.find({ published: true })
      .sort({ publishedAt: -1 })
      .select("slug title metaDescription publishedAt wordCount targetId")
      .lean();

    const targetIds = articles
      .map((article) => article.targetId)
      .filter((value): value is mongoose.Types.ObjectId | string => {
        if (!value) return false;
        return mongoose.Types.ObjectId.isValid(String(value));
      });

    if (targetIds.length > 0) {
      const targets = await Target.find({ _id: { $in: targetIds } })
        .select("keyword")
        .lean();
      targetMap = new Map(targets.map((target) => [String(target._id), target]));
    }
  } catch (error) {
    console.error("Failed to load blog listing:", error);
    return (
      <SubPageShell kicker="Blog" title="Blog is temporarily unavailable">
        <Link href="/" className="mk-btn mk-btn-ghost">
          ← Back to main website
        </Link>
        <article className="mk-card mt-8 p-6">
          <h2 className="text-lg font-semibold text-[var(--paper)]">
            Blog is temporarily unavailable
          </h2>
          <p className="mt-2 text-sm text-[var(--paper-muted)]">
            We are having trouble loading articles right now. Please try again in a few
            minutes.
          </p>
        </article>
      </SubPageShell>
    );
  }

  return (
    <SubPageShell
      kicker="Blog"
      title="Blog"
      intro="Optimizer360.ai insights on GEO, AEO, and autonomous distribution systems."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {articles.length === 0 ? (
          <article className="mk-card p-6">
            <h2 className="text-lg font-semibold text-[var(--paper)]">
              No published articles yet
            </h2>
            <p className="mt-2 text-sm text-[var(--paper-muted)]">
              Start from the admin pipeline to publish your first post.
            </p>
          </article>
        ) : (
          articles.map((article) => (
            <article key={String(article._id)} className="mk-card p-6">
              <p className="mk-kicker">
                {targetMap.get(String(article.targetId))?.keyword || "GEO"}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-[var(--paper)]">
                {article.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--paper-muted)]">
                {article.metaDescription}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-[var(--paper-muted)]">
                <span>{Math.max(1, Math.ceil((article.wordCount || 0) / 200))} min read</span>
                <span>
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString()
                    : "Draft"}
                </span>
              </div>
              <Link
                href={`/blog/${article.slug}`}
                className="mt-4 inline-block font-semibold text-[var(--mint)] hover:text-[var(--mint-strong)]"
              >
                Read article →
              </Link>
            </article>
          ))
        )}
      </div>
    </SubPageShell>
  );
}
