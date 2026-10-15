import Link from "next/link";
import { SubPageShell } from "@/components/marketing/SubPageShell";
import { pageMeta } from "@/lib/page-metadata";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata = pageMeta({
  title: "Pricing — get a quote",
  description:
    "Optimizer360.ai engagements are scoped and quoted individually. Request an audit or contact us and we will scope the work with you.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <SubPageShell
      kicker="Pricing"
      title="Every engagement is quoted individually."
      intro="We do not publish price tiers, because the work genuinely differs by brand. Tell us about your brand and we will scope it with you."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Pricing" },
      ]}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <article className="mk-card p-8">
          <h2 className="font-serif-display text-xl text-[var(--paper)]">How a quote is set</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
            Your quote is based on your category, your competitive position and the size of the
            gap the audit reveals.
          </p>
        </article>
        <article className="mk-card p-8">
          <h2 className="font-serif-display text-xl text-[var(--paper)]">The audit comes first</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
            Every engagement starts with a baseline audit across the AI engines. The quote follows
            it, so you know exactly what you are buying and why before any commitment.
          </p>
        </article>
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-4">
        <Link href="/request-audit" className="mk-btn mk-btn-primary">
          Request a quote
        </Link>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-[15px] text-[var(--paper-soft)] transition-colors hover:text-[var(--mint)]"
        >
          or email {CONTACT_EMAIL}
        </a>
      </div>
    </SubPageShell>
  );
}
