import { Reveal } from "@/components/Reveal";

export function WhatIsGEO() {
  return (
    <section id="geo" className="section-pad border-y border-[var(--border-color)] bg-[var(--bg-surface)]">
      <Reveal className="section-wrap">
        <h2 className="display text-4xl font-bold md:text-5xl">
          What is Generative Engine Optimization (GEO)?
        </h2>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--text-muted)]">
          <p>
            Generative Engine Optimization (GEO) is the practice of structuring
            your brand's content, authority signals, and digital presence so
            that AI engines - ChatGPT, Perplexity, Google AI Overviews, Claude,
            and Gemini - cite your business when your buyers ask questions
            related to your product or industry.
          </p>
          <p>
            Unlike traditional SEO, which optimizes for blue links and rankings,
            GEO optimizes for citations. When a potential client asks ChatGPT
            "what's the best autonomous revenue tool for Indian startups," GEO
            determines whether the answer includes your brand - or your
            competitor's.
          </p>
          <p>
            Optimizer360 GEO combines a real-time SaaS tracking platform with a
            dedicated team that executes GEO for you - so you're not just
            measuring citations, you're earning them.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
