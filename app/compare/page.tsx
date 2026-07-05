import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus, X } from "lucide-react";
import { SubPageShell } from "@/components/marketing/SubPageShell";
import { CAL_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Optimizer360.ai vs Tracking Tools & SEO Agencies",
  description:
    "How Optimizer360.ai compares to AI visibility tracking tools (like Peec AI or Profound) and traditional SEO agencies — tracking, diagnosis, content, entity structuring and an assigned execution team in one engagement.",
  alternates: { canonical: "https://optimizer360.ai/compare" },
};

type Support = "yes" | "no" | "partial";

const ROWS: { capability: string; tracker: Support; seo: Support; o360: Support; note?: string }[] = [
  { capability: "Tracks AI visibility across engines", tracker: "yes", seo: "no", o360: "yes" },
  { capability: "Diagnoses the exact prompts you're losing", tracker: "partial", seo: "no", o360: "yes" },
  { capability: "Creates gap-targeted content (client-approved)", tracker: "no", seo: "partial", o360: "yes" },
  { capability: "Technical & entity structuring for AI readability", tracker: "no", seo: "partial", o360: "yes" },
  { capability: "An assigned team that executes the fixes", tracker: "no", seo: "partial", o360: "yes" },
  { capability: "Weekly verifiable reporting across all 5 engines", tracker: "partial", seo: "no", o360: "yes" },
  {
    capability: "Guarantees specific AI citations",
    tracker: "no",
    seo: "no",
    o360: "no",
    note: "Nobody honestly can — the engines decide. Walk away from anyone who promises otherwise.",
  },
];

function SupportIcon({ value }: { value: Support }) {
  if (value === "yes") {
    return <Check className="mx-auto h-5 w-5 text-[var(--mint)]" strokeWidth={2} aria-label="Yes" />;
  }
  if (value === "partial") {
    return <Minus className="mx-auto h-5 w-5 text-[var(--amber)]" strokeWidth={2} aria-label="Sometimes" />;
  }
  return <X className="mx-auto h-5 w-5 text-[var(--paper-muted)]" strokeWidth={2} aria-label="No" />;
}

export default function ComparePage() {
  return (
    <SubPageShell
      kicker="Comparison"
      title="Trackers show you the problem. We're built to fix it."
      intro="AI visibility trackers (Peec AI, Profound and others) are good measurement tools — and measurement alone doesn't change what AI says about you. Traditional SEO agencies execute — on signals AI engines don't weight. Here's the honest comparison."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">
            Capability comparison between AI visibility tracking tools, traditional SEO agencies, and Optimizer360.ai
          </caption>
          <thead>
            <tr className="border-b border-[var(--ink-line-strong)]">
              <th scope="col" className="py-4 pr-4 text-sm font-semibold text-[var(--paper)]">
                Capability
              </th>
              <th scope="col" className="px-4 py-4 text-center text-sm font-semibold text-[var(--paper-soft)]">
                Tracking-only tools
              </th>
              <th scope="col" className="px-4 py-4 text-center text-sm font-semibold text-[var(--paper-soft)]">
                Traditional SEO agencies
              </th>
              <th scope="col" className="bg-[var(--mint-dim)] px-4 py-4 text-center text-sm font-semibold text-[var(--mint)]">
                Optimizer360.ai
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.capability} className="border-b border-[var(--ink-line)]">
                <th scope="row" className="py-5 pr-4 text-[15px] font-normal leading-relaxed text-[var(--paper-soft)]">
                  {row.capability}
                  {row.note ? (
                    <span className="mt-1 block text-[13px] text-[var(--paper-muted)]">
                      {row.note}
                    </span>
                  ) : null}
                </th>
                <td className="px-4 py-5"><SupportIcon value={row.tracker} /></td>
                <td className="px-4 py-5"><SupportIcon value={row.seo} /></td>
                <td className="bg-[var(--mint-dim)] px-4 py-5"><SupportIcon value={row.o360} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 flex flex-wrap gap-6 text-xs text-[var(--paper-muted)]">
        <span className="inline-flex items-center gap-2">
          <Check className="h-4 w-4 text-[var(--mint)]" aria-hidden="true" /> Included
        </span>
        <span className="inline-flex items-center gap-2">
          <Minus className="h-4 w-4 text-[var(--amber)]" aria-hidden="true" /> Varies / partial
        </span>
        <span className="inline-flex items-center gap-2">
          <X className="h-4 w-4 text-[var(--paper-muted)]" aria-hidden="true" /> Not offered
        </span>
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <article className="mk-card p-8">
          <h2 className="font-serif-display text-xl text-[var(--paper)]">
            Optimizer360.ai vs Peec AI
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
            Peec AI is a strong AI search analytics tool — visibility, position,
            sentiment and prompt tracking across models. It shows you where you
            stand. Optimizer360.ai includes the same class of intelligence on
            our own platform, then adds what Peec does not ship: gap-targeted
            content, technical and entity structuring, and an assigned
            strategist, writer and developer who close the gaps the dashboard
            surfaces.
          </p>
        </article>
        <article className="mk-card p-8">
          <h2 className="font-serif-display text-xl text-[var(--paper)]">
            Optimizer360.ai vs Profound
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
            Profound focuses on AI visibility measurement for brands. Like
            Peec, it is built for teams who will act on the data themselves.
            Optimizer360.ai is built for enterprises who want the measurement
            and the execution in one engagement — with radical honesty on every
            number and no hollow citation guarantees.
          </p>
        </article>
        <article className="mk-card p-8">
          <h2 className="font-serif-display text-xl text-[var(--paper)]">
            Optimizer360.ai vs Ahrefs / Semrush
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
            Traditional SEO suites are adding AI visibility features, but they
            optimise for search rankings — not for how generative engines
            synthesise a single answer.{" "}
            <Link
              href="/ai-seo"
              className="font-medium text-[var(--mint)] underline decoration-[var(--ink-line-strong)] underline-offset-4 hover:decoration-[var(--mint)]"
            >
              AI SEO is a different discipline
            </Link>
            . Keep your SEO stack; add Optimizer360.ai for the answer layer.
          </p>
        </article>
        <article className="mk-card p-8">
          <h2 className="font-serif-display text-xl text-[var(--paper)]">
            Already using a tracker?
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
            Keep it — a second source of truth keeps everyone honest, and our
            findings should reproduce in any tool. What we add is the part no
            tracker ships: the strategist, writer and developer who close the
            gaps it surfaces.
          </p>
        </article>
      </div>

      <div className="mt-14 border border-[var(--ink-line-strong)] bg-[var(--ink-900)] p-8 text-center md:p-10">
        <h2 className="font-serif-display text-2xl text-[var(--paper)]">
          The fastest way to compare is with your own brand.
        </h2>
        <p className="mk-body mx-auto mt-4 max-w-xl">
          Request the audit — every finding is verifiable in any engine and in
          any tool, including your tracker.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <Link href="/request-audit" className="mk-btn mk-btn-primary">
            Request an Audit
          </Link>
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noreferrer"
            className="mk-btn mk-btn-ghost"
          >
            Book a 20-minute call
          </a>
        </div>
      </div>
    </SubPageShell>
  );
}
