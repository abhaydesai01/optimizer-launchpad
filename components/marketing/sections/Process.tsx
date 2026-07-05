import { Reveal } from "@/components/marketing/Reveal";

const STEPS = [
  {
    number: "01",
    title: "Baseline",
    body: "We show you exactly how AI answers about you today — where you're named, where you're missed, and what the engines say instead. Your honest \u201Cbefore\u201D, on day one.",
  },
  {
    number: "02",
    title: "Diagnose",
    body: "We map the exact questions where you're absent, weak or out-positioned — the queries your buyers are actually asking, engine by engine.",
  },
  {
    number: "03",
    title: "Build",
    body: "Gap-targeted content plus technical and entity structuring the engines can read: schema, structured evidence, and pages built to be cited.",
  },
  {
    number: "04",
    title: "Prove",
    body: "Weekly tracking across all five engines. You watch citations grow — or you see exactly where the work still is. Nothing hidden.",
  },
];

export function Process() {
  return (
    <section id="how-it-works" className="mk-section mk-hairline bg-[var(--ink-900)]" aria-labelledby="how-it-works-heading">
      <div className="mk-wrap">
        <Reveal>
          <p className="mk-kicker">How it works</p>
          <h2 id="how-it-works-heading" className="mk-h2 mt-5 max-w-2xl text-[var(--paper)]">
            A disciplined path from unnamed to cited.
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <Reveal key={step.number} delay={index * 90} className="h-full">
              <li className="mk-card flex h-full flex-col p-8">
                <span className="mk-num" aria-hidden="true">
                  {step.number}
                </span>
                <h3 className="mt-6 font-serif-display text-xl text-[var(--paper)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
