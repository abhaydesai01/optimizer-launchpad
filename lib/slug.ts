import Article from "@/lib/models/Article";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function resolveUniqueArticleSlug(rawValue: string, ignoreArticleId?: string) {
  const fallback = `article-${Date.now()}`;
  const baseSlug = slugify(rawValue) || fallback;

  let slug = baseSlug;
  let suffix = 1;

  while (true) {
    const existing = await Article.findOne({ slug }).select("_id").lean();
    if (!existing || (ignoreArticleId && String(existing._id) === ignoreArticleId)) {
      return slug;
    }
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}
