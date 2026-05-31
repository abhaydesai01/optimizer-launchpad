export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-16">
      <section className="rounded-2xl border border-[#E2E7F0] bg-white p-8 md:p-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#00A27A]">
          About Optimizer360
        </p>
        <h1 className="display mt-3 text-3xl font-bold text-[#222735] md:text-5xl">
          Building AI-native distribution infrastructure for modern teams
        </h1>
        <p className="mt-6 max-w-3xl text-base text-[#5E667D]">
          Optimizer360 helps growth teams become discoverable in AI-first surfaces
          such as ChatGPT, Perplexity, and Google AI Overviews. We combine GEO
          strategy, content systems, and operational workflows so brands can
          improve visibility and convert intent into pipeline.
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <article className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#222735]">Our mission</h2>
          <p className="mt-3 text-sm text-[#5E667D]">
            Help teams win in answer engines by replacing ad-hoc publishing with a
            repeatable, measurable GEO operating model.
          </p>
        </article>
        <article className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#222735]">How we work</h2>
          <p className="mt-3 text-sm text-[#5E667D]">
            We pair strategy with execution: prompt intent mapping, pipeline
            design, editorial QA, schema, and ongoing visibility tracking.
          </p>
        </article>
        <article className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#222735]">Who we serve</h2>
          <p className="mt-3 text-sm text-[#5E667D]">
            SaaS, services, and growth-stage teams that need qualified inbound
            demand without endlessly scaling headcount.
          </p>
        </article>
      </section>

      <section className="mt-10 rounded-2xl border border-[#E2E7F0] bg-white p-8 md:p-10">
        <h2 className="text-2xl font-bold text-[#222735]">What is next</h2>
        <p className="mt-4 max-w-3xl text-sm text-[#5E667D]">
          We are expanding the platform across GEO intelligence, autonomous
          editorial workflows, and distribution orchestration so teams can move
          from one-off content experiments to a compounding growth system.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/?audit=true"
            className="rounded-full bg-[#222735] px-5 py-2 text-sm font-semibold text-white"
          >
            Get a free GEO audit
          </a>
          <a
            href={process.env.NEXT_PUBLIC_CAL_LINK || "https://cal.com/abhay-desai/free-geo-strategy-call-optimizer360"}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#D6DEEC] px-5 py-2 text-sm font-semibold text-[#222735]"
          >
            Book strategy call
          </a>
        </div>
      </section>
    </main>
  );
}
