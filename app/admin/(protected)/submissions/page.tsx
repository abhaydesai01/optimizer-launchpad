import connectDB from "@/lib/mongodb";
import SubmissionLog from "@/lib/models/SubmissionLog";
import { RunFounderQueueButton } from "@/app/admin/components/RunFounderQueueButton";

function statusClass(status: string) {
  if (status === "processed" || status === "sent") return "bg-[#10B98120] text-[#10B981]";
  if (status === "failed" || status === "blocked") return "bg-[#EF444420] text-[#DC2626]";
  if (status === "received" || status === "pending") return "bg-[#F59E0B20] text-[#B7791F]";
  return "bg-[#E5E7EB] text-[#4B5563]";
}

export default async function SubmissionsPage() {
  await connectDB();
  const submissions = await SubmissionLog.find().sort({ createdAt: -1 }).limit(200).lean();

  return (
    <main className="space-y-4">
      <header>
        <h1 className="display text-2xl font-bold text-[#222735]">Lead Requests & Email Logs</h1>
        <p className="text-sm text-[#646D82]">
          Audit every request received and each outbound email delivery result.
        </p>
        <RunFounderQueueButton />
      </header>

      <section className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-[#646D82]">
                <th className="pb-2 pr-3">Time</th>
                <th className="pb-2 pr-3">Type</th>
                <th className="pb-2 pr-3">Lead</th>
                <th className="pb-2 pr-3">Request</th>
                <th className="pb-2 pr-3">Owner Email</th>
                <th className="pb-2 pr-3">Customer Email</th>
                <th className="pb-2 pr-3">Founder Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E7F0]">
              {submissions.map((item) => {
                const payload = (item.requestPayload || {}) as Record<string, unknown>;
                const leadName =
                  typeof payload.name === "string" ? payload.name : "Unknown";
                const leadEmail =
                  typeof payload.email === "string" ? payload.email : "Unknown";
                const business =
                  typeof payload.company === "string"
                    ? payload.company
                    : typeof payload.brand === "string"
                      ? payload.brand
                      : "—";

                return (
                  <tr key={String(item._id)}>
                    <td className="py-2 pr-3 text-[#646D82]">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 pr-3 capitalize text-[#222735]">{item.requestType}</td>
                    <td className="py-2 pr-3 text-[#222735]">
                      <p className="font-medium">{leadName}</p>
                      <p className="text-xs text-[#646D82]">{leadEmail}</p>
                      <p className="text-xs text-[#646D82]">{business}</p>
                    </td>
                    <td className="py-2 pr-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${statusClass(item.requestStatus)}`}
                      >
                        {item.requestStatus}
                      </span>
                    </td>
                    <td className="py-2 pr-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${statusClass(item.ownerEmailStatus)}`}
                      >
                        {item.ownerEmailStatus}
                      </span>
                      {item.ownerEmailId ? (
                        <p className="mt-1 text-xs text-[#646D82]">{item.ownerEmailId}</p>
                      ) : null}
                    </td>
                    <td className="py-2 pr-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${statusClass(item.customerEmailStatus)}`}
                      >
                        {item.customerEmailStatus}
                      </span>
                      {item.customerEmailId ? (
                        <p className="mt-1 text-xs text-[#646D82]">{item.customerEmailId}</p>
                      ) : null}
                    </td>
                    <td className="py-2 pr-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${statusClass(item.founderEmailStatus)}`}
                      >
                        {item.founderEmailStatus}
                      </span>
                      {item.founderEmailScheduledFor ? (
                        <p className="mt-1 text-xs text-[#646D82]">
                          due {new Date(item.founderEmailScheduledFor).toLocaleString()}
                        </p>
                      ) : null}
                      {item.founderEmailId ? (
                        <p className="mt-1 text-xs text-[#646D82]">{item.founderEmailId}</p>
                      ) : null}
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
