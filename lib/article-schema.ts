import { DEFAULT_AUTHOR } from "@/lib/default-author";
import { articleOgImage } from "@/lib/page-metadata";
import {
  buildArticleSchema,
  buildFAQSchema,
} from "@/lib/schema-library";
import { isValidFaqSchema, validateArticleSchema } from "@/lib/schema-validate";
import { SITE_LOGO_URL, SITE_URL } from "@/lib/site";

type ArticleLike = {
  title?: string;
  slug: string;
  metaDescription?: string;
  publishedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  authorName?: string;
  authorSlug?: string;
};

export function enforcedArticleSchema(article: ArticleLike, headline?: string) {
  const published = article.publishedAt || article.createdAt || new Date();
  const modified = article.updatedAt || published;
  const title = headline || article.title || article.slug;
  return buildArticleSchema({
    headline: title,
    description: article.metaDescription || title,
    url: `${SITE_URL}/blog/${article.slug}`,
    datePublished: new Date(published).toISOString(),
    dateModified: new Date(modified).toISOString(),
    authorName: article.authorName || DEFAULT_AUTHOR.name,
    authorUrl: `${SITE_URL}/authors/${article.authorSlug || DEFAULT_AUTHOR.slug}`,
    image: articleOgImage(title),
    publisherLogo: SITE_LOGO_URL,
  });
}

/** Fills datePublished, dateModified and image on a stored Article schema that lacks them. */
export function withArticleSchemaDefaults(stored: Record<string, unknown>, article: ArticleLike) {
  const defaults = enforcedArticleSchema(article) as Record<string, unknown>;
  return {
    ...stored,
    datePublished: stored.datePublished || defaults.datePublished,
    dateModified: stored.dateModified || defaults.dateModified,
    image: stored.image || defaults.image,
  };
}

export function mergeInjectedSchema(input: {
  article: ArticleLike;
  headline: string;
  claudeFaq?: unknown;
  fallbackFaq?: Array<{ question: string; answer: string }>;
  internalLinks?: Array<{ anchorText: string; targetUrl: string; context: string }>;
}) {
  const faqSchema = isValidFaqSchema(input.claudeFaq)
    ? input.claudeFaq
    : buildFAQSchema(input.fallbackFaq || []);

  return {
    faqSchema,
    articleSchema: enforcedArticleSchema(input.article, input.headline),
    internalLinks: Array.isArray(input.internalLinks) ? input.internalLinks : [],
  };
}

export function assertPublishableArticleSchema(schema: unknown) {
  const errors = validateArticleSchema(schema);
  if (errors.length) {
    throw new Error(errors.join("; "));
  }
}
