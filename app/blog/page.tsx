import Link from "next/link";
import { EntryCard } from "@/components/marketing/EntryCard";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import { JsonLd } from "@/components/marketing/JsonLd";
import { SubPageShell } from "@/components/marketing/SubPageShell";
import {
  ARTICLE_CATEGORIES,
  ARTICLE_CATEGORY_LABELS,
  categoryLabel,
  isArticleCategory,
} from "@/lib/article-categories";
import { pageMeta } from "@/lib/page-metadata";
import { buildBlogSchema } from "@/lib/schema-library";
import { SITE_URL } from "@/lib/site";
import { STATIC_PILLAR_ARTICLES } from "@/lib/static-pillars";
import { DB_EXCLUDED_SLUGS, isRetiredArticle } from "@/lib/retired-articles.mjs";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  title: "Blog",
  description:
    "Optimizer360.ai insights on AI GEO, Generative Engine Optimisation, citations, schema, and how AI engines choose brands to name.",
  path: "/blog",
});

type BlogPageProps = {
  searchParams?: { category?: string };
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const selected = isArticleCategory(searchParams?.category)
    ? searchParams?.category
    : undefined;

  let articles: {
    _id: unknown;
    slug: string;
    title: string;
    metaDescription: string;
    excerpt?: string;
    publishedAt?: Date;
    wordCount?: number;
    category?: string;
    authorName?: string;
  }[] = [];

  try {
    await connectDB();
    articles = await Article.find({
      published: true,
      slug: { $nin: DB_EXCLUDED_SLUGS },
      ...(selected ? { category: selected } : {}),
    })
      .sort({ publishedAt: -1 })
      .select("slug title metaDescription excerpt publishedAt wordCount category authorName")
      .lean();
  } catch (error) {
    console.error("Failed to load blog listing:", error);
    articles = [];
  }

  const seen = new Set(articles.map((article) => article.slug));
  const extras = STATIC_PILLAR_ARTICLES.filter((article) => {
    if (seen.has(article.slug) || isRetiredArticle(article.slug)) return false;
    return !selected || article.category === selected;
  }).map((article) => ({
    _id: article.slug,
    slug: article.slug,
    title: article.title,
    metaDescription: article.metaDescription,
    excerpt: article.excerpt,
    publishedAt: article.publishedAt,
    wordCount: article.wordCount,
    category: article.category,
    authorName: article.authorName,
  }));
  articles = [...articles, ...extras];

  const blogSchema = buildBlogSchema({
    name: "Optimizer360.ai Blog",
    description:
      "AI GEO and Generative Engine Optimisation explainers from Optimizer360.ai.",
    url: `${SITE_URL}/blog`,
    posts: articles.map((article) => ({
      name: article.title,
      url: `${SITE_URL}/blog/${article.slug}`,
    })),
  });

  return (
    <SubPageShell
      kicker="Blog"
      title="Citation-grade writing on AI GEO."
      intro="Definition-first explainers. No invented statistics. Sources when a number is used."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Blog" },
      ]}
    >
      <JsonLd id="blog-index" data={blogSchema} />
      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`mk-pill ${!selected ? "border-[var(--mint)] text-[var(--mint)]" : ""}`}
        >
          All
        </Link>
        {ARTICLE_CATEGORIES.map((category) => (
          <Link
            key={category}
            href={`/blog?category=${category}`}
            className={`mk-pill ${selected === category ? "border-[var(--mint)] text-[var(--mint)]" : ""}`}
          >
            {ARTICLE_CATEGORY_LABELS[category]}
          </Link>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {articles.length === 0 ? (
          <article className="mk-card p-6">
            <h2 className="text-lg font-semibold text-[var(--paper)]">
              No published articles yet
            </h2>
            <p className="mt-2 text-sm text-[var(--paper-muted)]">
              Seed pillar posts or publish from the admin pipeline.
            </p>
          </article>
        ) : (
          articles.map((article) => (
            <EntryCard
              key={String(article._id)}
              href={`/blog/${article.slug}`}
              label={categoryLabel(article.category)}
              title={article.title}
              meta={
                <span className="flex items-center justify-between gap-4">
                  <span>{article.authorName || "Optimizer360 GEO team"}</span>
                  <span>
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Draft"}
                  </span>
                </span>
              }
            >
              {article.excerpt || article.metaDescription}
            </EntryCard>
          ))
        )}
      </div>
    </SubPageShell>
  );
}
