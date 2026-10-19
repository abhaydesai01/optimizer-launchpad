/**
 * Articles removed from the site (task 2.2), mapped to where their old link should go.
 * See next.config.mjs for the redirects. Retired articles are skipped by every article listing and the
 * sitemap. The text may still exist in the database; delete it there when convenient.
 *
 * - Six off-topic articles go to the blog index.
 * - Two duplicates go to the rewritten page that replaced them.
 */
export const RETIRED_ARTICLE_REDIRECTS = {
  "replace-gtm-team-ai": "/blog",
  "autonomous-revenue-engine": "/blog",
  "leads-without-sales-team": "/blog",
  "scale-revenue-without-headcount": "/blog",
  "distribution-infrastructure-brands": "/blog",
  "ai-marketing-automation-india": "/blog",
  "what-is-ai-geo": "/blog/generative-engine-optimization",
  "ai-geo-vs-seo-vs-aeo": "/blog/geo-vs-seo-vs-aeo",
};

export const RETIRED_ARTICLE_SLUGS = Object.keys(RETIRED_ARTICLE_REDIRECTS);

export const isRetiredArticle = (slug) => RETIRED_ARTICLE_SLUGS.includes(slug);

/**
 * Articles whose text now lives in lib/pillar-articles.ts and takes priority over the database copy
 * with the same slug (the database versions are the old templated drafts).
 */
export const OVERRIDDEN_ARTICLE_SLUGS = ["generative-engine-optimization", "geo-vs-seo-vs-aeo"];

export const isOverriddenArticle = (slug) => OVERRIDDEN_ARTICLE_SLUGS.includes(slug);

/** Slugs to leave out of every database query: retired articles and overridden ones. */
export const DB_EXCLUDED_SLUGS = [...RETIRED_ARTICLE_SLUGS, ...OVERRIDDEN_ARTICLE_SLUGS];
