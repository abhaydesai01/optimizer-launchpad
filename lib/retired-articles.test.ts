import { describe, expect, it } from "vitest";
import {
  DB_EXCLUDED_SLUGS,
  OVERRIDDEN_ARTICLE_SLUGS,
  RETIRED_ARTICLE_SLUGS,
  isOverriddenArticle,
  isRetiredArticle,
} from "./retired-articles.mjs";
import { getStaticPillar } from "./static-pillars";
import { validateArticleSchema } from "./schema-validate";

describe("retired articles", () => {
  it("flags the six off-topic slugs and nothing else", () => {
    expect(RETIRED_ARTICLE_SLUGS).toHaveLength(6);
    for (const slug of RETIRED_ARTICLE_SLUGS) expect(isRetiredArticle(slug)).toBe(true);
    expect(isRetiredArticle("what-is-ai-geo")).toBe(false);
    expect(isRetiredArticle("geo-vs-seo-vs-aeo")).toBe(false);
  });
});

describe("overridden articles", () => {
  it("are excluded from database queries but never retired", () => {
    for (const slug of OVERRIDDEN_ARTICLE_SLUGS) {
      expect(isOverriddenArticle(slug)).toBe(true);
      expect(isRetiredArticle(slug)).toBe(false);
      expect(DB_EXCLUDED_SLUGS).toContain(slug);
    }
    for (const slug of RETIRED_ARTICLE_SLUGS) expect(DB_EXCLUDED_SLUGS).toContain(slug);
  });

  it("each have static content that is valid and clean", () => {
    for (const slug of OVERRIDDEN_ARTICLE_SLUGS) {
      const article = getStaticPillar(slug);
      expect(article, slug).not.toBeNull();
      expect(article!.finalContent).not.toMatch(/secondary keywords/i);
      expect(article!.finalContent).not.toContain("## Frequently asked questions");
      expect((article!.schemaJson.faqSchema as { mainEntity: unknown[] }).mainEntity.length).toBeGreaterThanOrEqual(5);
      expect(validateArticleSchema(article!.schemaJson.articleSchema)).toEqual([]);
      expect(article!.authorName).toBe("Optimizer360 GEO team");
    }
  });
});
