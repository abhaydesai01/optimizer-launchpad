/**
 * Off-topic articles removed from the site (task 2.2). Their old links redirect to /blog
 * (see next.config.mjs) and they are skipped by every article listing and the sitemap.
 * The text still exists in the database; delete it there when convenient.
 */
export const RETIRED_ARTICLE_SLUGS = [
  "replace-gtm-team-ai",
  "autonomous-revenue-engine",
  "leads-without-sales-team",
  "scale-revenue-without-headcount",
  "distribution-infrastructure-brands",
  "ai-marketing-automation-india",
];

export const isRetiredArticle = (slug) => RETIRED_ARTICLE_SLUGS.includes(slug);

/**
 * Articles whose text now lives in lib/pillar-articles.ts and takes priority over the database copy
 * with the same slug (the database versions are the old templated drafts).
 */
export const OVERRIDDEN_ARTICLE_SLUGS = ["generative-engine-optimization", "geo-vs-seo-vs-aeo"];

export const isOverriddenArticle = (slug) => OVERRIDDEN_ARTICLE_SLUGS.includes(slug);

/** Slugs to leave out of every database query: retired articles and overridden ones. */
export const DB_EXCLUDED_SLUGS = [...RETIRED_ARTICLE_SLUGS, ...OVERRIDDEN_ARTICLE_SLUGS];
