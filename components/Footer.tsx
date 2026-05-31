"use client";

import Link from "next/link";

type FooterProps = {
  onHowItWorks?: () => void;
};

export function Footer({ onHowItWorks }: FooterProps) {
  const calLink =
    process.env.NEXT_PUBLIC_CAL_LINK ||
    "https://cal.com/abhay-desai/free-geo-strategy-call-optimizer360";

  const linkClass =
    "block text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]";

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-surface)]">
      <div className="section-wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="display text-2xl font-bold">
            <span className="text-[var(--text-primary)]">Optimizer</span>
            <span className="text-[var(--accent-green)]">360</span>
          </p>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            AI-native revenue infrastructure.
          </p>
          <p className="text-sm text-[var(--text-muted)]">Built in India.</p>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
            Products
          </p>
          <div className="space-y-3">
            <Link href="/" className={linkClass}>
              GEO
            </Link>
            <Link href="/are" className={linkClass}>
              ARE (Autonomous Revenue Engine)
            </Link>
            <p className="text-sm text-[var(--text-faint)]">Coming Soon</p>
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
            Company
          </p>
          <div className="space-y-3">
            <Link href="/about" className={linkClass}>
              About
            </Link>
            <Link href="/usecases" className={linkClass}>
              Use Cases
            </Link>
            <Link href="/blog" className={linkClass}>
              Blog
            </Link>
            <Link href="/careers" className={linkClass}>
              Careers
            </Link>
            {onHowItWorks ? (
              <button onClick={onHowItWorks} className={`${linkClass} text-left`}>
                Contact
              </button>
            ) : (
              <Link href="/contact" className={linkClass}>
                Contact
              </Link>
            )}
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
            Connect
          </p>
          <div className="space-y-3">
            <a
              href="https://linkedin.com/company/optimizer360"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/optimizer360"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              Twitter/X
            </a>
            <a href="mailto:hello@optimizer360.ai" className={linkClass}>
              hello@optimizer360.ai
            </a>
            <a href={calLink} target="_blank" rel="noreferrer" className={linkClass}>
              Book a Call
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--border-color)] py-4 text-center text-xs text-[var(--text-muted)]">
        © 2026 Optimizer360. All rights reserved.
      </div>
    </footer>
  );
}
