import {
  BarChart3,
  Download,
  FileSpreadsheet,
  Plug,
  Webhook,
} from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/marketing/Reveal";

const INTEGRATIONS: {
  icon: typeof FileSpreadsheet;
  title: string;
  body: string;
  href?: string;
}[] = [
  {
    icon: FileSpreadsheet,
    title: "CSV & report exports",
    body: "Export prompt-level visibility, citations and competitor data for your own analysis or client decks.",
  },
  {
    icon: BarChart3,
    title: "Executive dashboards",
    body: "Weekly and monthly reports built for CMOs — trend lines, engine breakdowns and gap summaries, not vanity charts.",
  },
  {
    icon: Webhook,
    title: "API access",
    body: "Pull audit and tracking data into your stack — available on enterprise engagements. Automate reporting without manual exports.",
  },
  {
    icon: Plug,
    title: "Works with your tracker",
    body: "Already on Peec, Profound or another tool? Keep it. Our findings should reproduce in any tracker — we add execution on top.",
    href: "/compare",
  },
  {
    icon: Download,
    title: "Verifiable baselines",
    body: "Every audit ships as a reproducible snapshot — open any engine, ask the same prompt, confirm the finding yourself.",
  },
];

export function Integrations() {
  return (
    <section
      id="integrations"
      className="mk-section mk-hairline"
      aria-labelledby="integrations-heading"
    >
      <div className="mk-wrap">
        <Reveal>
          <p className="mk-kicker">Integrations & reporting</p>
          <h2 id="integrations-heading" className="mk-h2 mt-5 max-w-2xl text-[var(--paper)]">
            Insights that leave the platform — not dashboards that trap them.
          </h2>
          <p className="mk-body mt-6 max-w-2xl">
            Tracking tools stop at the screen. Optimizer360.ai ships data you
            can export, verify and act on — whether that action is ours or yours.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INTEGRATIONS.map((item, index) => (
            <Reveal key={item.title} delay={(index % 3) * 80} className="h-full">
              {item.href ? (
                <Link
                  href={item.href}
                  className="mk-card group flex h-full flex-col p-8 transition-colors hover:border-[var(--mint)]"
                >
                  <item.icon
                    className="h-6 w-6 text-[var(--mint)]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="mt-6 font-serif-display text-lg text-[var(--paper)] group-hover:text-[var(--mint)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[var(--paper-muted)]">
                    {item.body}
                  </p>
                  <span className="mt-4 text-sm font-medium text-[var(--mint)]">
                    See the comparison →
                  </span>
                </Link>
              ) : (
                <article className="mk-card h-full p-8">
                  <item.icon
                    className="h-6 w-6 text-[var(--mint)]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="mt-6 font-serif-display text-lg text-[var(--paper)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
                    {item.body}
                  </p>
                </article>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 text-center text-sm text-[var(--paper-muted)]">
            API and custom reporting scopes are quoted per engagement.{" "}
            <Link
              href="/compare"
              className="font-medium text-[var(--mint)] underline decoration-[var(--ink-line-strong)] underline-offset-4 hover:decoration-[var(--mint)]"
            >
              See how we compare to tracking-only tools →
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
