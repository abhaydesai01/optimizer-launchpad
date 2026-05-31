import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";

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
  return {
    title: article.metaTitle || article.title,
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
    <main className="container mx-auto max-w-3xl px-4 py-16">
      <div className="mb-4 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className="inline-flex rounded-full border border-[#D6DEEC] bg-white px-4 py-2 text-sm font-semibold text-[#1f2740] transition-colors hover:bg-[#f4f6fb]"
        >
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

      <p className="mb-2 text-sm text-[#646D82]">
        {article.publishedAt
          ? new Date(article.publishedAt).toLocaleDateString()
          : "Unpublished"}
      </p>
      <h1 className="display text-3xl font-bold text-[#222735] md:text-5xl">
        {article.title}
      </h1>

      <article className="prose prose-slate mt-8 max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.finalContent || article.draft}
        </ReactMarkdown>
      </article>

      {Array.isArray(article.schemaJson?.internalLinks) &&
      article.schemaJson.internalLinks.length > 0 ? (
        <section className="mt-10 rounded-2xl border border-[#E2E7F0] bg-white p-5">
          <h2 className="text-lg font-semibold text-[#222735]">Also read</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {article.schemaJson.internalLinks.map(
              (link: { anchorText: string; targetUrl: string }) => (
                <li key={`${link.anchorText}-${link.targetUrl}`}>
                  <a href={link.targetUrl} className="text-[#2563EB] hover:underline">
                    {link.anchorText}
                  </a>
                </li>
              ),
            )}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
