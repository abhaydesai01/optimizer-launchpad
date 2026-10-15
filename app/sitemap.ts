import type { MetadataRoute } from "next";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import { ROUTE_REVISIONS } from "@/lib/route-revisions";
import { STATIC_PILLAR_ARTICLES } from "@/lib/static-pillars";
import { RETIRED_ARTICLE_SLUGS, isRetiredArticle } from "@/lib/retired-articles.mjs";
import { useCases } from "@/lib/usecases";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://optimizer360.ai";
  const routes = [
    "",
    "/request-audit",
    "/ai-seo",
    "/engines",
    "/compare",
    "/agency",
    "/usecases",
    "/blog",
    "/faq",
    "/pricing",
    "/about",
    "/careers",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => {
    const path = route || "/";
    const revision = ROUTE_REVISIONS[path];
    return {
      url: `${base}${route}`,
      changeFrequency: route === "" || route === "/blog" ? "weekly" : "monthly",
      priority: route === "" ? 1 : route === "/blog" || route === "/faq" ? 0.8 : 0.7,
      lastModified: revision ? new Date(revision) : new Date("2026-09-12"),
    };
  });

  let blogArticles: { slug?: string; updatedAt?: Date; publishedAt?: Date }[] = [];
  try {
    await connectDB();
    blogArticles = await Article.find({ published: true, slug: { $nin: RETIRED_ARTICLE_SLUGS } })
      .select("slug updatedAt publishedAt")
      .lean();
  } catch (error) {
    console.error("Sitemap could not load Mongo articles:", error);
  }

  const seen = new Set(blogArticles.map((article) => article.slug).filter(Boolean));
  const dynamicBlogEntries: MetadataRoute.Sitemap = [
    ...blogArticles.filter((article) => Boolean(article.slug)),
    ...STATIC_PILLAR_ARTICLES.filter(
      (article) => !seen.has(article.slug) && !isRetiredArticle(article.slug),
    ),
  ].map((article) => ({
    url: `${base}/blog/${article.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    lastModified: article.updatedAt || article.publishedAt || new Date(),
  }));

  const dynamicUseCaseEntries: MetadataRoute.Sitemap = useCases.map((item) => ({
    url: `${base}/usecases/${item.slug}`,
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: new Date(ROUTE_REVISIONS["/usecases"] || "2026-09-12"),
  }));

  return [...staticEntries, ...dynamicUseCaseEntries, ...dynamicBlogEntries];
}
