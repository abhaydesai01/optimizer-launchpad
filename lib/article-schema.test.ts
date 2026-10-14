import { describe, expect, it } from "vitest";
import { withArticleSchemaDefaults } from "./article-schema";
import { validateArticleSchema } from "./schema-validate";

const article = {
  slug: "geo-tool-india",
  title: "Best GEO tool for Indian startups",
  publishedAt: new Date("2026-09-01T00:00:00Z"),
  updatedAt: new Date("2026-09-05T00:00:00Z"),
};

describe("withArticleSchemaDefaults", () => {
  it("adds the missing date and image so the schema validates", () => {
    const stored = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Best GEO tool for Indian startups",
      author: { "@type": "Person", name: "Optimizer360 GEO team" },
      publisher: { "@type": "Organization", name: "Optimizer360.ai" },
      mainEntityOfPage: "https://optimizer360.ai/blog/geo-tool-india",
    };
    expect(validateArticleSchema(stored)).toContain("Article schema missing datePublished");
    const filled = withArticleSchemaDefaults(stored, article);
    expect(validateArticleSchema(filled)).toEqual([]);
    expect(filled.datePublished).toBe("2026-09-01T00:00:00.000Z");
    expect(filled.image).toBeTruthy();
  });

  it("keeps values already present", () => {
    const stored = { datePublished: "2025-01-01T00:00:00.000Z", image: "https://example.com/x.png" };
    const filled = withArticleSchemaDefaults(stored, article);
    expect(filled.datePublished).toBe("2025-01-01T00:00:00.000Z");
    expect(filled.image).toBe("https://example.com/x.png");
  });
});
