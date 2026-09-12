import { describe, expect, it } from "vitest";
import { buildArticleSchema } from "@/lib/schema-library";
import { isValidFaqSchema, validateArticleSchema } from "@/lib/schema-validate";

describe("article schema validation", () => {
  it("accepts an enforced Article schema", () => {
    const schema = buildArticleSchema({
      headline: "What is AI GEO?",
      description: "Definition",
      url: "https://optimizer360.ai/blog/what-is-ai-geo",
      datePublished: "2026-09-12T00:00:00.000Z",
      authorName: "Optimizer360 GEO team",
    });
    expect(validateArticleSchema(schema)).toEqual([]);
  });

  it("rejects a missing headline", () => {
    expect(validateArticleSchema({ "@context": "https://schema.org", "@type": "Article" })).toContain(
      "Article schema missing headline",
    );
  });

  it("detects FAQPage envelopes", () => {
    expect(isValidFaqSchema({ "@type": "FAQPage", mainEntity: [] })).toBe(true);
    expect(isValidFaqSchema({ "@type": "Article" })).toBe(false);
  });
});
