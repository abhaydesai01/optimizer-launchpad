import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import { excerptFromMarkdown } from "@/lib/excerpt";
import { STATIC_PILLAR_ARTICLES } from "@/lib/static-pillars";

export type PublishedArticleCard = {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  publishedAt?: Date;
  updatedAt?: Date;
  category?: string;
  authorName?: string;
  authorSlug?: string;
};

export async function listPublishedArticles(limit = 100): Promise<PublishedArticleCard[]> {
  try {
    await connectDB();
    const articles = await Article.find({ published: true })
      .sort({ publishedAt: -1 })
      .select(
        "slug title metaDescription excerpt publishedAt updatedAt category authorName authorSlug finalContent draft",
      )
      .lean();

    const fromDb = articles
      .filter((article) => Boolean(article.slug))
      .map((article) => ({
        slug: article.slug,
        title: article.title,
        metaDescription: article.metaDescription || "",
        excerpt:
          article.excerpt ||
          excerptFromMarkdown(article.finalContent || article.draft || article.metaDescription || ""),
        publishedAt: article.publishedAt,
        updatedAt: article.updatedAt,
        category: article.category,
        authorName: article.authorName,
        authorSlug: article.authorSlug,
      }));

    const seen = new Set(fromDb.map((article) => article.slug));
    const extras = STATIC_PILLAR_ARTICLES.filter((article) => !seen.has(article.slug)).map(
      (article) => ({
        slug: article.slug,
        title: article.title,
        metaDescription: article.metaDescription,
        excerpt: article.excerpt,
        publishedAt: article.publishedAt,
        updatedAt: article.updatedAt,
        category: article.category,
        authorName: article.authorName,
        authorSlug: article.authorSlug,
      }),
    );

    return [...fromDb, ...extras]
      .sort((a, b) => {
        const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return bTime - aTime;
      })
      .slice(0, limit);
  } catch (error) {
    console.error("Failed to list published articles:", error);
    return STATIC_PILLAR_ARTICLES.slice(0, limit).map((article) => ({
      slug: article.slug,
      title: article.title,
      metaDescription: article.metaDescription,
      excerpt: article.excerpt,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      category: article.category,
      authorName: article.authorName,
      authorSlug: article.authorSlug,
    }));
  }
}
