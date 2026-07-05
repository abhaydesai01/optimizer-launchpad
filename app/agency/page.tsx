import type { Metadata } from "next";
import Link from "next/link";
import { SubPageShell } from "@/components/marketing/SubPageShell";
import { buildFAQSchema, buildProductSchema } from "@/lib/schema-library";
import { CAL_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "For Agencies — White-Label AI SEO Platform",
  description:
    "Launch a GEO service line under your brand. White-label AI visibility dashboards, audit engine, prompt intelligence and multi-client management across ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude.",
  alternates: { canonical: "https://optimizer360.ai/agency" },
  openGraph: {
    title: "For Agencies | Optimizer360.ai",
    description:
      "White-label GEO intelligence platform for agencies — audit engine, live citation dashboard, prompt intelligence and automated reporting.",
    url: "https://optimizer360.ai/agency",
    type: "website",
    images: ["https://optimizer360.ai/og-image.png"],
  },
};

const agencyProductSchema = buildProductSchema({
  name: "Optimizer360.ai Agency Platform",
  description:
    "White-label GEO intelligence platform for agencies: audit engine, live citation dashboard, prompt intelligence, source mapping, and automated reporting.",
  brandName: "Optimizer360.ai",
  url: "https://optimizer360.ai/agency",
});

const agencyFaqSchema = buildFAQSchema([
  {
    question: "Will our clients see Optimizer360.ai branding?",
    answer:
      "No. The platform is deployable under your agency branding so your relationship and reporting stay fully client-facing.",
  },
  {
    question: "Do we need in-house GEO experts to start?",
    answer:
      "No. The platform provides the intelligence layer and workflow. Your team executes content, technical updates and PR using those insights.",
  },
  {
    question: "Can we run this for multiple clients from one account?",
    answer:
      "Yes. Agency partners get multi-client management with prompt configuration, reporting and visibility tracking in one workspace.",
  },
]);

const MODULES = [
  "GEO audit engine with baseline report in 3 business days",
  "Live citation dashboard by prompt and by AI engine",
  "Prompt intelligence mapped to funnel stages and intent",
  "Competitor citation mapping with source URL visibility",
  "Source intelligence for PR and distribution targets",
  "Automated weekly and monthly client reporting",
  "White-label client dashboard under your agency brand",
  "Multi-client management from one agency workspace",
];

const STATS = [
  { value: "5", label: "AI engines tracked in one platform" },
  { value: "3 days", label: "for baseline GEO audit delivery" },
  { value: "White-label", label: "dashboard and report exports included" },
];

export default function AgencyPage() {
  return (
    <SubPageShell
      kicker="For agencies"
      title="The AI SEO platform built for agency partners."
      intro="Launch a high-margin GEO practice under your brand. Track AI citations across five engines, run auditable delivery, and present measurable client outcomes every month."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="mk-card p-6 text-center">
            <p className="font-serif-display text-3xl text-[var(--mint)]">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-[var(--paper-muted)]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <a href={CAL_LINK} target="_blank" rel="noreferrer" className="mk-btn mk-btn-primary">
          Book a partner consultation
        </a>
        <a href="mailto:hello@optimizer360.ai" className="mk-btn mk-btn-ghost">
          Email partnership team
        </a>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <article className="mk-card p-8">
          <h2 className="font-serif-display text-xl text-[var(--paper)]">
            Why this matters now
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
            Agencies are already getting the same client question: why are
            competitors cited on ChatGPT and Perplexity while we are missing?
            Teams that can answer with a real GEO deliverable will win the next
            generation of retainers.
          </p>
        </article>
        <article className="mk-card p-8">
          <h2 className="font-serif-display text-xl text-[var(--paper)]">
            What Optimizer360.ai provides
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
            A GEO intelligence platform for agencies — tracking, audit, prompt
            intelligence, source mapping and reporting. Your team owns client
            strategy, execution and delivery.
          </p>
        </article>
      </div>

      <article className="mk-card mt-10 p-8 md:p-10">
        <h2 className="font-serif-display text-2xl text-[var(--paper)]">
          Core platform modules
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {MODULES.map((item) => (
            <li
              key={item}
              className="flex gap-3 border border-[var(--ink-line)] px-4 py-3 text-sm text-[var(--paper-soft)]"
            >
              <span className="mt-2 h-px w-4 shrink-0 bg-[var(--mint)]" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </article>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="mk-card border-[var(--mint)] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--mint)]">
            Platform does
          </p>
          <ul className="mt-4 space-y-2 text-[15px] text-[var(--paper-soft)]">
            <li>Audit and citation intelligence</li>
            <li>Live dashboard and reporting</li>
            <li>Prompt and competitor insights</li>
            <li>Source-level opportunity mapping</li>
          </ul>
        </article>
        <article className="mk-card p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--amber)]">
            Your agency does
          </p>
          <ul className="mt-4 space-y-2 text-[15px] text-[var(--paper-soft)]">
            <li>Content writing and publishing</li>
            <li>Schema and technical implementation</li>
            <li>PR pitching and editorial outreach</li>
            <li>Entity registration and profile completion</li>
          </ul>
        </article>
      </div>

      <div className="mt-14 border border-[var(--ink-line-strong)] bg-[var(--ink-900)] p-8 text-center md:p-10">
        <h2 className="font-serif-display text-2xl text-[var(--paper)]">
          See the platform on a real category.
        </h2>
        <p className="mk-body mx-auto mt-4 max-w-xl">
          We run a live demo using real prompts on ChatGPT and Perplexity so your
          team can see the citation gap before committing.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <a href={CAL_LINK} target="_blank" rel="noreferrer" className="mk-btn mk-btn-primary">
            Book a partner demo
          </a>
          <Link href="/compare" className="mk-btn mk-btn-ghost">
            How we compare to trackers
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agencyProductSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agencyFaqSchema) }}
      />
    </SubPageShell>
  );
}
