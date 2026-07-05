import { Reveal } from "@/components/marketing/Reveal";

const METRICS = [
  {
    label: "AI Visibility",
    detail: "How often your brand appears in engine answers for tracked prompts.",
  },
  {
    label: "Citation Rate",
    detail: "The share of answers that name or link to you — not just mention you.",
  },
  {
    label: "Share of Voice",
    detail: "Your slice of brand mentions against every competitor in the set.",
  },
  {
    label: "Position",
    detail: "Where you rank inside the answer when named — first, second, or absent.",
  },
  {
    label: "Sentiment",
    detail: "How engines frame your brand when they do mention you — trust signals matter.",
  },
];

export function MetricsStrip() {
  return (
    <section
      className="mk-hairline border-y border-[var(--ink-line)] bg-[var(--ink-900)] py-10"
      aria-label="AI visibility metrics tracked by the platform"
    >
      <div className="mk-wrap">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-[var(--paper-muted)]">
            Measured weekly · Verifiable in any engine
          </p>
        </Reveal>
        <ul className="mt-8 grid gap-px overflow-hidden rounded border border-[var(--ink-line)] bg-[var(--ink-line)] sm:grid-cols-2 lg:grid-cols-5">
          {METRICS.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 60} className="h-full">
              <li className="h-full bg-[var(--ink-850)] px-5 py-6 text-center lg:px-4">
                <p className="font-serif-display text-lg text-[var(--mint)]">
                  {metric.label}
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--paper-muted)]">
                  {metric.detail}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
