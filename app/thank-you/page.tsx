import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { CardGlow } from "@/components/marketing/CardGlow";
import { CAL_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your request has been received.",
  robots: { index: false, follow: false },
};

type ThankYouProps = {
  searchParams: {
    type?: string;
    brand?: string;
    name?: string;
    email?: string;
  };
};

export default function ThankYouPage({ searchParams }: ThankYouProps) {
  const type = searchParams.type === "audit" ? "audit" : "contact";
  const brand = searchParams.brand || "your brand";
  const name = searchParams.name || "there";
  const email = searchParams.email || "your email";

  return (
    <div className="theme-ink min-h-screen">
      <MarketingNav />
      <CardGlow />
      <main className="grid min-h-[70vh] place-items-center px-4 pb-24 pt-52 md:pt-60">
        <div className="w-full max-w-2xl border border-[var(--ink-line-strong)] bg-[var(--ink-900)] p-10 text-center md:p-14">
          <CheckCircle2
            className="mx-auto h-10 w-10 text-[var(--mint)]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          {type === "audit" ? (
            <>
              <h1 className="mt-6 font-serif-display text-3xl text-[var(--paper)]">
                You&apos;re all set, {name}.
              </h1>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[var(--paper-muted)]">
                Your AI visibility audit for {brand} is being prepared.
                We&apos;ll email you at {email} within 48 hours with the honest
                picture across all five engines.
              </p>
            </>
          ) : (
            <>
              <h1 className="mt-6 font-serif-display text-3xl text-[var(--paper)]">
                Message received.
              </h1>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[var(--paper-muted)]">
                We&apos;ll get back to you within two business days. In the
                meantime, want to see where your brand stands in AI answers?
              </p>
            </>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noreferrer"
              className="mk-btn mk-btn-primary"
            >
              Book a 20-minute call
            </a>
            <Link
              href="/"
              className="text-sm text-[var(--paper-soft)] underline decoration-[var(--ink-line-strong)] underline-offset-4 hover:text-[var(--mint)]"
            >
              Back to the site
            </Link>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
