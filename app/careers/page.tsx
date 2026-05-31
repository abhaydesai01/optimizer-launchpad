export default function CareersPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-16">
      <section className="rounded-2xl border border-[#E2E7F0] bg-white p-8 md:p-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#00A27A]">
          Careers
        </p>
        <h1 className="display mt-3 text-3xl font-bold text-[#222735] md:text-5xl">
          Build the future of AI-first growth
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-[#5E667D]">
          We are a lean team building practical systems for GEO, distribution, and
          autonomous revenue operations. If you like shipping fast with customer
          impact, we want to hear from you.
        </p>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
          <h2 className="text-xl font-semibold text-[#222735]">Open applications</h2>
          <p className="mt-3 text-sm text-[#5E667D]">
            We are currently accepting open applications for product, growth,
            content, and engineering roles.
          </p>
          <a
            href="mailto:careers@optimizer360.ai?subject=Open%20Application%20-%20Optimizer360"
            className="mt-5 inline-flex rounded-full bg-[#222735] px-5 py-2 text-sm font-semibold text-white"
          >
            Send application
          </a>
        </article>

        <article className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
          <h2 className="text-xl font-semibold text-[#222735]">What we look for</h2>
          <ul className="mt-3 space-y-2 text-sm text-[#5E667D]">
            <li>- Ownership mindset with strong execution speed</li>
            <li>- Clear written communication</li>
            <li>- Curiosity about AI-native workflows and GTM systems</li>
            <li>- Ability to work across strategy and implementation</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
