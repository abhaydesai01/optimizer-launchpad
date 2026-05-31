export default function PricingPage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-16">
      <section className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#00A27A]">
          Pricing
        </p>
        <h1 className="display mt-3 text-3xl font-bold text-[#222735] md:text-5xl">
          Choose the right GEO growth cadence
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-sm text-[#5E667D]">
          Every plan is tailored to your vertical, prompt landscape, and content
          velocity. These starting ranges help you choose the right engagement
          model.
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <article className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
          <p className="text-sm font-semibold text-[#00A27A]">Starter</p>
          <h2 className="mt-2 text-2xl font-bold text-[#222735]">$1,000/mo</h2>
          <p className="mt-2 text-sm text-[#5E667D]">For early-stage teams validating GEO channels.</p>
          <ul className="mt-4 space-y-2 text-sm text-[#5E667D]">
            <li>- Prompt intent map (up to 20 queries)</li>
            <li>- 4 GEO articles/month</li>
            <li>- Schema and on-page optimization</li>
            <li>- Monthly performance review</li>
          </ul>
        </article>

        <article className="rounded-2xl border-2 border-[#222735] bg-white p-6">
          <p className="text-sm font-semibold text-[#00A27A]">Growth</p>
          <h2 className="mt-2 text-2xl font-bold text-[#222735]">$2,500/mo</h2>
          <p className="mt-2 text-sm text-[#5E667D]">
            For teams building predictable AI-first inbound.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-[#5E667D]">
            <li>- Full GEO strategy + editorial calendar</li>
            <li>- 8 GEO articles/month</li>
            <li>- Internal linking and schema QA</li>
            <li>- Fortnightly optimization sprints</li>
          </ul>
        </article>

        <article className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
          <p className="text-sm font-semibold text-[#00A27A]">Scale</p>
          <h2 className="mt-2 text-2xl font-bold text-[#222735]">Custom</h2>
          <p className="mt-2 text-sm text-[#5E667D]">
            For multi-market brands with high publishing velocity.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-[#5E667D]">
            <li>- GEO program design across teams</li>
            <li>- 12+ articles/month and campaign clusters</li>
            <li>- Executive dashboards and attribution</li>
            <li>- Dedicated strategic support</li>
          </ul>
        </article>
      </section>

      <section className="mt-10 rounded-2xl border border-[#E2E7F0] bg-white p-8 text-center">
        <h2 className="text-2xl font-bold text-[#222735]">Need a custom rollout?</h2>
        <p className="mt-3 text-sm text-[#5E667D]">
          We can scope GEO, content, and distribution systems around your exact
          revenue goals and market category.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={process.env.NEXT_PUBLIC_CAL_LINK || "https://cal.com/abhay-desai/free-geo-strategy-call-optimizer360"}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#222735] px-5 py-2 text-sm font-semibold text-white"
          >
            Book pricing consultation
          </a>
          <a
            href="/contact"
            className="rounded-full border border-[#D6DEEC] px-5 py-2 text-sm font-semibold text-[#222735]"
          >
            Talk to team
          </a>
        </div>
      </section>
    </main>
  );
}
