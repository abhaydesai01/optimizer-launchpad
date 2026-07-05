import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { CardGlow } from "@/components/marketing/CardGlow";

export const dynamic = "force-dynamic";

async function getArticle(slug: string) {
  try {
    await connectDB();
    return await Article.findOne({ slug, published: true }).lean();
  } catch (error) {
    console.error(`Failed to load blog article for slug "${slug}":`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return {};
  const rawTitle = article.metaTitle || article.title;
  return {
    title: rawTitle.replace(/\s*\|\s*Optimizer360\s*$/i, ""),
    description: article.metaDescription,
    alternates: {
      canonical: `https://optimizer360.ai/blog/${article.slug}`,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  return (
    <div className="theme-ink min-h-screen">
      <MarketingNav />
      <CardGlow />
      <main className="mk-wrap max-w-3xl pb-24 pt-52 md:pt-60">
        <div className="mb-4 flex flex-wrap gap-2">
          <Link href="/blog" className="mk-btn mk-btn-ghost">
            Back to all blogs
          </Link>
        </div>
        {article.schemaJson?.faqSchema ? (
          <Script
            id="faq-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(article.schemaJson.faqSchema),
            }}
          />
        ) : null}
        {article.schemaJson?.articleSchema ? (
          <Script
            id="article-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(article.schemaJson.articleSchema),
            }}
          />
        ) : null}

        <p className="mb-2 text-sm text-[var(--paper-muted)]">
          {article.publishedAt
            ? new Date(article.publishedAt).toLocaleDateString()
            : "Unpublished"}
        </p>
        <h1 className="font-serif-display text-3xl text-[var(--paper)] md:text-5xl">
          {article.title}
        </h1>

        <article className="prose prose-invert mt-8 max-w-none prose-headings:text-[var(--paper)] prose-p:text-[var(--paper-soft)] prose-a:text-[var(--mint)] prose-strong:text-[var(--paper)]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.finalContent || article.draft}
          </ReactMarkdown>
        </article>

        {Array.isArray(article.schemaJson?.internalLinks) &&
        article.schemaJson.internalLinks.length > 0 ? (
          <section className="mk-card mt-10 p-5">
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
