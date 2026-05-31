export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="display text-3xl font-bold text-[#222735] md:text-5xl">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-[#5E667D]">Last updated: May 31, 2026</p>

      <section className="mt-8 space-y-6 rounded-2xl border border-[#E2E7F0] bg-white p-8">
        <article>
          <h2 className="text-lg font-semibold text-[#222735]">Scope of services</h2>
          <p className="mt-2 text-sm text-[#5E667D]">
            Optimizer360 provides GEO strategy, content workflows, and related
            consulting services as defined in project agreements.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-semibold text-[#222735]">Client responsibilities</h2>
          <p className="mt-2 text-sm text-[#5E667D]">
            You are responsible for providing accurate information, timely feedback,
            and rights to any materials supplied for service delivery.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-semibold text-[#222735]">Intellectual property</h2>
          <p className="mt-2 text-sm text-[#5E667D]">
            Unless otherwise stated in a signed agreement, deliverables created for
            your engagement are licensed for your business use after payment.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-semibold text-[#222735]">Limitation of liability</h2>
          <p className="mt-2 text-sm text-[#5E667D]">
            Services are provided in good faith. To the maximum extent permitted by
            law, Optimizer360 is not liable for indirect or consequential damages.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-semibold text-[#222735]">Contact</h2>
          <p className="mt-2 text-sm text-[#5E667D]">
            For legal questions about these terms, contact hello@optimizer360.ai.
          </p>
        </article>
      </section>
    </main>
  );
}
