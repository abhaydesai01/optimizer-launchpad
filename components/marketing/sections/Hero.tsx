import Link from "next/link";
import { AnswerBeams } from "@/components/marketing/AnswerMark";
import { Reveal } from "@/components/marketing/Reveal";
import { HeroAnswerDemo } from "@/components/marketing/HeroAnswerDemo";
import { CAL_LINK } from "@/lib/site";

const ENGINES = [
  "ChatGPT",
  "Perplexity",
  "Google AI Overviews",
  "Gemini",
  "Claude",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-52 md:pb-28 md:pt-60">
      <div className="mk-grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <AnswerBeams className="absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 70% 35%, rgba(60,232,180,0.06), transparent 65%)",
        }}
      />

      <div className="mk-wrap relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="mk-kicker">
              AI SEO <span className="text-[var(--paper-muted)]">·</span>{" "}
              <span className="text-[var(--paper-muted)]">
                Generative Engine Optimisation
              </span>
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mk-h1 mt-6 text-[var(--paper)]">
              Be the brand <span className="mk-shimmer">AI recommends.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mk-body mt-7 max-w-xl">
              Your customers now ask ChatGPT, Perplexity and Google AI who to
              trust — and the answer names only a few brands. Optimizer360.ai
              is the AI SEO firm that makes sure one of them is you.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/request-audit" className="mk-btn mk-btn-primary">
                Request your AI visibility audit
              </Link>
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noreferrer"
                className="mk-btn mk-btn-ghost"
              >
                Talk to a strategist
              </a>
            </div>
            <p className="mt-5">
              <Link
                href="/#how-it-works"
                className="text-sm font-medium text-[var(--paper-soft)] underline decoration-[var(--ink-line-strong)] underline-offset-8 transition-colors hover:text-[var(--mint)] hover:decoration-[var(--mint)]"
              >
                See how it works
              </Link>
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-12">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--paper-muted)]">
                One discipline. All five engines.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5" aria-label="AI engines covered">
                {ENGINES.map((engine) => (
                  <li key={engine} className="mk-pill">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-[var(--mint)]"
                      aria-hidden="true"
                    />
                    {engine}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mk-float relative">
            <HeroAnswerDemo />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
