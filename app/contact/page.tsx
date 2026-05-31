export default function ContactPage() {
  const calLink =
    process.env.NEXT_PUBLIC_CAL_LINK ||
    "https://cal.com/abhay-desai/free-geo-strategy-call-optimizer360";

  return (
    <main className="container mx-auto max-w-5xl px-4 py-16">
      <section className="rounded-2xl border border-[#E2E7F0] bg-white p-8 md:p-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#00A27A]">
          Contact
        </p>
        <h1 className="display mt-3 text-3xl font-bold text-[#222735] md:text-5xl">
          Talk to the Optimizer360 team
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-[#5E667D]">
          Share your growth goals and we will help you evaluate whether GEO and
          AI-first distribution can accelerate qualified inbound for your brand.
        </p>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
          <h2 className="text-xl font-semibold text-[#222735]">Book a strategy call</h2>
          <p className="mt-3 text-sm text-[#5E667D]">
            Get a focused walkthrough on your current AI visibility and growth
            opportunities.
          </p>
          <a
            href={calLink}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-full bg-[#222735] px-5 py-2 text-sm font-semibold text-white"
          >
            Book on Cal.com
          </a>
        </article>

        <article className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
          <h2 className="text-xl font-semibold text-[#222735]">Request a free GEO audit</h2>
          <p className="mt-3 text-sm text-[#5E667D]">
            We review your brand visibility across major AI answer engines and
            send a custom audit report.
          </p>
          <a
            href="/?audit=true"
            className="mt-5 inline-flex rounded-full border border-[#D6DEEC] px-5 py-2 text-sm font-semibold text-[#222735]"
          >
            Start free audit
          </a>
        </article>
      </section>

      <section className="mt-8 rounded-2xl border border-[#E2E7F0] bg-white p-6">
        <h2 className="text-xl font-semibold text-[#222735]">Email us</h2>
        <p className="mt-3 text-sm text-[#5E667D]">
          For partnerships, speaking, or media requests:
        </p>
        <a href="mailto:hello@optimizer360.ai" className="mt-2 inline-block text-sm font-semibold text-[#2563EB]">
          hello@optimizer360.ai
        </a>
      </section>
    </main>
  );
}
