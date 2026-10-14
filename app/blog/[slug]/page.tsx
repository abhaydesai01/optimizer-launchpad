import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BreadcrumbTrail } from "@/components/marketing/BreadcrumbTrail";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { CardGlow } from "@/components/marketing/CardGlow";
import { categoryLabel } from "@/lib/article-categories";
import { withArticleSchemaDefaults } from "@/lib/article-schema";
import { excerptFromMarkdown, stripSecondaryKeywords } from "@/lib/excerpt";
import connectDB from "@/lib/mongodb";
import Article, { type IArticleSource } from "@/lib/models/Article";
import { articleOgImage, pageMeta } from "@/lib/page-metadata";
import { DEFAULT_AUTHOR } from "@/lib/default-author";
import { getStaticPillar, STATIC_PILLAR_ARTICLES } from "@/lib/static-pillars";
import { RETIRED_ARTICLE_SLUGS, isRetiredArticle } from "@/lib/retired-articles.mjs";

export const dynamic = "force-dynamic";

type FaqEntity = {
  name?: string;
  acceptedAnswer?: { text?: string };
};

async function getArticle(slug: string) {
  try {
    await connectDB();
    const fromDb = await Article.findOne({ slug, published: true }).lean();
    if (fromDb) return fromDb;
  } catch (error) {
    console.error(`Failed to load blog article for slug "${slug}":`, error);
  }
  return getStaticPillar(slug);
}

function faqItemsFromSchema(schema: unknown): Array<{ question: string; answer: string }> {
  if (!schema || typeof schema !== "object") return [];
  const mainEntity = (schema as { mainEntity?: FaqEntity[] }).mainEntity;
  if (!Array.isArray(mainEntity)) return [];
  return mainEntity
    .filter((item) => item.name && item.acceptedAnswer?.text)
    .map((item) => ({
      question: item.name as string,
      answer: item.acceptedAnswer?.text as string,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return {};
  const rawTitle = article.metaTitle || article.title;
  const title = rawTitle.replace(/\s*\|\s*Optimizer360\s*$/i, "");
  return pageMeta({
    title,
    description: article.metaDescription || excerptFromMarkdown(article.finalContent || article.draft || title),
    path: `/blog/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
    modifiedTime: article.updatedAt ? new Date(article.updatedAt).toISOString() : undefined,
    authors: [article.authorName || DEFAULT_AUTHOR.name],
    image: articleOgImage(title),
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const authorSlug = article.authorSlug || DEFAULT_AUTHOR.slug;
  const authorName = article.authorName || DEFAULT_AUTHOR.name;
  const published = article.publishedAt ? new Date(article.publishedAt) : undefined;
  const updated = article.updatedAt ? new Date(article.updatedAt) : undefined;
  const lede =
    article.excerpt ||
    excerptFromMarkdown(article.finalContent || article.draft || article.metaDescription || "");
  const faqItems = faqItemsFromSchema(article.schemaJson?.faqSchema);
  const sources: IArticleSource[] = Array.isArray(article.sources)
    ? (article.sources as IArticleSource[])
    : [];
  let related: Array<{ slug: string; title: string }> = [];
  try {
    related = await Article.find({
      published: true,
      slug: { $ne: article.slug, $nin: RETIRED_ARTICLE_SLUGS },
      ...(article.category ? { category: article.category } : {}),
    })
      .sort({ publishedAt: -1 })
      .limit(3)
      .select("slug title")
      .lean();
  } catch {
    related = [];
  }
  if (related.length === 0) {
    related = STATIC_PILLAR_ARTICLES.filter(
      (item) =>
        item.slug !== article.slug &&
        !isRetiredArticle(item.slug) &&
        item.category === article.category,
    ).slice(0, 3);
  }

  return (
    <div className="theme-ink min-h-screen">
      <MarketingNav />
      <CardGlow />
      <main className="mk-wrap max-w-3xl pb-24 pt-52 md:pt-60">
        {article.schemaJson?.faqSchema ? (
          <JsonLd id="faq-schema" data={article.schemaJson.faqSchema} />
        ) : null}
        {article.schemaJson?.articleSchema ? (
          <JsonLd
            id="article-schema"
            data={withArticleSchemaDefaults(article.schemaJson.articleSchema, article)}
          />
        ) : null}

        <BreadcrumbTrail
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: categoryLabel(article.category), href: `/blog?category=${article.category || "geo-explainer"}` },
            { label: article.title },
          ]}
        />

        <p className="mk-kicker">{categoryLabel(article.category)}</p>
        <h1 className="font-serif-display mt-3 text-3xl text-[var(--paper)] md:text-5xl">
          {article.title}
        </h1>
        <p className="mt-5 text-[15px] text-[var(--paper-muted)]">
          <Link href={`/authors/${authorSlug}`} className="text-[var(--mint)] hover:underline">
            {authorName}
          </Link>
          {article.authorRole ? ` · ${article.authorRole}` : null}
          {published
            ? ` · ${published.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
            : null}
          {updated && published && updated.getTime() - published.getTime() > 86400000
            ? ` · Updated ${updated.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
            : null}
        </p>

        {lede ? (
          <p className="mt-8 border-l-2 border-[var(--mint)] pl-4 text-[17px] leading-relaxed text-[var(--paper-soft)]">
            {lede}
          </p>
        ) : null}

        <article className="prose prose-invert mt-8 max-w-none prose-headings:text-[var(--paper)] prose-p:text-[var(--paper-soft)] prose-a:text-[var(--mint)] prose-strong:text-[var(--paper)]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {stripSecondaryKeywords(article.finalContent || article.draft || "")}
          </ReactMarkdown>
        </article>

        {sources.length > 0 ? (
          <section className="mk-card mt-10 p-5">
            <h2 className="text-lg font-semibold text-[var(--paper)]">Sources</h2>
            <ul className="mt-3 space-y-3 text-sm text-[var(--paper-muted)]">
              {sources.map((source) => (
                <li key={`${source.stat}-${source.url || source.context}`}>
                  <p className="text-[var(--paper-soft)]">{source.stat}</p>
                  <p className="mt-1">{source.context}</p>
                  {source.url ? (
                    <a
                      href={source.url}
                      className="mt-1 inline-block text-[var(--mint)] hover:underline"
                      rel="noreferrer"
                      target="_blank"
                    >
                      {source.url}
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {faqItems.length > 0 ? (
          <section className="mt-10 space-y-3">
            <h2 className="text-lg font-semibold text-[var(--paper)]">FAQ</h2>
            {faqItems.map((item) => (
              <details key={item.question} className="mk-card p-5">
                <summary className="cursor-pointer font-medium text-[var(--paper)]">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--paper-muted)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="mk-card mt-10 p-5">
            <h2 className="text-lg font-semibold text-[var(--paper)]">Related</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/blog/${item.slug}`} className="text-[var(--mint)] hover:underline">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {Array.isArray(article.schemaJson?.internalLinks) &&
        article.schemaJson.internalLinks.length > 0 ? (
          <section className="mk-card mt-6 p-5">
            <h2 className="text-lg font-semibold text-[var(--paper)]">Also read</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {article.schemaJson.internalLinks.map(
                (link: { anchorText: string; targetUrl: string }) => (
                  <li key={`${link.anchorText}-${link.targetUrl}`}>
                    <a
                      href={link.targetUrl}
                      className="text-[var(--mint)] hover:underline"
                    >
                      {link.anchorText}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </section>
        ) : null}
      </main>
      <MarketingFooter />
    </div>
  );
}
