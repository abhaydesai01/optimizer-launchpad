import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Target from "@/lib/models/Target";
import Article from "@/lib/models/Article";
import PipelineLog from "@/lib/models/PipelineLog";
import { StartPipelineButton } from "@/app/admin/components/StartPipelineButton";

function statusPill(status: string) {
  if (status === "published") return "bg-[#10B98120] text-[#10B981]";
  if (status === "in_progress") return "bg-[#3B82F620] text-[#3B82F6]";
  return "bg-[#F59E0B20] text-[#B7791F]";
}

export default async function AdminDashboardPage() {
  await connectDB();

  const [totalTargets, publishedCount, inReviewCount, pendingCount] =
    await Promise.all([
      Target.countDocuments(),
      Article.countDocuments({ published: true }),
      Article.countDocuments({ status: "awaiting_review" }),
      Target.countDocuments({ status: "pending" }),
    ]);

  const todaysTarget = await Target.findOne({ status: "pending" })
    .sort({ priority: 1, createdAt: 1 })
    .lean();

  const recentActivity = await PipelineLog.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  const allTargets = await Target.find().sort({ priority: 1, createdAt: -1 }).lean();

  return (
    <main className="space-y-6">
      <header>
        <h1 className="display text-3xl font-bold text-[#222735]">Content Pipeline</h1>
        <p className="mt-1 text-sm text-[#646D82]">Your daily GEO content machine.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Targets", value: totalTargets },
          { label: "Published", value: publishedCount },
          { label: "In Review", value: inReviewCount },
          { label: "Pending", value: pendingCount },
        ].map((card) => (
          <article key={card.label} className="rounded-xl border border-[#E2E7F0] bg-white p-4">
            <p className="text-sm text-[#646D82]">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-[#222735]">{card.value}</p>
          </article>
        ))}
      </section>

      {todaysTarget ? (
        <section className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#646D82]">
            Today&apos;s Target
          </p>
          <h2 className="mt-2 text-xl font-semibold text-[#222735]">{todaysTarget.prompt}</h2>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-medium text-[#3730A3]">
              {todaysTarget.keyword}
            </span>
            <StartPipelineButton targetId={String(todaysTarget._id)} />
          </div>
        </section>
      ) : null}

      <section className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
        <h3 className="text-lg font-semibold text-[#222735]">Recent Activity</h3>
        <div className="mt-4 space-y-2">
          {recentActivity.length === 0 ? (
            <p className="text-sm text-[#646D82]">No activity yet.</p>
          ) : (
            recentActivity.map((item) => (
              <div
                key={String(item._id)}
                className="flex items-center justify-between rounded-lg border border-[#E2E7F0] px-3 py-2 text-sm"
              >
                <span className="text-[#222735]">
                  {item.step} • {item.status}
                </span>
                <span className="text-[#646D82]">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
        <h3 className="text-lg font-semibold text-[#222735]">All Targets</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-[#646D82]">
                <th className="pb-2">Prompt</th>
                <th className="pb-2">Keyword</th>
                <th className="pb-2">Priority</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E7F0]">
              {allTargets.map((target) => (
                <tr key={String(target._id)}>
                  <td className="py-2 pr-4 text-[#222735]">{target.prompt}</td>
                  <td className="py-2 pr-4 text-[#646D82]">{target.keyword}</td>
                  <td className="py-2 pr-4 text-[#646D82]">{target.priority}</td>
                  <td className="py-2 pr-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${statusPill(
                        target.status,
                      )}`}
                    >
                      {target.status}
                    </span>
                  </td>
                  <td className="py-2">
                    {target.articleId ? (
                      <Link
                        href={`/admin/articles/${target.articleId}`}
                        className="font-medium text-[#2563EB]"
                      >
                        View
                      </Link>
                    ) : (
                      <StartPipelineButton targetId={String(target._id)} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
