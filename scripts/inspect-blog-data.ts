import connectDB from "../lib/mongodb.ts";
import Article from "../lib/models/Article.ts";
import Target from "../lib/models/Target.ts";

async function run() {
  await connectDB();

  const articleCount = await Article.countDocuments();
  const publishedCount = await Article.countDocuments({ published: true });
  const withContentCount = await Article.countDocuments({
    $or: [{ finalContent: { $ne: "" } }, { draft: { $ne: "" } }],
  });

  const latestArticles = await Article.find()
    .sort({ updatedAt: -1 })
    .limit(20)
    .select("title slug status published finalContent draft targetId")
    .lean();

  const targetIds = latestArticles.map((article) => article.targetId);
  const targets = await Target.find({ _id: { $in: targetIds } })
    .select("keyword prompt priority status articleId")
    .lean();
  const targetMap = new Map(targets.map((target) => [String(target._id), target]));
  const topTargets = await Target.find()
    .sort({ priority: 1, createdAt: -1 })
    .limit(10)
    .select("keyword prompt priority status articleId")
    .lean();

  console.log(
    JSON.stringify(
      {
        articleCount,
        publishedCount,
        withContentCount,
        topTargets: topTargets.map((target) => ({
          prompt: target.prompt,
          keyword: target.keyword,
          priority: target.priority,
          status: target.status,
          hasArticle: Boolean(target.articleId),
        })),
        latestArticles: latestArticles.map((article) => ({
          title: article.title || article.slug,
          slug: article.slug,
          status: article.status,
          published: article.published,
          hasContent:
            String(article.finalContent || "").trim().length > 0 ||
            String(article.draft || "").trim().length > 0,
          keyword: targetMap.get(String(article.targetId))?.keyword ?? null,
          priority: targetMap.get(String(article.targetId))?.priority ?? null,
        })),
      },
      null,
      2,
    ),
  );
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
