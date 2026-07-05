import type { Metadata } from "next";
import Link from "next/link";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { CardGlow } from "@/components/marketing/CardGlow";
import { AnswerBeams } from "@/components/marketing/AnswerMark";
import { Reveal } from "@/components/marketing/Reveal";
import { CAL_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "What is AI SEO? The Executive Briefing on GEO",
  description:
    "AI SEO — Generative Engine Optimisation (GEO) — explained for decision-makers: why AI answers replaced the search results page, how engines choose which brands to cite, and what earning the answer actually involves.",
  alternates: { canonical: "https://optimizer360.ai/ai-seo" },
  openGraph: {
    title: "What is AI SEO? The Executive Briefing on GEO | Optimizer360.ai",
    description:
      "Why AI answers replaced the search results page, how engines choose which brands to cite, and what earning the answer involves.",
    url: "https://optimizer360.ai/ai-seo",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What is AI SEO? The Executive Briefing on Generative Engine Optimisation",
  description:
    "AI SEO (GEO) explained for enterprise decision-makers: why AI answers replaced the search results page, how AI engines choose which brands to cite, and what earning the answer involves.",
  author: { "@type": "Organization", name: "Optimizer360.ai", url: "https://optimizer360.ai" },
  publisher: { "@type": "Organization", name: "Optimizer360.ai" },
  mainEntityOfPage: "https://optimizer360.ai/ai-seo",
  about: [
    { "@type": "Thing", name: "AI SEO" },
    { "@type": "Thing", name: "Generative Engine Optimisation" },
    { "@type": "Thing", name: "Answer Engine Optimisation" },
  ],
};

const definedTermSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "AI SEO Glossary",
  hasDefinedTerm: [
    {
      "@type": "DefinedTerm",
      name: "AI SEO",
      description:
        "The practice of structuring a brand's credibility, content and evidence so AI engines can read, trust and cite it in their answers. The plain-language name for Generative Engine Optimisation.",
    },
    {
      "@type": "DefinedTerm",
      name: "Generative Engine Optimisation (GEO)",
      description:
        "The formal name for AI SEO: optimising for the synthesised answers of generative AI engines such as ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude.",
    },
    {
      "@type": "DefinedTerm",
      name: "Answer Engine Optimisation (AEO)",
      description:
        "A closely related term emphasising optimisation for engines that return direct answers rather than lists of links.",
    },
    {
      "@type": "DefinedTerm",
      name: "AI citation",
      description:
        "When an AI engine names or references a brand or source in its answer. Citations are earned through trust, structure and evidence; they cannot be bought.",
    },
  ],
};

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="mk-h3 scroll-mt-28 text-[var(--paper)]">
      {children}
    </h2>
  );
}

