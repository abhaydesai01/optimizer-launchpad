import mongoose from "mongoose";
import { mergeInjectedSchema } from "../lib/article-schema";
import { DEFAULT_AUTHOR } from "../lib/default-author";
import { excerptFromMarkdown } from "../lib/excerpt";
import { PILLAR_ARTICLES } from "../lib/pillar-articles";
import { loadLocalEnv } from "./load-env";

loadLocalEnv();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is required");
  process.exit(1);
}

async function main() {
  await mongoose.connect(uri as string);
  const Article = (await import("../lib/models/Article")).default;
  const Author = (await import("../lib/models/Author")).default;
  const Target = (await import("../lib/models/Target")).default;

  await Author.findOneAndUpdate(
    { slug: DEFAULT_AUTHOR.slug },
    {
      slug: DEFAULT_AUTHOR.slug,
      name: DEFAULT_AUTHOR.name,
      role: DEFAULT_AUTHOR.role,
      bio: DEFAULT_AUTHOR.bio,
      sameAs: [...DEFAULT_AUTHOR.sameAs],
    },
    { upsert: true },
  );

  for (const pillar of PILLAR_ARTICLES) {
    const target = await Target.findOneAndUpdate(
      { keyword: pillar.keyword },
      {
        prompt: pillar.prompt,
        keyword: pillar.keyword,
        secondaryKeywords: pillar.secondaryKeywords,
        priority: PILLAR_ARTICLES.indexOf(pillar) + 1,
        status: "published",
      },
      { upsert: true, new: true },
    );

    const now = new Date();
    const schemaJson = mergeInjectedSchema({
      article: {
        slug: pillar.slug,
        title: pillar.title,
        metaDescription: pillar.metaDescription,
        publishedAt: now,
        updatedAt: now,
        createdAt: now,
        authorName: DEFAULT_AUTHOR.name,
        authorSlug: DEFAULT_AUTHOR.slug,
      },
      headline: pillar.title,
      fallbackFaq: pillar.faq,
      internalLinks: [
        { anchorText: "What is AI GEO?", targetUrl: "/ai-seo", context: "Definition briefing" },
        { anchorText: "Request an audit", targetUrl: "/request-audit", context: "Conversion" },
      ],
    });

    const article = await Article.findOneAndUpdate(
      { slug: pillar.slug },
      {
        targetId: target._id,
        slug: pillar.slug,
        title: pillar.title,
        metaTitle: pillar.metaTitle,
        metaDescription: pillar.metaDescription,
        finalContent: pillar.content,
        draft: pillar.content,
        excerpt: pillar.excerpt || excerptFromMarkdown(pillar.content),
        category: pillar.category,
        sources: pillar.sources,
        authorSlug: DEFAULT_AUTHOR.slug,
        authorName: DEFAULT_AUTHOR.name,
        authorRole: DEFAULT_AUTHOR.role,
        schemaJson,
        status: "published",
        published: true,
        publishedAt: now,
        wordCount: pillar.content.split(/\s+/).filter(Boolean).length,
        brief: {
          h1: pillar.title,
          slug: pillar.slug,
          metaTitle: pillar.metaTitle,
          metaDescription: pillar.metaDescription,
          h2s: ["Sources", "FAQ: Common Questions"],
          keyPoints: [],
          statsToInclude: pillar.sources.map((source) => ({
            stat: source.stat,
            context: source.context,
            source: source.url || "",
          })),
          angle: pillar.prompt,
          wordCountTarget: 800,
        },
      },
      { upsert: true, new: true },
    );

    await Target.findByIdAndUpdate(target._id, { articleId: article._id, status: "published" });
    console.log(`Published /blog/${pillar.slug}`);
  }

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
