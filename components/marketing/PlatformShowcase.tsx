"use client";

import Image from "next/image";
import { useState } from "react";

const VIEWS = [
  {
    id: "prompts",
    tab: "01 · Track prompts",
    title: "Start with the questions that decide your category.",
    body: "Every engagement is built on a tracked set of buyer prompts — the real questions your customers ask AI. Each one is monitored across engines, staged by funnel position, and scored for visibility.",
    image: "/platform/prompt-intelligence.png",
    alt: "Optimizer360.ai Prompt Intelligence screen tracking buyer prompts with visibility scores, funnel stages and per-engine coverage",
  },
  {
    id: "command-center",
    tab: "02 · Measure",
    title: "Your entire AI footprint in one view.",
    body: "Visibility score, citation rate, share of voice and engine breakdown — with every scan logged and every alert live. This is the honest before-and-after, updated continuously.",
    image: "/platform/command-center.png",
    alt: "Optimizer360.ai Command Center dashboard showing AI visibility score, citation rate, share of voice, visibility-over-time chart and per-engine breakdown",
  },
  {
    id: "ai-visibility",
    tab: "03 · Diagnose",
    title: "Every buyer question, engine by engine.",
    body: "The LLM coverage matrix shows each prompt that matters in your category — where you're visible, where you're absent, and the upside if it's fixed. No averages hiding the truth.",
    image: "/platform/ai-visibility.png",
    alt: "Optimizer360.ai AI Visibility screen with 30-day visibility trend, coverage by engine, and an LLM coverage matrix of prompts with visibility percentages",
  },
  {
    id: "citations",
    tab: "04 · Trace sources",
    title: "Know exactly which domains AI trusts.",
    body: "Every citation, traced to its source: which domains the engines lean on, their authority, and the exact cited URLs behind every answer — each one a link you can open and verify.",
    image: "/platform/citation-intelligence.png",
    alt: "Optimizer360.ai Citation Intelligence screen showing citation timeline, citations by AI engine, top citation domains and an AI cited link explorer",
  },
  {
    id: "competitors",
    tab: "05 · Benchmark",
    title: "See who's beating you — and why.",
    body: "Head-to-head AI visibility against every competitor: who gets mentioned, on which prompts, which sources support them, and the exact gap to close.",
    image: "/platform/competitor-arena.png",
    alt: "Optimizer360.ai Competitor Arena screen with head-to-head AI visibility rankings, competitor mention counts and per-competitor gap analysis",
  },
  {
    id: "recommendations",
    tab: "06 · Act",
    title: "Insights that end in actions, not dashboards.",
    body: "Prioritised, impact-ranked recommendations — prompt gaps, content, schema, citations — turned into a playbook with progress tracking. This is where our assigned team picks up and executes.",
    image: "/platform/recommendations.png",
    alt: "Optimizer360.ai Recommendations screen with an impact-ranked action playbook covering prompt gaps, content, schema and citation opportunities",
  },
];

export function PlatformShowcase() {
  const [active, setActive] = useState(0);
  const view = VIEWS[active];

  return (
    <section id="platform" className="mk-section mk-hairline bg-[var(--ink-900)]" aria-labelledby="platform-heading">
      <div className="mk-wrap">
        <p className="mk-kicker">The platform</p>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <h2 id="platform-heading" className="mk-h2 max-w-2xl text-[var(--paper)]">
            From tracked prompt to executed fix — one platform.
          </h2>
          <p className="max-w-sm text-[15px] leading-relaxed text-[var(--paper-muted)]">
            Built in-house, not white-labelled. Tracking tools stop at the
            dashboard; ours ends in an executed playbook — and every number is
            one your team can interrogate.
          </p>
        </div>

        <div className="mt-12" role="tablist" aria-label="Platform views">
          <div className="flex flex-wrap gap-2">
            {VIEWS.map((item, index) => (
              <button
                key={item.id}
                role="tab"
                id={`platform-tab-${item.id}`}
                aria-selected={index === active}
                aria-controls={`platform-panel-${item.id}`}
                onClick={() => setActive(index)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  index === active
                    ? "border-[var(--mint)] bg-[var(--mint-dim)] text-[var(--mint)]"
                    : "border-[var(--ink-line-strong)] text-[var(--paper-soft)] hover:border-[var(--paper-muted)] hover:text-[var(--paper)]"
                }`}
              >
                {item.tab}
              </button>
            ))}
          </div>
        </div>

        <div
          key={view.id}
          role="tabpanel"
          id={`platform-panel-${view.id}`}
          aria-labelledby={`platform-tab-${view.id}`}
          className="mk-pop mt-8 grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start"
        >
          <div className="lg:pt-4">
            <h3 className="font-serif-display text-2xl text-[var(--paper)]">
              {view.title}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--paper-muted)]">
              {view.body}
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--ink-line-strong)] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-[var(--paper-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber)]" aria-hidden="true" />
              Product preview · demo data
            </p>
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-6 opacity-60"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(60,232,180,0.1), transparent 70%)",
              }}
            />
            <div className="relative overflow-hidden rounded border border-[var(--ink-line-strong)] bg-[var(--ink-950)] shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-1.5 border-b border-[var(--ink-line)] px-4 py-2.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink-800)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink-800)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink-800)]" />
                <span className="ml-3 rounded bg-[var(--ink-800)] px-2 py-0.5 text-[10px] text-[var(--paper-muted)]">
                  app.optimizer360.ai
                </span>
              </div>
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={view.image}
                  alt={view.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover object-top"
                  priority={active === 0}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
