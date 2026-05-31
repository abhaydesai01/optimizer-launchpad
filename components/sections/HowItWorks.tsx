import { Activity, Layers, Search } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export function HowItWorks() {
  return (
    <section className="section-pad">
      <Reveal className="section-wrap">
        <h2 className="display text-4xl font-bold md:text-5xl">
          SaaS + Team. You get both.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <article className="surface-card p-6 transition-colors hover:border-[#00E5A040]">
            <Search className="text-[var(--accent-green)]" />
            <h3 className="mt-4 text-xl font-semibold">Step 1: GEO Audit</h3>
            <p className="mt-3 text-[var(--text-muted)]">
              We analyse your current AI citation footprint across 6 AI engines.
              You see exactly where you appear, where you don't, and why.
            </p>
          </article>
          <article className="surface-card p-6 transition-colors hover:border-[#00E5A040]">
            <Layers className="text-[var(--accent-green)]" />
            <h3 className="mt-4 text-xl font-semibold">
              Step 2: Done-For-You Execution
            </h3>
            <p className="mt-3 text-[var(--text-muted)]">
              Our team handles content structuring, schema markup, FAQ
              optimisation, PR placement, and entity building - everything that
              earns citations.
            </p>
          </article>
          <article className="surface-card p-6 transition-colors hover:border-[#00E5A040]">
            <Activity className="text-[var(--accent-green)]" />
            <h3 className="mt-4 text-xl font-semibold">
              Step 3: Real-Time Dashboard
            </h3>
            <p className="mt-3 text-[var(--text-muted)]">
              Track every citation, every AI engine, every query - live on your
              Optimizer360 dashboard. Know exactly when and where AI mentions
              you.
            </p>
          </article>
        </div>

        <div className="mt-8 border-l-4 border-[var(--accent-green)] bg-[#00E5A008] p-6 text-[var(--text-muted)]">
          💡 Most GEO tools only track. We track AND execute. That's the
          difference between knowing the problem and fixing it.
        </div>
      </Reveal>
    </section>
  );
}
