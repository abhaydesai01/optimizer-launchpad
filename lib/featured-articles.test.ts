import { describe, expect, it } from "vitest";
import { EXPLAINER_ARTICLES, MORE_ARTICLES } from "./featured-articles";
import { isRetiredArticle } from "./retired-articles.mjs";
import { getStaticPillar } from "./static-pillars";

describe("featured articles", () => {
  it("only link to articles that exist and are not retired", () => {
    for (const item of [...EXPLAINER_ARTICLES, ...MORE_ARTICLES]) {
      expect(item.href.startsWith("/blog/")).toBe(true);
      const slug = item.href.replace("/blog/", "");
      expect(getStaticPillar(slug), slug).not.toBeNull();
      expect(isRetiredArticle(slug), slug).toBe(false);
    }
  });
});
