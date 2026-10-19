import { describe, expect, it } from "vitest";
import { excerptFromMarkdown, stripMarkdownLinks, stripSecondaryKeywords } from "./excerpt";

describe("stripSecondaryKeywords", () => {
  it("removes the plain and bold forms of the line", () => {
    const md = "Intro paragraph.\n\nSecondary keywords: GEO, AI citations\n\n**Secondary keywords:** a, b\n\nNext paragraph.";
    const out = stripSecondaryKeywords(md);
    expect(out).not.toMatch(/secondary keywords/i);
    expect(out).toContain("Intro paragraph.");
    expect(out).toContain("Next paragraph.");
  });

  it("leaves other text alone", () => {
    const md = "We discuss secondary keywords in SEO, mid-sentence.";
    expect(stripSecondaryKeywords(md)).toBe(md);
  });

  it("keeps the line out of excerpts", () => {
    const md = "Secondary keywords: GEO, AI citations\n\nGenerative engine optimisation is the practice of earning citations inside AI answers.";
    expect(excerptFromMarkdown(md)).toMatch(/^Generative engine optimisation/);
  });
});

describe("stripMarkdownLinks", () => {
  it("keeps the link text and drops the address", () => {
    expect(stripMarkdownLinks("See [AEO vs GEO vs SEO](/blog/geo-vs-seo-vs-aeo) and [pricing](/pricing).")).toBe(
      "See AEO vs GEO vs SEO and pricing.",
    );
  });
  it("leaves text without links alone", () => {
    expect(stripMarkdownLinks("Plain answer (with brackets).")).toBe("Plain answer (with brackets).");
  });
});
