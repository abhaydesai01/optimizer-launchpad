import { MessageSquare, ShieldQuestion, Scale } from "lucide-react";
import { Reveal } from "@/components/marketing/Reveal";

const SCENARIOS = [
  {
    icon: MessageSquare,
    title: "The category question",
    body: "A customer asks AI for the best in your category. A competitor is named. You aren't.",
  },
  {
    icon: ShieldQuestion,
    title: "The trust check",
    body: "Someone checks whether you're trustworthy. The AI answers from third-party sites — not from you.",
  },
  {
    icon: Scale,
    title: "The shortlist",
    body: "A buyer compares options. The AI's shortlist decides who they contact. You never knew the conversation happened.",
  },
];

export function InvisibleCost() {
  return (
    <section className="mk-section mk-hairline bg-[var(--ink-900)]" aria-labelledby="invisible-cost-heading">
      <div className="mk-wrap">
        <Reveal>
          <p className="mk-kicker">The invisible cost</p>
          <h2 id="invisible-cost-heading" className="mk-h2 mt-5 max-w-3xl text-[var(--paper)]">
            When AI gives one answer, being option #7 is the same as being
            invisible.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SCENARIOS.map((scenario, index) => (
            <Reveal key={scenario.title} delay={index * 100} className="h-full">
              <article className="mk-card h-full p-8">
                <scenario.icon
                  className="h-6 w-6 text-[var(--amber)]"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="mt-6 font-serif-display text-lg text-[var(--paper)]">
                  {scenario.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
                  {scenario.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-14 max-w-2xl border-l-2 border-[var(--amber)] pl-6 font-serif-display text-xl leading-relaxed text-[var(--paper-soft)] md:text-2xl">
            None of this shows up in your analytics. That&apos;s what makes it
            dangerous.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
