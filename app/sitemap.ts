import type { MetadataRoute } from "next";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import { useCases } from "@/lib/usecases";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://optimizer360.ai";
  const routes = [
    "",
    "/are",
    "/usecases",
    "/blog",
    "/about",
    "/careers",
    "/pricing",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${base}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
    lastModified: new Date(),
  }));

  await connectDB();
  const blogArticles = await Article.find({ published: true })
    .select("slug updatedAt publishedAt")
    .lean();

  const dynamicBlogEntries: MetadataRoute.Sitemap = blogArticles
    .filter((article) => Boolean(article.slug))
    .map((article) => ({
      url: `${base}/blog/${article.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: article.updatedAt || article.publishedAt || new Date(),
    }));

  const dynamicUseCaseEntries: MetadataRoute.Sitemap = useCases.map((item) => ({
    url: `${base}/usecases/${item.slug}`,
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...dynamicUseCaseEntries, ...dynamicBlogEntries];
}
