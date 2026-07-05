import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { CardGlow } from "@/components/marketing/CardGlow";
import { AuditRequestForm } from "@/components/marketing/AuditRequestForm";
import { AnswerBeams } from "@/components/marketing/AnswerMark";
import { Reveal } from "@/components/marketing/Reveal";
import { CAL_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request an Audit",
  description:
    "See exactly how AI represents your brand today. A confidential, no-obligation GEO audit across ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude. We never fabricate data — every finding is yours to verify.",
  alternates: {
    canonical: "https://optimizer360.ai/request-audit",
  },
  openGraph: {
    title: "Request an AI Visibility Audit | Optimizer360.ai",
    description:
      "A confidential, no-obligation audit of how AI answers about your brand — across all five major engines.",
    url: "https://optimizer360.ai/request-audit",
    type: "website",
  },
};

const auditPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Request a GEO Audit",
  url: "https://optimizer360.ai/request-audit",
  description:
    "Request a confidential AI SEO (Generative Engine Optimisation) audit from Optimizer360.ai across ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude.",
};

const ASSURANCES = [
  "We run your brand across all five engines and record what the AI actually says.",
  "You see where you're named, where you're missed, and where competitors are cited instead.",
  "Every finding is reproducible — open any engine and verify it yourself.",
];

const NEXT_STEPS = [
  {
    step: "Within 48 hours",
    detail: "Your audit lands in your inbox: engine-by-engine findings, the questions where you're absent, and where competitors are cited.",
  },
  {
    step: "A 20-minute walkthrough",
    detail: "A GEO strategist — the person who ran your scan — walks you through the findings and answers questions. No pitch deck.",
  },
  {
    step: "Your call entirely",
    detail: "If you want to close the gaps, we scope an engagement and quote it. If not, the audit is yours to keep and verify.",
  },
];

export default function RequestAuditPage() {
  return (
    <div className="theme-ink min-h-screen">
      <MarketingNav />
      <CardGlow />
      <main>
        <section className="relative overflow-hidden pb-24 pt-52 md:pt-60">
          <AnswerBeams className="absolute inset-0" />
          <div className="mk-wrap relative grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="mk-kicker">Request an audit</p>
                <h1 className="mk-h1 mt-6 text-[var(--paper)]">
                  See exactly how AI represents your brand today.
                </h1>
              </Reveal>
              <Reveal delay={120}>
                <p className="mk-body mt-7">
                  A confidential, no-obligation audit across all five AI
                  engines. We never fabricate data — every finding is yours to
                  verify.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <ul className="mt-10 space-y-5">
                  {ASSURANCES.map((assurance) => (
                    <li
                      key={assurance}
                      className="flex gap-4 text-[15px] leading-relaxed text-[var(--paper-soft)]"
                    >
                      <span
                        className="mt-2.5 h-px w-6 shrink-0 bg-[var(--mint)]"
                        aria-hidden="true"
                      />
                      {assurance}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={260}>
                <p className="mt-10 border-l-2 border-[var(--amber)] pl-4 text-sm leading-relaxed text-[var(--paper-muted)]">
                  Your information is used only to prepare your audit — never
                  shared, never used for anything else. A mutual NDA is
                  available on request.
                </p>
                <p className="mt-6 text-sm text-[var(--paper-soft)]">
                  Prefer to talk first?{" "}
                  <a
                    href={CAL_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-[var(--mint)] underline decoration-[var(--ink-line-strong)] underline-offset-4 hover:decoration-[var(--mint)]"
                  >
                    Book a 20-minute call
                  </a>{" "}
                  with a GEO strategist.
                </p>
              </Reveal>
            </div>

            <Reveal delay={160}>
              <div className="border border-[var(--ink-line)] bg-[rgba(13,21,38,0.6)] p-8 md:p-10">
                <AuditRequestForm />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mk-section mk-hairline" aria-labelledby="what-happens-next-heading">
          <div className="mk-wrap">
            <Reveal>
              <p className="mk-kicker">What happens next</p>
              <h2 id="what-happens-next-heading" className="mk-h2 mt-5 max-w-2xl text-[var(--paper)]">
                No black box. Here&apos;s exactly what follows.
              </h2>
            </Reveal>
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {NEXT_STEPS.map((item, index) => (
                <Reveal key={item.step} delay={index * 90} className="h-full">
                  <li className="mk-card h-full p-8">
                    <span className="mk-num" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 font-serif-display text-lg text-[var(--paper)]">
                      {item.step}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
                      {item.detail}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <MarketingFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(auditPageSchema) }}
      />
    </div>
  );
}
