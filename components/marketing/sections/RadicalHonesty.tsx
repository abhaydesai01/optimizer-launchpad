import { Reveal } from "@/components/marketing/Reveal";

const PRINCIPLES = [
  {
    title: "No fabricated data",
    body: "No invented search volumes. No fake case studies. If we can't verify it, we don't say it.",
  },
  {
    title: "No hollow guarantees",
    body: "We never promise a specific citation — the engines decide. We do the work that earns them.",
  },
  {
    title: "You see everything",
    body: "A live dashboard, weekly. Every finding is independently verifiable — reproduce it yourself in any AI engine.",
  },
  {
    title: "Our own platform",
    body: "Built on our own GEO intelligence platform, not a white-labelled tool. We answer for every number in it.",
  },
];

export function RadicalHonesty() {
  return (
    <section
      id="radical-honesty"
      className="mk-section relative overflow-hidden bg-[var(--ink-850)]"
      aria-labelledby="radical-honesty-heading"
    >
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--mint)] to-transparent opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(60,232,180,0.06), transparent 70%)",
        }}
      />
      <div className="mk-wrap relative">
        <Reveal>
          <p className="mk-kicker">How we operate</p>
          <h2 id="radical-honesty-heading" className="mk-h2 mt-5 max-w-3xl text-[var(--paper)]">
            Radical honesty.{" "}
            <span className="text-[var(--paper-muted)]">
              Not a value on a wall — an operating constraint.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mk-body mt-7 max-w-2xl">
            The GEO market is young, and it is full of firms selling certainty
            they cannot deliver. We took the opposite position: everything we
            report, you can verify yourself.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded border border-[var(--ink-line)] bg-[var(--ink-line)] sm:grid-cols-2">
          {PRINCIPLES.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 80} className="h-full">
              <article className="h-full bg-[var(--ink-900)] p-8 md:p-10">
                <span className="font-serif-display text-sm text-[var(--mint)]" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-serif-display text-xl text-[var(--paper)]">
                  {principle.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
                  {principle.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
