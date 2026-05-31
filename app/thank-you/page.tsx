import Link from "next/link";

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
  const calLink =
    process.env.NEXT_PUBLIC_CAL_LINK ||
    "https://cal.com/abhay-desai/free-geo-strategy-call-optimizer360";

  return (
    <section className="grid min-h-screen place-items-center px-4">
      <div className="surface-card w-full max-w-2xl p-8 text-center md:p-12">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-[#00E5A040]">
          <span className="text-2xl text-[var(--accent-green)]">✓</span>
        </div>
        {type === "audit" ? (
          <>
            <h1 className="display text-4xl font-bold">
              You're all set, {name}.
            </h1>
            <p className="mt-4 text-[var(--text-muted)]">
              Your free GEO audit for {brand} is being prepared. We'll email you
              at {email} within 48 hours with your full AI citation report.
            </p>
            <a
              href={calLink}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-block rounded-lg bg-[var(--accent-green)] px-6 py-3 font-semibold text-[#0A0A0F]"
            >
              Book a Strategy Call
            </a>
            <div className="mt-4">
              <Link href="/" className="text-sm text-[var(--text-muted)]">
                ← Back to Optimizer360
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="display text-4xl font-bold">Message received.</h1>
            <p className="mt-4 text-[var(--text-muted)]">
              We'll get back to you within 24 hours. In the meantime, want to
              see where your brand currently stands on AI engines?
            </p>
            <Link
              href="/?audit=true"
              className="mt-7 inline-block rounded-lg bg-[var(--accent-green)] px-6 py-3 font-semibold text-[#0A0A0F]"
            >
              Get Your Free GEO Audit
            </Link>
            <div className="mt-4">
              <Link href="/" className="text-sm text-[var(--text-muted)]">
                ← Back to Optimizer360
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
