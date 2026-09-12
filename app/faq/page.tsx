import Link from "next/link";
import { JsonLd } from "@/components/marketing/JsonLd";
import { SubPageShell } from "@/components/marketing/SubPageShell";
import { MARKETING_FAQ } from "@/lib/marketing-faq";
import { pageMeta } from "@/lib/page-metadata";
import { buildFAQSchema } from "@/lib/schema-library";
import { useCases } from "@/lib/usecases";

export const metadata = pageMeta({
  title: "FAQ — AI GEO, citations, and how Optimizer360.ai works",
  description:
    "Answers to common questions about AI GEO, Generative Engine Optimisation, citations, engines, pricing, and how an Optimizer360.ai engagement starts.",
  path: "/faq",
});

const faqSchema = buildFAQSchema([...MARKETING_FAQ]);

export default function FaqPage() {
  return (
    <SubPageShell
      kicker="FAQ"
      title="Questions we actually get asked."
      intro="These answers match the homepage FAQ. For definitions, see the AI GEO briefing. For industry-specific questions, see use cases."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "FAQ" },
      ]}
    >
      <JsonLd id="faq-page" data={faqSchema} />
      <div className="space-y-4">
        {MARKETING_FAQ.map((item) => (
          <details
            key={item.question}
            className="mk-card group p-6 open:border-[var(--ink-line-strong)]"
          >
            <summary className="cursor-pointer list-none font-medium text-[var(--paper)]">
              {item.question}
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
              {item.answer}
            </p>
          </details>
        ))}
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <article className="mk-card p-8">
          <h2 className="font-serif-display text-xl text-[var(--paper)]">Glossary</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
            Definitions of AI GEO, GEO, AEO, and AI citations.
          </p>
          <Link href="/ai-seo#glossary" className="mk-btn mk-btn-ghost mt-6">
            Open the glossary
          </Link>
        </article>
        <article className="mk-card p-8">
          <h2 className="font-serif-display text-xl text-[var(--paper)]">Vertical FAQs</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {useCases.slice(0, 6).map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/usecases/${item.slug}`}
                  className="text-[var(--mint)] hover:underline"
                >
                  {item.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </SubPageShell>
  );
}
