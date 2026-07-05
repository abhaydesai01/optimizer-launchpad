"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnswerGlyph } from "@/components/marketing/AnswerMark";
import { MARKETING_NAV, MARKETING_NAV_MOBILE_EXTRAS } from "@/lib/marketing-routes";

export function MarketingNav() {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(href: string) {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-[var(--ink-line)] bg-[rgba(6,10,20,0.88)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Link
        href="/request-audit"
        className="block bg-[var(--mint-dim)] py-2 text-center text-xs font-medium tracking-wide text-[var(--mint)] transition-colors hover:bg-[rgba(60,232,180,0.16)]"
      >
        The founding-client window is open — your category&apos;s AI answer is
        still up for grabs. Request an audit →
      </Link>
      <div className="mk-wrap flex h-[72px] items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[var(--paper)]"
          aria-label="Optimizer360.ai — home"
        >
          <AnswerGlyph className="h-6 w-6 text-[var(--paper-soft)]" />
          <span className="font-serif-display text-xl tracking-tight">
            Optimizer360<span className="text-[var(--mint)]">.ai</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary navigation"
        >
          {MARKETING_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                isActive(link.href)
                  ? "font-medium text-[var(--paper)]"
                  : "text-[var(--paper-soft)] hover:text-[var(--paper)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/request-audit" className="mk-btn mk-btn-primary !px-5 !py-2.5">
            Request an Audit
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-sm border border-[var(--ink-line-strong)] p-2 text-[var(--paper)] lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <nav
          className="border-t border-[var(--ink-line)] bg-[rgba(6,10,20,0.97)] lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mk-wrap flex flex-col gap-1 py-4">
            {MARKETING_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-sm px-2 py-3 text-[15px] transition-colors ${
                  isActive(link.href)
                    ? "font-medium text-[var(--mint)]"
                    : "text-[var(--paper-soft)] hover:text-[var(--paper)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {MARKETING_NAV_MOBILE_EXTRAS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-sm px-2 py-3 text-[15px] transition-colors ${
                  isActive(link.href)
                    ? "font-medium text-[var(--mint)]"
                    : "text-[var(--paper-soft)] hover:text-[var(--paper)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/request-audit"
              onClick={() => setOpen(false)}
              className="mk-btn mk-btn-primary mt-3"
            >
              Request an Audit
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
