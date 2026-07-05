import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { buildFAQSchema } from "@/lib/schema-library";
import { getUseCaseBySlug, useCases } from "@/lib/usecases";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { CardGlow } from "@/components/marketing/CardGlow";
import { CAL_LINK } from "@/lib/site";

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
    title: useCase.title,
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
    <div className="theme-ink min-h-screen">
      <MarketingNav />
      <CardGlow />
      <main className="mk-wrap max-w-5xl pb-24 pt-52 md:pt-60">
        <Script
          id={`usecase-faq-${useCase.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <Link href="/usecases" className="mk-btn mk-btn-ghost">
          ← Back to all use cases
        </Link>

        <header className="mk-card mt-6 p-8 md:p-10">
          <p className="mk-kicker">{useCase.segment}</p>
          <h1 className="font-serif-display mt-3 text-3xl text-[var(--paper)] md:text-5xl">
            {useCase.title}
          </h1>
          <p className="mt-3 text-base text-[var(--paper-soft)]">{useCase.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--paper-muted)]">
            {useCase.intro}
          </p>
        </header>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="mk-card p-6">
            <h2 className="text-xl font-semibold text-[var(--paper)]">Where teams struggle</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--paper-muted)]">
              {useCase.painPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="mk-card p-6">
            <h2 className="text-xl font-semibold text-[var(--paper)]">
              Where GEO changes outcomes
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--paper-muted)]">
              {useCase.geoOpportunity.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mk-card mt-8 p-6">
          <h2 className="text-xl font-semibold text-[var(--paper)]">
            Optimizer360 operating model
          </h2>
          <div className="mt-4 space-y-4">
            {useCase.approach.map((step) => (
              <article
                key={`${step.phase}-${step.title}`}
                className="rounded-xl border border-[var(--ink-line)] p-4"
              >
                <p className="mk-kicker">{step.phase}</p>
                <h3 className="mt-1 text-lg font-semibold text-[var(--paper)]">{step.title}</h3>
                <p className="mt-2 text-sm text-[var(--paper-muted)]">{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mk-card mt-8 p-6">
          <h2 className="text-xl font-semibold text-[var(--paper)]">Role-specific playbooks</h2>
          <div className="mt-4 space-y-4">
            {useCase.rolePlaybooks.map((playbook) => (
              <article
                key={playbook.role}
                className="rounded-xl border border-[var(--ink-line)] p-4"
              >
                <h3 className="text-lg font-semibold text-[var(--paper)]">{playbook.role}</h3>
                <p className="mt-3 text-sm font-semibold text-[var(--paper-soft)]">
                  Business priorities
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--paper-muted)]">
                  {playbook.priorities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-semibold text-[var(--paper-soft)]">
                  GEO moves we execute
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--paper-muted)]">
                  {playbook.geoMoves.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-semibold text-[var(--paper-soft)]">
                  Scorecard KPIs
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--paper-muted)]">
                  {playbook.kpis.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mk-card mt-8 p-6">
          <h2 className="text-xl font-semibold text-[var(--paper)]">Expected outcomes</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--paper-muted)]">
            {useCase.expectedOutcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mk-card mt-8 p-6">
          <h2 className="text-xl font-semibold text-[var(--paper)]">
            Frequently asked questions
          </h2>
          <div className="mt-4 space-y-3">
            {useCase.faq.map((entry) => (
              <article
                key={entry.question}
                className="rounded-xl border border-[var(--ink-line)] p-4"
              >
                <h3 className="text-base font-semibold text-[var(--paper)]">
                  {entry.question}
                </h3>
                <p className="mt-2 text-sm text-[var(--paper-muted)]">{entry.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mk-card mt-8 p-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--paper)]">
            Want this GEO playbook for your team?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--paper-muted)]">
            We can map your segment, role priorities, and prompt universe into an execution
            roadmap with measurable revenue outcomes.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link href="/request-audit" className="mk-btn mk-btn-primary">
              Request free GEO audit
            </Link>
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noreferrer"
              className="mk-btn mk-btn-ghost"
            >
              Book strategy call
            </a>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
