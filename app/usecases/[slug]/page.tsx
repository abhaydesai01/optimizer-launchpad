import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { buildFAQSchema } from "@/lib/schema-library";
import { getUseCaseBySlug, useCases } from "@/lib/usecases";

export function generateStaticParams() {
  return useCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const useCase = getUseCaseBySlug(params.slug);
  if (!useCase) return {};

  return {
    title: `${useCase.title} | Optimizer360 Use Cases`,
    description: useCase.tagline,
    alternates: {
      canonical: `https://optimizer360.ai/usecases/${useCase.slug}`,
    },
  };
}

export default function UseCaseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const useCase = getUseCaseBySlug(params.slug);
  if (!useCase) notFound();

  const faqSchema = buildFAQSchema(
    useCase.faq.map((entry) => ({
      question: entry.question,
      answer: entry.answer,
    })),
  );

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <Script
        id={`usecase-faq-${useCase.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

        <Link
          href="/usecases"
          className="inline-flex rounded-full border border-[#D6DEEC] bg-white px-4 py-2 text-sm font-semibold text-[#1f2740] transition-colors hover:bg-[#f4f6fb]"
        >
          ← Back to all use cases
        </Link>

        <header className="mt-4 rounded-2xl border border-[#E2E7F0] bg-white p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#00A27A]">
            {useCase.segment}
          </p>
          <h1 className="display mt-2 text-3xl font-bold text-[#222735] md:text-5xl">
            {useCase.title}
          </h1>
          <p className="mt-3 text-base text-[#4B5563]">{useCase.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-[#5E667D]">{useCase.intro}</p>
        </header>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
            <h2 className="text-xl font-semibold text-[#222735]">Where teams struggle</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#5E667D]">
              {useCase.painPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-[#E2E7F0] bg-white p-6">
            <h2 className="text-xl font-semibold text-[#222735]">Where GEO changes outcomes</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#5E667D]">
              {useCase.geoOpportunity.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-[#E2E7F0] bg-white p-6">
          <h2 className="text-xl font-semibold text-[#222735]">Optimizer360 operating model</h2>
          <div className="mt-4 space-y-4">
            {useCase.approach.map((step) => (
              <article
                key={`${step.phase}-${step.title}`}
                className="rounded-xl border border-[#E2E7F0] p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[#00A27A]">
                  {step.phase}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-[#222735]">{step.title}</h3>
                <p className="mt-2 text-sm text-[#5E667D]">{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#E2E7F0] bg-white p-6">
          <h2 className="text-xl font-semibold text-[#222735]">Role-specific playbooks</h2>
          <div className="mt-4 space-y-4">
            {useCase.rolePlaybooks.map((playbook) => (
              <article key={playbook.role} className="rounded-xl border border-[#E2E7F0] p-4">
                <h3 className="text-lg font-semibold text-[#222735]">{playbook.role}</h3>
                <p className="mt-3 text-sm font-semibold text-[#374151]">Business priorities</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#5E667D]">
                  {playbook.priorities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-semibold text-[#374151]">GEO moves we execute</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#5E667D]">
                  {playbook.geoMoves.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-semibold text-[#374151]">Scorecard KPIs</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#5E667D]">
                  {playbook.kpis.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#E2E7F0] bg-white p-6">
          <h2 className="text-xl font-semibold text-[#222735]">Expected outcomes</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#5E667D]">
            {useCase.expectedOutcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-[#E2E7F0] bg-white p-6">
          <h2 className="text-xl font-semibold text-[#222735]">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {useCase.faq.map((entry) => (
              <article key={entry.question} className="rounded-xl border border-[#E2E7F0] p-4">
                <h3 className="text-base font-semibold text-[#222735]">{entry.question}</h3>
                <p className="mt-2 text-sm text-[#5E667D]">{entry.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#E2E7F0] bg-white p-8 text-center">
          <h2 className="text-2xl font-bold text-[#222735]">Want this GEO playbook for your team?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#5E667D]">
            We can map your segment, role priorities, and prompt universe into an execution
            roadmap with measurable revenue outcomes.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/?audit=true"
              className="rounded-full bg-[#222735] px-5 py-2 text-sm font-semibold text-white"
            >
              Request free GEO audit
            </a>
            <a
              href={
                process.env.NEXT_PUBLIC_CAL_LINK ||
                "https://cal.com/abhay-desai/free-geo-strategy-call-optimizer360"
              }
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
