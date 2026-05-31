import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Target from "@/lib/models/Target";

export default async function TargetsPage() {
  await connectDB();
  const targets = await Target.find().sort({ priority: 1, createdAt: -1 }).lean();

  return (
    <main className="space-y-4">
      <header>
        <h1 className="display text-2xl font-bold text-[#222735]">Targets</h1>
        <p className="text-sm text-[#646D82]">Prompt and keyword backlog for the pipeline.</p>
      </header>
      <section className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-[#646D82]">
                <th className="pb-2">Prompt</th>
                <th className="pb-2">Keyword</th>
                <th className="pb-2">Secondary keywords</th>
                <th className="pb-2">Priority</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E7F0]">
              {targets.map((target) => (
                <tr key={String(target._id)}>
                  <td className="py-2 pr-3 text-[#222735]">
                    <Link href={`/admin/targets/${target._id}`} className="hover:underline">
                      {target.prompt}
                    </Link>
                  </td>
                  <td className="py-2 pr-3 text-[#646D82]">{target.keyword}</td>
                  <td className="py-2 pr-3 text-[#646D82]">
                    {target.secondaryKeywords?.join(", ") || "—"}
                  </td>
                  <td className="py-2 pr-3 text-[#646D82]">{target.priority}</td>
                  <td className="py-2 pr-3 text-[#646D82]">{target.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
