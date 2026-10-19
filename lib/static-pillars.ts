import { mergeInjectedSchema } from "@/lib/article-schema";
import { DEFAULT_AUTHOR } from "@/lib/default-author";
import { excerptFromMarkdown, stripMarkdownLinks } from "@/lib/excerpt";
import { PILLAR_ARTICLES, type PillarArticle } from "@/lib/pillar-articles";

const PILLAR_DATE = new Date("2026-09-12T00:00:00.000Z");

export type ResolvedArticle = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  finalContent: string;
  draft: string;
  category: string;
  sources: PillarArticle["sources"];
  authorSlug: string;
  authorName: string;
  authorRole: string;
  published: boolean;
  publishedAt: Date;
  updatedAt: Date;
  createdAt: Date;
  schemaJson: ReturnType<typeof mergeInjectedSchema>;
  wordCount: number;
};

export function pillarToArticle(pillar: PillarArticle): ResolvedArticle {
  const date = pillar.publishedAt ? new Date(pillar.publishedAt) : PILLAR_DATE;
  return {
    slug: pillar.slug,
    title: pillar.title,
    metaTitle: pillar.metaTitle,
    metaDescription: pillar.metaDescription,
    excerpt: pillar.excerpt || excerptFromMarkdown(pillar.content),
    finalContent: pillar.content,
    draft: pillar.content,
    category: pillar.category,
    sources: pillar.sources,
    authorSlug: DEFAULT_AUTHOR.slug,
    authorName: DEFAULT_AUTHOR.name,
    authorRole: DEFAULT_AUTHOR.role,
    published: true,
    publishedAt: date,
    updatedAt: date,
    createdAt: date,
    schemaJson: mergeInjectedSchema({
      article: {
        slug: pillar.slug,
        title: pillar.title,
        metaDescription: pillar.metaDescription,
        publishedAt: date,
        updatedAt: date,
        createdAt: date,
        authorName: DEFAULT_AUTHOR.name,
        authorSlug: DEFAULT_AUTHOR.slug,
      },
      headline: pillar.title,
      fallbackFaq: pillar.faq.map((item) => ({
        question: item.question,
        answer: stripMarkdownLinks(item.answer),
      })),
      internalLinks: [
        { anchorText: "What is AI GEO?", targetUrl: "/ai-seo", context: "Definition briefing" },
        { anchorText: "Request an audit", targetUrl: "/request-audit", context: "Conversion" },
      ],
    }),
    wordCount: pillar.content.split(/\s+/).filter(Boolean).length,
  };
}

export const STATIC_PILLAR_ARTICLES = PILLAR_ARTICLES.map(pillarToArticle);

export function getStaticPillar(slug: string) {
  return STATIC_PILLAR_ARTICLES.find((article) => article.slug === slug) || null;
}
