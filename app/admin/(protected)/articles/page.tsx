import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import Target from "@/lib/models/Target";
import { BulkPublishTopKeywords } from "@/app/admin/components/BulkPublishTopKeywords";

export default async function ArticlesPage() {
  await connectDB();
  const articles = await Article.find().sort({ updatedAt: -1 }).lean();
  const targetIds = articles.map((article) => article.targetId);
  const targets = await Target.find({ _id: { $in: targetIds } })
    .select("keyword prompt priority")
    .lean();
  const targetMap = new Map(targets.map((target) => [String(target._id), target]));

  const publishReadyStatuses = new Set(["review_done", "schema_injected"]);
  const publishCandidates = articles
    .filter((article) => !article.published && publishReadyStatuses.has(article.status))
    .map((article) => {
      const target = targetMap.get(String(article.targetId));
      return {
        articleId: String(article._id),
        title: article.title || article.brief?.h1 || target?.prompt || article.slug,
        slug: article.slug,
        keyword: target?.keyword || "—",
        priority: Number(target?.priority ?? 9999),
        status: article.status,
      };
    })
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 20);

  const defaultSelectedIds = publishCandidates.slice(0, 10).map((item) => item.articleId);

  return (
    <main className="space-y-4">
      <header>
        <h1 className="display text-2xl font-bold text-[#222735]">Articles</h1>
        <p className="text-sm text-[#646D82]">Track progress from brief to publish.</p>
      </header>

      <BulkPublishTopKeywords
        candidates={publishCandidates}
        defaultSelectedIds={defaultSelectedIds}
      />

      <section className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-[#646D82]">
                <th className="pb-2">Title</th>
                <th className="pb-2">Keyword</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Updated</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E7F0]">
              {articles.map((article) => {
                const target = targetMap.get(String(article.targetId));
                return (
                  <tr key={String(article._id)}>
                    <td className="py-2 pr-3 text-[#222735]">
                      {article.title || article.brief?.h1 || target?.prompt || article.slug}
                    </td>
                    <td className="py-2 pr-3 text-[#646D82]">{target?.keyword || "—"}</td>
                    <td className="py-2 pr-3 text-[#646D82]">{article.status}</td>
                    <td className="py-2 pr-3 text-[#646D82]">
                      {new Date(article.updatedAt).toLocaleString()}
                    </td>
                    <td className="py-2 pr-3">
                      <Link
                        href={`/admin/articles/${article._id}`}
                        className="font-medium text-[#2563EB]"
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
