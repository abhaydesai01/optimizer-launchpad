import connectDB from "../lib/mongodb.ts";
import Article from "../lib/models/Article.ts";
import Target from "../lib/models/Target.ts";
import PipelineLog from "../lib/models/PipelineLog.ts";

type Candidate = {
  articleId: string;
  title: string;
  slug: string;
  keyword: string;
  priority: number;
  status: string;
  hasContent: boolean;
  targetId: string;
};

async function run() {
  await connectDB();

  const publishReadyStatuses = new Set(["review_done", "schema_injected"]);

  const articles = await Article.find({
    published: false,
    status: { $in: Array.from(publishReadyStatuses) },
  })
    .sort({ updatedAt: -1 })
    .lean();

  const targetIds = articles.map((article) => article.targetId);
  const targets = await Target.find({ _id: { $in: targetIds } })
    .select("keyword priority")
    .lean();
  const targetMap = new Map(targets.map((target) => [String(target._id), target]));

  const rankedCandidates: Candidate[] = articles
    .map((article) => {
      const target = targetMap.get(String(article.targetId));
      const finalContent = String(article.finalContent || article.draft || "").trim();
      return {
        articleId: String(article._id),
        title: article.title || article.brief?.h1 || article.slug,
        slug: article.slug,
        keyword: target?.keyword || "—",
        priority: Number(target?.priority ?? 9999),
        status: article.status,
        hasContent: finalContent.length > 0,
        targetId: String(article.targetId),
      };
    })
    .filter((item) => item.hasContent)
    .sort((a, b) => a.priority - b.priority);

  let candidates = rankedCandidates.slice(0, 10);

  if (candidates.length === 0) {
    const fallbackArticles = await Article.find({ published: false })
      .sort({ updatedAt: -1 })
      .lean();
    const fallbackTargetIds = fallbackArticles.map((article) => article.targetId);
    const fallbackTargets = await Target.find({ _id: { $in: fallbackTargetIds } })
      .select("keyword priority")
      .lean();
    const fallbackTargetMap = new Map(
      fallbackTargets.map((target) => [String(target._id), target]),
    );

    candidates = fallbackArticles
      .map((article) => {
        const target = fallbackTargetMap.get(String(article.targetId));
        const finalContent = String(article.finalContent || article.draft || "").trim();
        return {
          articleId: String(article._id),
          title: article.title || article.brief?.h1 || article.slug,
          slug: article.slug,
          keyword: target?.keyword || "—",
          priority: Number(target?.priority ?? 9999),
          status: article.status,
          hasContent: finalContent.length > 0,
          targetId: String(article.targetId),
        };
      })
      .filter((item) => item.hasContent)
      .sort((a, b) => a.priority - b.priority)
      .slice(0, 10);
  }

  if (candidates.length === 0) {
    console.log("No publish-ready articles found.");
    return;
  }

  const now = new Date();
  for (const candidate of candidates) {
    await Article.findByIdAndUpdate(candidate.articleId, {
      $set: {
        published: true,
        publishedAt: now,
        status: "published",
      },
    });

    await Target.findByIdAndUpdate(candidate.targetId, {
      $set: { status: "published" },
    });

    await PipelineLog.create({
      articleId: candidate.articleId,
      step: "publish",
      status: "completed",
      notes: `Bulk published via script at optimizer360.ai/blog/${candidate.slug}`,
    });
  }

  console.log(`Published ${candidates.length} article(s):`);
  candidates.forEach((candidate, index) => {
    console.log(
      `${index + 1}. ${candidate.title} | keyword: ${candidate.keyword} | slug: /blog/${candidate.slug}`,
    );
  });
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Failed to publish top 10:", error);
    process.exit(1);
  });
