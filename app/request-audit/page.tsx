import { MarketingPage } from "@/components/marketing/MarketingPage";
import { AuditRequestForm } from "@/components/marketing/AuditRequestForm";
import { Reveal } from "@/components/marketing/Reveal";
import { pageMeta } from "@/lib/page-metadata";
import { CAL_LINK } from "@/lib/site";

export const metadata = pageMeta({
  title: "Request an Audit",
  description:
    "See exactly how AI represents your brand today. A confidential, no-obligation GEO audit across ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude. We never fabricate data — every finding is yours to verify.",
  path: "/request-audit",
});

const auditPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Request a GEO Audit",
  url: "https://optimizer360.ai/request-audit",
  description:
    "Request a confidential AI GEO (Generative Engine Optimisation) audit from Optimizer360.ai across ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude.",
};

const ASSURANCES = [
  "We run your brand across all seven engines and record what the AI actually says.",
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
    <MarketingPage>
      <main>
        <section className="pb-24 pt-40 sm:pt-44 lg:pt-48">
          <div className="mk-wrap grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <div className="mk-settle">
                <h1 className="font-serif-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[1.02] text-[var(--paper)]">
                  See exactly how AI represents your brand today.
                </h1>
              </div>
              <div className="mk-settle" style={{ animationDelay: "200ms" }}>
                <p className="mk-body mt-7">
                  A confidential, no-obligation audit across all seven AI
                  engines. We never fabricate data — every finding is yours to
                  verify.
                </p>
              </div>
              <div className="mk-settle" style={{ animationDelay: "280ms" }}>
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
              </div>
              <div className="mk-settle" style={{ animationDelay: "340ms" }}>
                <p className="mt-10 rounded-lg bg-[var(--ink-900)] p-4 text-sm leading-relaxed text-[var(--paper-soft)]">
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
              </div>
            </div>

            <div className="mk-settle" style={{ animationDelay: "240ms" }}>
              <div className="rounded-xl border border-[var(--ink-line)] bg-[var(--ink-850)] p-8 md:p-10">
                <AuditRequestForm />
              </div>
            </div>
          </div>
        </section>

        <section className="mk-section mk-hairline" aria-labelledby="what-happens-next-heading">
          <div className="mk-wrap">
            <Reveal>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(auditPageSchema) }}
      />
    </MarketingPage>
  );
}
