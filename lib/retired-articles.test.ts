import { describe, expect, it } from "vitest";
import { RETIRED_ARTICLE_SLUGS, isRetiredArticle } from "./retired-articles.mjs";

describe("retired articles", () => {
  it("flags the six off-topic slugs and nothing else", () => {
    expect(RETIRED_ARTICLE_SLUGS).toHaveLength(6);
    for (const slug of RETIRED_ARTICLE_SLUGS) expect(isRetiredArticle(slug)).toBe(true);
    expect(isRetiredArticle("what-is-ai-geo")).toBe(false);
    expect(isRetiredArticle("geo-vs-seo-vs-aeo")).toBe(false);
  });
});
