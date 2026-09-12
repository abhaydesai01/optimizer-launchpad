const ARTICLE_REQUIRED_KEYS = [
  "@context",
  "@type",
  "headline",
  "datePublished",
  "author",
  "publisher",
  "mainEntityOfPage",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validateArticleSchema(schema: unknown): string[] {
  const errors: string[] = [];
  if (!isRecord(schema)) {
    return ["Article schema must be an object"];
  }
  for (const key of ARTICLE_REQUIRED_KEYS) {
    if (schema[key] == null || schema[key] === "") {
      errors.push(`Article schema missing ${key}`);
    }
  }
  if (schema["@type"] && schema["@type"] !== "Article") {
    errors.push("Article schema @type must be Article");
  }
  if (schema.author && !isRecord(schema.author) && !Array.isArray(schema.author)) {
    errors.push("Article schema author must be an object or array");
  }
  if (schema.publisher && !isRecord(schema.publisher)) {
    errors.push("Article schema publisher must be an object");
  }
  return errors;
}

export function isValidFaqSchema(schema: unknown): boolean {
  if (!isRecord(schema)) return false;
  return schema["@type"] === "FAQPage" && Array.isArray(schema.mainEntity);
}
