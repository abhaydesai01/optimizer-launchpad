import type { Metadata } from "next";
import Link from "next/link";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { CardGlow } from "@/components/marketing/CardGlow";
import { AnswerBeams } from "@/components/marketing/AnswerMark";
import { Reveal } from "@/components/marketing/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Optimizer360.ai is a specialist AI SEO (Generative Engine Optimisation) firm built by Stack Intel. We believe AI is the new front door to every brand — and we operate on radical honesty: no fabricated data, no hollow guarantees.",
  alternates: {
    canonical: "https://optimizer360.ai/about",
  },
  openGraph: {
    title: "About Optimizer360.ai",
    description:
      "A specialist GEO firm built by Stack Intel. Radical honesty as an operating constraint: no fabricated data, no hollow guarantees, everything verifiable.",
    url: "https://optimizer360.ai/about",
    type: "website",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Optimizer360.ai",
  url: "https://optimizer360.ai/about",
  description:
    "Optimizer360.ai is a specialist AI SEO (Generative Engine Optimisation) firm built by Stack Intel, operating on radical honesty.",
  mainEntity: {
    "@type": "Organization",
    name: "Optimizer360.ai",
    url: "https://optimizer360.ai",
    parentOrganization: { "@type": "Organization", name: "Stack Intel" },
  },
};

export default function AboutPage() {
  return (
    <div className="theme-ink min-h-screen">
      <MarketingNav />
      <CardGlow />
      <main>
        <section className="relative overflow-hidden pb-20 pt-52 md:pt-60">
          <AnswerBeams className="absolute inset-0" />
          <div className="mk-wrap relative">
            <Reveal>
              <p className="mk-kicker">About Optimizer360.ai</p>
              <h1 className="mk-h1 mt-6 max-w-3xl text-[var(--paper)]">
                AI is the new front door to every brand. We keep yours open.
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mk-body mt-7 max-w-2xl">
                Optimizer360.ai is a specialist AI SEO firm — Generative Engine
                Optimisation, built by Stack Intel. We exist for one reason:
                when your customers ask AI who to trust, the answer should
                include you — accurately, credibly, and on the strength of
                evidence the engines can verify.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mk-section mk-hairline" aria-labelledby="belief-heading">
          <div className="mk-wrap grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
            <Reveal>
              <h2 id="belief-heading" className="mk-h2 text-[var(--paper)]">
                What we believe
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-6">
                <p className="mk-body">
                  Buying behaviour has crossed a line it will not cross back.
                  When someone considers a hospital, a bank, a home or a school,
                  their first question increasingly goes to an AI engine — and
                  the engine answers with a handful of names. That answer is
                  becoming the consideration set.
                </p>
                <p className="mk-body">
                  We believe brands with real credentials deserve to be in that
                  answer, and that getting there is a discipline: structuring
                  credibility, content and evidence so the engines can read,
                  trust and cite it. That discipline is Generative Engine
                  Optimisation, and it is all we do.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mk-section mk-hairline bg-[var(--ink-900)]" aria-labelledby="honesty-heading">
          <div className="mk-wrap">
            <Reveal>
              <p className="mk-kicker">Our operating principle</p>
              <h2 id="honesty-heading" className="mk-h2 mt-5 max-w-2xl text-[var(--paper)]">
                Radical honesty, expanded.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <Reveal className="h-full">
                <article className="mk-card h-full p-8">
                  <h3 className="font-serif-display text-lg text-[var(--paper)]">
                    We never fabricate
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
                    No invented search volumes. No fake case studies. No
                    numbers we cannot show you the source of. A young market
                    invites exaggeration; we decided early that our reporting
                    would survive any audit — including yours.
                  </p>
                </article>
              </Reveal>
              <Reveal delay={90} className="h-full">
                <article className="mk-card h-full p-8">
                  <h3 className="font-serif-display text-lg text-[var(--paper)]">
                    We never over-promise
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
                    We do not guarantee a specific citation, because nobody
                    honestly can — the engines decide. What we commit to is the
                    work that earns citations, and to showing you its effect
                    week by week.
                  </p>
                </article>
              </Reveal>
              <Reveal delay={180} className="h-full">
                <article className="mk-card h-full p-8">
                  <h3 className="font-serif-display text-lg text-[var(--paper)]">
                    Everything is verifiable
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
                    Every finding we report, you can reproduce yourself in any
                    AI engine. Open ChatGPT, ask the question, read the answer.
                    If our dashboard says something changed, you can watch it
                    with your own eyes.
                  </p>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="mk-section mk-hairline" aria-labelledby="how-we-work-heading">
          <div className="mk-wrap grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
            <Reveal>
              <h2 id="how-we-work-heading" className="mk-h2 text-[var(--paper)]">
                How the team works
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-6">
                <p className="mk-body">
                  Every engagement is served by an assigned team of three: a
                  GEO strategist who owns the diagnosis and the plan, a content
                  writer who builds the gap-targeted material you approve
                  before publication, and a technical developer who handles
                  schema, entity structuring and AI-readability.
                </p>
                <p className="mk-body">
                  The same three people stay with your account. They run the
                  weekly tracking, write the monthly report, and sit in the
                  quarterly review. When you ask why a number moved, the person
                  who did the work answers.
                </p>
                <p className="mk-body">
                  We work on our own GEO intelligence platform — built
                  in-house, not white-labelled — which is also why we can stand
                  behind every figure it produces.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mk-section mk-hairline bg-[var(--ink-900)]" aria-labelledby="organic-heading">
          <div className="mk-wrap">
            <Reveal>
              <div className="mx-auto max-w-3xl border border-[var(--ink-line-strong)] bg-[var(--ink-850)] p-8 text-center md:p-12">
                <h2 id="organic-heading" className="font-serif-display text-2xl text-[var(--paper)]">
                  GEO is an organic discipline.
                </h2>
                <p className="mk-body mt-5">
                  There are no ads to buy and no placements to purchase inside
                  AI answers. Citations are earned through credibility,
                  structure and evidence — which is why no honest firm sells
                  guarantees, and why we don&apos;t.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mk-section mk-hairline">
          <div className="mk-wrap text-center">
            <Reveal>
              <h2 className="mk-h2 mx-auto max-w-2xl text-[var(--paper)]">
                Start with the honest picture.
              </h2>
              <p className="mk-body mx-auto mt-6 max-w-xl">
                A confidential audit of how AI answers about your brand today,
                across all five engines.
              </p>
              <div className="mt-9">
                <Link href="/request-audit" className="mk-btn mk-btn-primary">
                  Request an Audit
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <MarketingFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
    </div>
  );
}
