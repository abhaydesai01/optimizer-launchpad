export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="display text-3xl font-bold text-[#222735] md:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-[#5E667D]">Last updated: May 31, 2026</p>

      <section className="mt-8 space-y-6 rounded-2xl border border-[#E2E7F0] bg-white p-8">
        <article>
          <h2 className="text-lg font-semibold text-[#222735]">Information we collect</h2>
          <p className="mt-2 text-sm text-[#5E667D]">
            We collect information you submit through forms, including name, email,
            company, website, industry details, and audit request context.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-semibold text-[#222735]">How we use information</h2>
          <p className="mt-2 text-sm text-[#5E667D]">
            We use submitted information to respond to inquiries, deliver GEO audit
            reports, schedule calls, and improve our services.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-semibold text-[#222735]">Data sharing</h2>
          <p className="mt-2 text-sm text-[#5E667D]">
            We do not sell personal data. We may share data with trusted service
            providers required to operate the service, such as email or hosting
            providers.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-semibold text-[#222735]">Retention and security</h2>
          <p className="mt-2 text-sm text-[#5E667D]">
            We retain data only as long as needed for business and legal purposes
            and apply reasonable technical safeguards to protect it.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-semibold text-[#222735]">Your rights</h2>
          <p className="mt-2 text-sm text-[#5E667D]">
            You can request access, correction, or deletion of personal data by
            contacting us at hello@optimizer360.ai.
          </p>
        </article>
      </section>
    </main>
  );
}