export default function AiSeoGuidePage() {
  return (
    <div className="theme-ink min-h-screen">
      <MarketingNav />
      <CardGlow />
      <main>
        <section className="relative overflow-hidden pb-16 pt-52 md:pt-60">
          <AnswerBeams className="absolute inset-0" />
          <div className="mk-wrap relative">
            <Reveal>
              <p className="mk-kicker">The executive briefing</p>
              <h1 className="mk-h1 mt-6 max-w-3xl text-[var(--paper)]">
                What is AI SEO?
              </h1>
              <p className="mk-body mt-7 max-w-2xl">
                A plain-language briefing on Generative Engine Optimisation —
                written for the decision-maker who has to explain it to a
                board, not for other marketers. Share it freely.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mk-hairline pb-24 pt-16">
          <div className="mk-wrap grid gap-16 lg:grid-cols-[220px_1fr]">
            <nav aria-label="On this page" className="hidden lg:block">
              <div className="sticky top-28">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--paper-muted)]">
                  On this page
                </p>
                <ul className="mt-4 space-y-3 text-sm">
                  {[
                    ["#the-shift", "The shift"],
                    ["#definition", "The definition"],
                    ["#how-engines-choose", "How engines choose"],
                    ["#not-traditional-seo", "Why SEO isn't enough"],
                    ["#what-the-work-is", "What the work involves"],
                    ["#glossary", "Glossary"],
                    ["#faq-pointer", "Next steps"],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <a
                        href={href}
                        className="text-[var(--paper-muted)] transition-colors hover:text-[var(--mint)]"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <article className="max-w-3xl space-y-14">
              <div className="space-y-5">
                <SectionHeading id="the-shift">
                  The shift: from searching to asking
                </SectionHeading>
                <p className="mk-body">
                  For twenty years, a buyer&apos;s first move was a search — and
                  the result was a page of links where ten brands got a chance
                  at the click. That behaviour is being replaced. Buyers now
                  ask AI engines a question in plain language — &ldquo;which
                  hospital should I trust for cardiac surgery?&rdquo;,
                  &ldquo;which private bank is best for wealth
                  management?&rdquo; — and the engine returns one synthesised
                  answer naming a small number of brands.
                </p>
                <p className="mk-body">
                  There is no page two of an AI answer. If your brand
                  isn&apos;t in it, you were never considered — and because the
                  conversation happened inside ChatGPT or Gemini rather than on
                  your website, nothing appears in your analytics. The loss is
                  real and invisible at the same time.
                </p>
              </div>

              <div className="space-y-5">
                <SectionHeading id="definition">
                  The definition
                </SectionHeading>
                <div className="border-l-2 border-[var(--mint)] bg-[var(--ink-900)] p-6">
                  <p className="font-serif-display text-lg leading-relaxed text-[var(--paper)]">
                    AI SEO — formally, Generative Engine Optimisation (GEO) —
                    is the discipline of structuring a brand&apos;s
                    credibility, content and evidence so AI engines can read,
                    trust and cite it in their answers.
                  </p>
                </div>
                <p className="mk-body">
                  The five engines that matter today are ChatGPT, Perplexity,
                  Google AI Overviews, Gemini and Claude. Each composes answers
                  differently, but all of them decide what to cite the same
                  way: from sources they can parse and consider credible.
                </p>
              </div>

              <div className="space-y-5">
                <SectionHeading id="how-engines-choose">
                  How engines choose what to cite
                </SectionHeading>
                <p className="mk-body">
                  When an engine answers a trust question, it looks for three
                  things. First, <strong className="text-[var(--paper)]">machine-readable structure</strong> —
                  schema markup, clear entities, and pages organised so the
                  engine can extract facts without guessing. Second,{" "}
                  <strong className="text-[var(--paper)]">verifiable evidence</strong> —
                  credentials, certifications, third-party corroboration the
                  engine can cross-reference. Third,{" "}
                  <strong className="text-[var(--paper)]">answer-shaped content</strong> —
                  material that actually addresses the questions buyers ask,
                  rather than the keywords they used to type.
                </p>
                <p className="mk-body">
                  Notice what isn&apos;t on that list: ad spend. There is no
                  paid placement inside an AI answer. Citations are earned or
                  they are absent — which is why no honest firm guarantees
                  them.
                </p>
              </div>

              <div className="space-y-5">
                <SectionHeading id="not-traditional-seo">
                  Why strong SEO isn&apos;t enough
                </SectionHeading>
                <p className="mk-body">
                  A common assumption: &ldquo;we rank well on Google, so
                  we&apos;ll be fine in AI answers.&rdquo; It doesn&apos;t
                  transfer automatically. Traditional SEO optimises signals —
                  keywords, backlinks, page speed — that engines used to rank
                  links. Generative engines synthesise answers, and they weight
                  different things: whether your claims are structured enough
                  to extract, whether your credentials are verifiable, whether
                  third-party sources corroborate you. A brand can dominate
                  search results and be absent from AI answers in the same
                  category. The reverse is also true — which is the
                  opportunity.
                </p>
              </div>

              <div className="space-y-5">
                <SectionHeading id="what-the-work-is">
                  What the work actually involves
                </SectionHeading>
                <p className="mk-body">
                  A serious AI SEO engagement has four movements. A{" "}
                  <strong className="text-[var(--paper)]">baseline</strong>:
                  recording exactly how each engine answers about you today.
                  A <strong className="text-[var(--paper)]">diagnosis</strong>:
                  mapping the questions where you&apos;re absent, weak or
                  out-positioned. The{" "}
                  <strong className="text-[var(--paper)]">build</strong>:
                  gap-targeted content plus the technical and entity
                  structuring engines require. And{" "}
                  <strong className="text-[var(--paper)]">proof</strong>:
                  continuous tracking across all five engines, so every change —
                  or its absence — is visible. Anything sold without a baseline
                  and tracking is faith, not strategy.
                </p>
              </div>

              <div className="space-y-5">
                <SectionHeading id="glossary">Glossary</SectionHeading>
                <dl className="space-y-6">
                  <div>
                    <dt className="font-serif-display text-lg text-[var(--paper)]">AI SEO</dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-[var(--paper-muted)]">
                      The plain-language name for this discipline. Same thing as GEO.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-serif-display text-lg text-[var(--paper)]">
                      GEO — Generative Engine Optimisation
                    </dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-[var(--paper-muted)]">
                      The formal term: optimising for the synthesised answers of generative AI engines.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-serif-display text-lg text-[var(--paper)]">
                      AEO — Answer Engine Optimisation
                    </dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-[var(--paper-muted)]">
                      A closely related term emphasising engines that return direct answers rather than link lists.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-serif-display text-lg text-[var(--paper)]">AI citation</dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-[var(--paper-muted)]">
                      When an engine names or references your brand in an answer. Earned, never bought.
                    </dd>
                  </div>
                </dl>
              </div>

              <div id="faq-pointer" className="border border-[var(--ink-line-strong)] bg-[var(--ink-900)] p-8 md:p-10">
                <h2 className="font-serif-display text-2xl text-[var(--paper)]">
                  The logical next step
                </h2>
                <p className="mk-body mt-4">
                  Before deciding anything, see your baseline: how the five
                  engines answer about your brand today. It&apos;s
                  confidential, no-obligation, and every finding is yours to
                  verify.
                </p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link href="/request-audit" className="mk-btn mk-btn-primary">
                    Request an Audit
                  </Link>
                  <a
                    href={CAL_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="mk-btn mk-btn-ghost"
                  >
                    Book a 20-minute call
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <MarketingFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />
    </div>
  );
}
