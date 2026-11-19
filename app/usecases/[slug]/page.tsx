import { MarketingPage } from "@/components/marketing/MarketingPage";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { BreadcrumbTrail } from "@/components/marketing/BreadcrumbTrail";
import { pageMeta } from "@/lib/page-metadata";
import { buildFAQSchema } from "@/lib/schema-library";
import { getUseCaseBySlug, useCases } from "@/lib/usecases";
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

  return pageMeta({
    title: useCase.title,
    description: useCase.tagline,
    path: `/usecases/${useCase.slug}`,
  });
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
    <MarketingPage>
      <main className="mk-wrap max-w-5xl pb-24 pt-40 sm:pt-44 lg:pt-48">
        <BreadcrumbTrail
          items={[
            { label: "Home", href: "/" },
            { label: "Use cases", href: "/usecases" },
            { label: useCase.shortTitle },
          ]}
        />
        <Script
          id={`usecase-faq-${useCase.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <header className="pb-6">
          <p className="mk-settle text-[13px] font-medium text-[var(--mint)]">{useCase.segment}</p>
          <h1 className="font-serif-display mt-3 max-w-[24ch] text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.04] text-[var(--paper)]">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="mk-rise block">{useCase.title}</span>
            </span>
          </h1>
          <p className="mk-settle mt-6 max-w-2xl text-[19px] leading-relaxed text-[var(--paper)]" style={{ animationDelay: "250ms" }}>
            {useCase.tagline}
          </p>
          <p className="mk-settle mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--paper-soft)]" style={{ animationDelay: "320ms" }}>
            {useCase.intro}
          </p>
        </header>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="mk-card p-6">
            <h2 className="font-serif-display text-[1.55rem] leading-tight text-[var(--paper)]">Where teams struggle</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[var(--paper-soft)]">
              {useCase.painPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="mk-card p-6">
            <h2 className="font-serif-display text-[1.55rem] leading-tight text-[var(--paper)]">
              Where GEO changes outcomes
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[var(--paper-soft)]">
              {useCase.geoOpportunity.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mk-card mt-8 p-6">
          <h2 className="font-serif-display text-[1.55rem] leading-tight text-[var(--paper)]">
            Optimizer360 operating model
          </h2>
          <div className="mt-4 space-y-4">
            {useCase.approach.map((step) => (
              <article
                key={`${step.phase}-${step.title}`}
                className="rounded-xl border border-[var(--ink-line)] p-4"
              >
                <p className="text-[13px] font-medium text-[var(--mint)]">{step.phase}</p>
                <h3 className="mt-1 text-lg font-semibold text-[var(--paper)]">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--paper-soft)]">{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mk-card mt-8 p-6">
          <h2 className="font-serif-display text-[1.55rem] leading-tight text-[var(--paper)]">Role-specific playbooks</h2>
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
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-[var(--paper-soft)]">
                  {playbook.priorities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-semibold text-[var(--paper-soft)]">
                  GEO moves we execute
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-[var(--paper-soft)]">
                  {playbook.geoMoves.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-semibold text-[var(--paper-soft)]">
                  Scorecard KPIs
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-[var(--paper-soft)]">
                  {playbook.kpis.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mk-card mt-8 p-6">
          <h2 className="font-serif-display text-[1.55rem] leading-tight text-[var(--paper)]">Expected outcomes</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[var(--paper-soft)]">
            {useCase.expectedOutcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mk-card mt-8 p-6">
          <h2 className="font-serif-display text-[1.55rem] leading-tight text-[var(--paper)]">
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
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--paper-soft)]">{entry.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mk-card mt-8 p-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--paper)]">
            Want this GEO playbook for your team?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--paper-soft)]">
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
      </MarketingPage>
  );
}
