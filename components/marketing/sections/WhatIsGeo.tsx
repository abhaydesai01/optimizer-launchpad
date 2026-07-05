import Link from "next/link";
import { Reveal } from "@/components/marketing/Reveal";

const ENGINES = [
  "ChatGPT",
  "Perplexity",
  "Google AI Overviews",
  "Gemini",
  "Claude",
];

export function WhatIsGeo() {
  return (
    <section id="what-is-geo" className="mk-section mk-hairline" aria-labelledby="what-is-geo-heading">
      <div className="mk-wrap grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="mk-kicker">What AI SEO is</p>
            <h2 id="what-is-geo-heading" className="mk-h2 mt-5 text-[var(--paper)]">
              SEO earned you a rank in a list. AI SEO earns you a place in the
              answer.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mk-body mt-7">
              AI SEO — formally, Generative Engine Optimisation (GEO) — is the
              discipline of structuring your credibility, content and evidence
              so AI engines can read, trust and cite you. When a buyer asks
              ChatGPT or Google AI who to trust, the engine composes one answer
              from the sources it considers credible. Our work is making sure
              you are one of those sources — across all five major engines.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <ul className="mt-9 flex flex-wrap gap-2.5" aria-label="Engines covered">
              {ENGINES.map((engine) => (
                <li key={engine} className="mk-pill">
                  {engine}
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Link
                href="/ai-seo"
                className="text-sm font-medium text-[var(--mint)] underline decoration-[var(--ink-line-strong)] underline-offset-8 transition-colors hover:decoration-[var(--mint)]"
              >
                Read the executive briefing: What is AI SEO? →
              </Link>
            </p>
          </Reveal>
        </div>

        <Reveal delay={140} className="h-full">
          <aside className="flex h-full flex-col justify-center border border-[var(--ink-line-strong)] bg-[var(--ink-900)] p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--amber)]">
              A necessary distinction
            </p>
            <p className="mt-5 font-serif-display text-2xl leading-snug text-[var(--paper)]">
              A familiar name. A different discipline.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--paper-muted)]">
              We call it AI SEO because that&apos;s the fastest way to
              understand it. But the mechanics are new: AI engines don&apos;t
              rank keywords and backlinks — they cite trust, structure and
              evidence. Your search rankings don&apos;t transfer automatically.
              The answer has to be earned on its own terms.
            </p>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
