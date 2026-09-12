export const ARTICLE_CATEGORIES = [
  "geo-explainer",
  "engine-guide",
  "vertical",
  "comparison",
  "glossary",
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export const ARTICLE_CATEGORY_LABELS: Record<ArticleCategory, string> = {
  "geo-explainer": "GEO explainer",
  "engine-guide": "Engine guide",
  vertical: "Vertical",
  comparison: "Comparison",
  glossary: "Glossary",
};

export function isArticleCategory(value: unknown): value is ArticleCategory {
  return typeof value === "string" && (ARTICLE_CATEGORIES as readonly string[]).includes(value);
}

export function categoryLabel(value: string | undefined): string {
  if (isArticleCategory(value)) return ARTICLE_CATEGORY_LABELS[value];
  return "Article";
}
