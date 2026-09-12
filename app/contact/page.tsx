import Link from "next/link";
import { JsonLd } from "@/components/marketing/JsonLd";
import { SubPageShell } from "@/components/marketing/SubPageShell";
import { pageMeta } from "@/lib/page-metadata";
import { buildContactPageSchema } from "@/lib/schema-library";
import { CAL_LINK, CONTACT_EMAIL } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Talk to Optimizer360.ai — book a 20-minute call, request an AI visibility audit, or email us directly.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SubPageShell
      kicker="Contact"
      title="Talk to a person, not a pipeline."
      intro="Whether you want the audit first or a conversation first, both routes reach the same team."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Contact" },
      ]}
    >
      <JsonLd
        id="contact-page"
        data={buildContactPageSchema({
          name: "Contact Optimizer360.ai",
          url: "https://optimizer360.ai/contact",
          description:
            "Book a 20-minute call, request an AI visibility audit, or email Optimizer360.ai.",
        })}
      />
      <div className="grid gap-6 md:grid-cols-3">
        <article className="mk-card p-8">
          <h2 className="font-serif-display text-xl text-[var(--paper)]">
            Book a 20-minute call
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
            A focused conversation about how AI currently represents your brand
            and whether AI GEO is worth your attention. No deck, no pressure.
          </p>
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noreferrer"
            className="mk-btn mk-btn-primary mt-6"
          >
            Book a call
          </a>
        </article>

        <article className="mk-card p-8">
          <h2 className="font-serif-display text-xl text-[var(--paper)]">
            Request an audit
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
            We run your brand across all five AI engines and send you the
            honest picture. Confidential and no-obligation.
          </p>
          <Link href="/request-audit" className="mk-btn mk-btn-ghost mt-6">
            Request an Audit
          </Link>
        </article>

        <article className="mk-card p-8">
          <h2 className="font-serif-display text-xl text-[var(--paper)]">
            Email us
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--paper-muted)]">
            For partnerships, press, or anything else — we read everything and
            respond within two business days.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-6 inline-block text-[15px] font-medium text-[var(--mint)] underline decoration-[var(--ink-line-strong)] underline-offset-4 hover:decoration-[var(--mint)]"
          >
            {CONTACT_EMAIL}
          </a>
        </article>
      </div>
    </SubPageShell>
  );
}
