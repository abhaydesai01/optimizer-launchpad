import Link from "next/link";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { CardGlow } from "@/components/marketing/CardGlow";

export default function NotFound() {
  return (
    <div className="theme-ink min-h-screen">
      <MarketingNav />
      <CardGlow />
      <main className="grid min-h-[70vh] place-items-center px-4 pb-24 pt-52 md:pt-60">
        <div className="text-center">
          <p className="mk-kicker">404</p>
          <h1 className="mk-h2 mt-5 text-[var(--paper)]">
            This page isn&apos;t in the answer.
          </h1>
          <p className="mk-body mx-auto mt-5 max-w-md">
            The page you&apos;re looking for doesn&apos;t exist or has moved.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className="mk-btn mk-btn-primary">
              Back to the homepage
            </Link>
            <Link href="/request-audit" className="mk-btn mk-btn-ghost">
              Request an Audit
            </Link>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
