import { MarketingPage } from "@/components/marketing/MarketingPage";
import Link from "next/link";

export default function NotFound() {
  return (
    <MarketingPage>
      <main className="grid min-h-[70vh] place-items-center px-4 pb-24 pt-40 sm:pt-44 lg:pt-48">
        <div className="text-center">
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
              Request an audit
            </Link>
          </div>
        </div>
      </main>
      </MarketingPage>
  );
}
