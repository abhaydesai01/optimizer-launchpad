import Link from "next/link";
import { AnswerGlyph } from "@/components/marketing/AnswerMark";
import { MARKETING_FOOTER } from "@/lib/marketing-routes";
import { FACEBOOK_URL, GOOGLE_BUSINESS_URL, INSTAGRAM_URL, LINKEDIN_URL } from "@/lib/site";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "Instagram", href: INSTAGRAM_URL },
  { label: "Facebook", href: FACEBOOK_URL },
  { label: "Google Business Profile", href: GOOGLE_BUSINESS_URL },
];

export function MarketingFooter() {
  return (
    <footer className="mk-hairline bg-[var(--ink-950)]">
      <div className="mk-wrap grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2.5">
            <AnswerGlyph className="h-6 w-6 text-[var(--paper-soft)]" />
            <span className="font-serif-display text-xl text-[var(--paper)]">
              Optimizer360<span className="text-[var(--mint)]">.ai</span>
            </span>
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--paper-muted)]">
            AI GEO for enterprise brands — Generative Engine Optimisation that
            makes your brand the answer AI gives, across ChatGPT, Perplexity,
            Google AI Overviews, Gemini and Claude.
          </p>
        </div>

        <nav aria-label="Product links" className="text-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--paper-muted)]">
            Product
          </p>
          <ul className="space-y-3">
            {MARKETING_FOOTER.product.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[var(--paper-soft)] transition-colors hover:text-[var(--paper)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company links" className="text-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--paper-muted)]">
            Company
          </p>
          <ul className="space-y-3">
            {MARKETING_FOOTER.company.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[var(--paper-soft)] transition-colors hover:text-[var(--paper)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--paper-muted)]">
            Contact
          </p>
          <a
            href="mailto:hello@optimizer360.ai"
            className="text-[var(--paper-soft)] transition-colors hover:text-[var(--mint)]"
          >
            hello@optimizer360.ai
          </a>
          <ul className="mt-6 space-y-3">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--paper-soft)] transition-colors hover:text-[var(--mint)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-3">
            {MARKETING_FOOTER.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[var(--paper-soft)] transition-colors hover:text-[var(--paper)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-l-2 border-[var(--mint)] pl-3 text-[var(--paper-muted)]">
            Ad-free. We never fabricate data.
          </p>
        </div>
      </div>

      <div className="mk-hairline">
        <div className="mk-wrap py-6 text-xs text-[var(--paper-muted)]">
          <p>
            © {new Date().getFullYear()} Optimizer360.ai · Mumbai, India
          </p>
        </div>
      </div>
    </footer>
  );
}
