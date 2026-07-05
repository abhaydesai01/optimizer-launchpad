import {
  Bot,
  Building2,
  Lightbulb,
  ListChecks,
  Search,
  Target,
} from "lucide-react";
import { Reveal } from "@/components/marketing/Reveal";

const FEATURES = [
  {
    icon: ListChecks,
    step: "01",
    title: "Set up prompts",
    body: "Uncover and organise the buyer questions that decide your category — tagged by funnel stage, tracked across every engine.",
    anchor: "#platform",
  },
  {
    icon: Target,
    title: "Pick the winners",
    body: "Use visibility scores and gap analysis to focus on the prompts with the highest upside — not vanity volume estimates.",
    anchor: "#platform",
  },
  {
    icon: Building2,
    title: "Add your competitors",
    body: "Benchmark against the brands AI actually names — head-to-head visibility, mention counts and the sources behind their lead.",
    anchor: "#platform",
  },
  {
    icon: Bot,
    title: "Choose your engines",
    body: "ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude — tracked with the same methodology, weekly.",
    anchor: "#engines",
  },
  {
    icon: Search,
    title: "Find key sources",
    body: "See which domains AI trusts for your category — citation timelines, authority scores and the exact URLs behind every answer.",
    anchor: "#platform",
  },
  {
    icon: Lightbulb,
    title: "Act on insights",
    body: "Impact-ranked recommendations become a playbook — and our assigned team executes the content, schema and entity work.",
    anchor: "#platform",
  },
];

export function FeatureWorkflow() {
  return (
    <section
      className="mk-section mk-hairline"
      aria-labelledby="feature-workflow-heading"
    >
      <div className="mk-wrap">
        <Reveal>
          <p className="mk-kicker">Key capabilities</p>
          <h2 id="feature-workflow-heading" className="mk-h2 mt-5 max-w-2xl text-[var(--paper)]">
            Turn AI search insights into citations — then into customers.
          </h2>
          <p className="mk-body mt-6 max-w-2xl">
            The same workflow the best AI visibility trackers offer — with one
            difference: when the dashboard surfaces a gap, someone on our team
            closes it.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.title} delay={(index % 3) * 80} className="h-full">
              <a
                href={feature.anchor}
                className="mk-card group flex h-full flex-col p-8 transition-colors hover:border-[var(--mint)]"
              >
                <div className="flex items-center justify-between">
                  <feature.icon
                    className="h-6 w-6 text-[var(--mint)]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="mk-num text-[2rem]" aria-hidden="true">
                    {feature.step}
                  </span>
                </div>
                <h3 className="mt-6 font-serif-display text-lg text-[var(--paper)] group-hover:text-[var(--mint)]">
                  {feature.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[var(--paper-muted)]">
                  {feature.body}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
