import { Reveal } from "@/components/Reveal";

type PricingProps = {
  onAudit: () => void;
};

const calLink =
  process.env.NEXT_PUBLIC_CAL_LINK ||
  "https://cal.com/abhay-desai/free-geo-strategy-call-optimizer360";

export function Pricing({ onAudit }: PricingProps) {
  return (
    <section id="pricing" className="section-pad border-y border-[var(--border-color)] bg-[var(--bg-surface)]">
      <Reveal className="section-wrap">
        <h2 className="display text-4xl font-bold md:text-5xl">
          Simple pricing. No agency retainer surprises.
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <article className="surface-card p-6 transition-colors hover:border-[#00E5A040]">
            <p className="text-sm text-[var(--text-muted)]">
              For founders & small teams
            </p>
            <h3 className="mt-3 text-2xl font-semibold">Starter</h3>
            <p className="mono mt-4 text-4xl">₹35,000 /month</p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Billed monthly. Cancel anytime.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-[var(--text-muted)]">
              <li>✓ Citation tracking across 3 AI engines</li>
              <li>✓ 2 articles/month written by our team</li>
              <li>✓ Basic FAQ + Organization schema</li>
              <li>✓ Monthly GEO audit report</li>
              <li>✓ Email support</li>
            </ul>
            <button
              onClick={onAudit}
              className="mt-6 w-full rounded-lg bg-[var(--accent-green)] px-4 py-3 font-semibold text-[#0A0A0F]"
            >
              Get Free Audit First
            </button>
          </article>

          <article className="rounded-xl border-2 border-[var(--accent-green)] bg-[var(--bg-card)] p-6 shadow-[0_0_40px_#00E5A015]">
            <p className="inline-flex rounded-full bg-[var(--accent-green)] px-3 py-1 text-xs font-semibold text-[#0A0A0F]">
              Most Popular
            </p>
            <h3 className="mt-3 text-2xl font-semibold">Growth</h3>
            <p className="mono mt-4 text-4xl">₹85,000 /month</p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Billed monthly. Cancel anytime.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-[var(--text-muted)]">
              <li>✓ Citation tracking across all 6 AI engines</li>
              <li>✓ 4 articles/month + existing page optimisation</li>
              <li>✓ Full schema (FAQ, HowTo, Product, QAPage)</li>
              <li>✓ Competitor citation intelligence</li>
              <li>✓ 2 PR placements/month</li>
              <li>✓ Dedicated GEO strategist</li>
              <li>✓ Monthly progress report</li>
            </ul>
            <button
              onClick={onAudit}
              className="mt-6 w-full rounded-lg bg-[var(--accent-green)] px-4 py-3 font-semibold text-[#0A0A0F]"
            >
              Get Free Audit First
            </button>
          </article>

          <article className="surface-card p-6 transition-colors hover:border-[#00E5A040]">
            <p className="text-sm text-[var(--text-muted)]">
              For enterprises & agencies
            </p>
            <h3 className="mt-3 text-2xl font-semibold">Enterprise</h3>
            <p className="mono mt-4 text-4xl">Custom</p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Let's scope it together.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-[var(--text-muted)]">
              <li>✓ Unlimited AI engine tracking</li>
              <li>✓ Full done-for-you GEO execution</li>
              <li>✓ White-label dashboard for agencies</li>
              <li>✓ Custom query research & content strategy</li>
              <li>✓ 5+ PR placements/month</li>
              <li>✓ Dedicated team + weekly strategy calls</li>
            </ul>
            <a
              href={calLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 block w-full rounded-lg border border-[var(--border-color)] px-4 py-3 text-center font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-green)]"
            >
              Book a Strategy Call
            </a>
          </article>
        </div>
        <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
          Not sure which plan? Start with a free audit - we'll recommend exactly
          what you need.
        </p>
      </Reveal>
    </section>
  );
}
