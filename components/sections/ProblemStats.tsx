"use client";

import { Reveal } from "@/components/Reveal";

export function ProblemStats() {
  return (
    <section id="stats" className="section-pad">
      <Reveal className="section-wrap">
        <h2 className="display text-4xl font-bold md:text-5xl">
          Your buyers are searching AI, not Google. Are you showing up?
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <article className="surface-card p-8 transition-colors hover:border-[#00E5A040]">
            <p className="mono text-6xl text-[var(--accent-green)]">65%</p>
            <p className="mt-4 text-lg">of ChatGPT queries are search-intent</p>
            <p className="mt-2 text-xs text-[var(--text-faint)]">
              Jasper AI, 2026
            </p>
          </article>
          <article className="surface-card p-8 transition-colors hover:border-[#00E5A040]">
            <p className="mono text-6xl text-[var(--accent-green)]">58%</p>
            <p className="mt-4 text-lg">
              drop in Google CTR due to AI Overviews
            </p>
            <p className="mt-2 text-xs text-[var(--text-faint)]">
              Ahrefs, 2026
            </p>
          </article>
          <article className="surface-card p-8 transition-colors hover:border-[#00E5A040]">
            <p className="mono text-6xl text-[var(--accent-green)]">96%</p>
            <p className="mt-4 text-lg">
              of AI citations come from structured content & PR
            </p>
            <p className="mt-2 text-xs text-[var(--text-faint)]">
              Princeton/Stanford Research
            </p>
          </article>
        </div>

        <p className="mt-10 text-center text-lg">
          "If you're not optimised for AI engines, you don't exist for your
          next buyer."
        </p>
      </Reveal>
    </section>
  );
}
