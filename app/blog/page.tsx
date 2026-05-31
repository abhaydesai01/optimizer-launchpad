import Link from "next/link";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import Target from "@/lib/models/Target";

export const dynamic = "force-dynamic";

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
      <section className="container mx-auto px-4 py-20">
        <Link
          href="/"
          className="inline-flex rounded-full border border-[#D6DEEC] bg-white px-4 py-2 text-sm font-semibold text-[#1f2740] transition-colors hover:bg-[#f4f6fb]"
        >
          ← Back to main website
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-[#222735] md:text-5xl">Blog</h1>
        <article className="mt-8 rounded-2xl border border-[#E2E7F0] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#222735]">
            Blog is temporarily unavailable
          </h2>
          <p className="mt-2 text-sm text-[#646D82]">
            We are having trouble loading articles right now. Please try again in a few
            minutes.
          </p>
        </article>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-[#222735] md:text-5xl">Blog</h1>
      <p className="mt-4 max-w-2xl text-[#646D82]">
        Optimizer360 insights on GEO, AEO, and autonomous distribution systems.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {articles.length === 0 ? (
          <article className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#222735]">No published articles yet</h2>
            <p className="mt-2 text-sm text-[#646D82]">
              Start from the admin pipeline to publish your first post.
            </p>
          </article>
        ) : (
          articles.map((article) => (
            <article
              key={String(article._id)}
              className="rounded-2xl border border-[#E2E7F0] bg-white p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[#00A27A]">
                {targetMap.get(String(article.targetId))?.keyword || "GEO"}
              </p>
              <h2 className="text-lg font-semibold text-[#222735]">{article.title}</h2>
              <p className="mt-2 text-sm text-[#646D82]">{article.metaDescription}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-[#646D82]">
                <span>{Math.max(1, Math.ceil((article.wordCount || 0) / 200))} min read</span>
                <span>
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString()
                    : "Draft"}
                </span>
              </div>
              <Link
                href={`/blog/${article.slug}`}
                className="mt-4 inline-block font-semibold text-[#2563EB]"
              >
                Read article →
              </Link>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
