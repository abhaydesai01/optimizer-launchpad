import type { Metadata } from "next";
import Link from "next/link";
import { SubPageShell } from "@/components/marketing/SubPageShell";

export const metadata: Metadata = {
  title: "AI Engine Coverage — ChatGPT, Perplexity, Gemini & More",
  description:
    "Optimizer360.ai tracks AI visibility, citations, sentiment and competitor position across ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude — weekly, prompt by prompt.",
  alternates: { canonical: "https://optimizer360.ai/engines" },
};

const ENGINES = [
  {
    name: "ChatGPT",
    description:
      "The most-used answer engine for consumer and B2B research. We track brand mentions, citation URLs, competitor shortlists and visibility trends for every prompt in your category set.",
    metrics: ["Visibility %", "Mention rate", "Citation URLs", "Position in answer"],
  },
  {
    name: "Perplexity",
    description:
      "Research-mode answers with explicit source attribution. We map which domains Perplexity cites for your category, how often you're named, and which competitors own the sources behind their lead.",
    metrics: ["Source domains", "Citation authority", "Per-prompt visibility", "Competitor gap %"],
  },
  {
    name: "Google AI Overviews",
    description:
      "The AI layer on the world's largest search surface. We track whether you appear in AI Overviews, how entities are recognised, and how your share of voice compares to named competitors.",
    metrics: ["Overview inclusion", "Entity signals", "Share of voice", "Schema readability"],
  },
  {
    name: "Gemini",
    description:
      "Google's generative layer across Search and Workspace. Weekly tracking of prompt-cluster visibility, sentiment framing and source overlap with traditional search results.",
    metrics: ["Cluster visibility", "Sentiment score", "30-day delta", "Engine breakdown"],
  },
  {
    name: "Claude",
    description:
      "The engine enterprise teams use for due diligence and vendor comparison. We monitor trust-framing, third-party source reliance and category recommendation lists.",
    metrics: ["Trust framing", "Third-party reliance", "Recommendation lists", "Competitor mentions"],
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AI Engines Tracked by Optimizer360.ai",
  itemListElement: ENGINES.map((engine, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: engine.name,
    description: engine.description,
  })),
};

export default function EnginesPage() {
  return (
    <SubPageShell
      kicker="Engine coverage"
      title="Every engine your buyers ask. One tracking standard."
      intro="Optimizer360.ai measures the same prompts across ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude — weekly, with metrics you can reproduce in any engine yourself."
    >
      <div className="space-y-8">
        {ENGINES.map((engine) => (
          <article key={engine.name} className="mk-card p-8 md:p-10">
            <h2 className="font-serif-display text-2xl text-[var(--paper)]">
              {engine.name}
            </h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[var(--paper-muted)]">
              {engine.description}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {engine.metrics.map((metric) => (
                <li
                  key={metric}
                  className="mk-pill text-[12px]"
                >
                  {metric}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-14 border border-[var(--ink-line-strong)] bg-[var(--ink-900)] p-8 text-center md:p-10">
        <h2 className="font-serif-display text-2xl text-[var(--paper)]">
          See your numbers across all five engines.
        </h2>
        <p className="mk-body mx-auto mt-4 max-w-xl">
          The audit runs every engine against your brand&apos;s top buyer
          prompts — confidential, no-obligation, every finding verifiable.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <Link href="/request-audit" className="mk-btn mk-btn-primary">
            Request an Audit
          </Link>
          <Link href="/compare" className="mk-btn mk-btn-ghost">
            How we compare to trackers
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </SubPageShell>
  );
}
