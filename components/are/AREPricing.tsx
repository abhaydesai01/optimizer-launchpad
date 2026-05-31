import { Reveal } from "@/components/Reveal";

type AREPricingProps = {
  onAudit: () => void;
};

const calLink =
  process.env.NEXT_PUBLIC_CAL_LINK ||
  "https://cal.com/abhay-desai/free-geo-strategy-call-optimizer360";

const comparisonRows = [
  ["Prospect automatically", "✗", "✗", "✓"],
  ["Write personalised outreach", "✗", "✗", "✓"],
  ["Adapt follow-up by behaviour", "✗", "✗", "✓"],
  ["Run pipeline without humans", "✗", "✗", "✓"],
  ["Self-optimise over time", "✗", "✗", "✓"],
  ["Real-time pipeline intel", "✓", "✗", "✓"],
  ["Forecast revenue", "✓", "✗", "✓"],
  ["Works 24/7 without team", "✗", "✗", "✓"],
];

export function AREPricing({ onAudit }: AREPricingProps) {
  return (
    <>
      <section className="are-section bg-white py-20 md:py-24">
        <Reveal className="section-wrap">
          <h2 className="are-h2">
            ARE is not a CRM. It's not a sequencer. It's distribution infrastructure.
          </h2>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#E2E7F0] bg-white">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="text-left text-sm text-[var(--text-muted)]">
                  <th className="border-b border-[#E2E7F0] p-4">Feature</th>
                  <th className="border-b border-[#E2E7F0] p-4">CRM (HubSpot)</th>
                  <th className="border-b border-[#E2E7F0] p-4">Sequencer (Clay)</th>
                  <th className="border-b border-[#E2E7F0] bg-[linear-gradient(135deg,#00D2A0,#8B7BFF)] p-4 font-semibold text-white">
                    ARE
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row[0]}>
                    <td className="border-b border-[#E2E7F0] p-4 text-[var(--text-primary)]">
                      {row[0]}
                    </td>
                    <td className="border-b border-[#E2E7F0] p-4 text-center text-[var(--text-faint)]">
                      {row[1]}
                    </td>
                    <td className="border-b border-[#E2E7F0] p-4 text-center text-[var(--text-faint)]">
                      {row[2]}
                    </td>
                    <td className="border-b border-[#E2E7F0] p-4 text-center text-[#00D2A0]">
                      {row[3]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-[var(--text-primary)]">
            "CRMs store your pipeline. Sequencers send your emails. ARE is the
            distribution infrastructure that runs everything in between."
          </p>
        </Reveal>
      </section>

      <section id="are-pricing" className="are-section border-y border-[var(--border-color)] bg-[#F8FAFD] py-20 md:py-24">
        <Reveal className="section-wrap">
          <h2 className="are-h2">
            Distribution infrastructure that pays for itself.
          </h2>

          <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-3">
            <article className="are-card flex h-full flex-col p-7">
              <p className="text-sm text-[var(--text-muted)]">For founders & small teams</p>
              <h3 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">ARE Starter</h3>
              <p className="mono mt-4 text-4xl text-[var(--text-primary)]">₹45,000 /month</p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">Billed monthly. Cancel anytime.</p>
              <ul className="mt-5 space-y-2 text-sm text-[var(--text-muted)]">
                <li>✓ ARE pipeline for 1 ICP segment</li>
                <li>✓ Up to 200 prospects/month</li>
                <li>✓ AI outreach + 3-touch follow-up sequence</li>
                <li>✓ CRM auto-update (HubSpot/Zoho integration)</li>
                <li>✓ Monthly pipeline report</li>
                <li>✓ Email support</li>
              </ul>
              <button
                onClick={onAudit}
                className="are-btn-gradient mt-auto w-full rounded-xl px-4 py-[14px] font-semibold text-white"
              >
                Get Free Audit First
              </button>
            </article>

            <article className="are-card flex h-full flex-col border-2 border-transparent bg-[linear-gradient(white,white),linear-gradient(135deg,#00D2A0,#8B7BFF)] bg-origin-border bg-clip-padding p-7 shadow-[0_0_30px_rgba(0,210,160,0.2)]">
              <p className="inline-flex rounded-full bg-[linear-gradient(135deg,#00D2A0,#8B7BFF)] px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">ARE Growth</h3>
              <p className="mono mt-4 text-4xl text-[var(--text-primary)]">₹95,000 /month</p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">Billed monthly. Cancel anytime.</p>
              <ul className="mt-5 space-y-2 text-sm text-[var(--text-muted)]">
                <li>✓ ARE pipeline for 3 ICP segments</li>
                <li>✓ Up to 1,000 prospects/month</li>
                <li>✓ AI outreach + adaptive 7-touch sequences</li>
                <li>✓ LinkedIn + email outreach</li>
                <li>✓ Intent signal monitoring</li>
                <li>✓ Pipeline velocity intelligence</li>
                <li>✓ Revenue forecasting</li>
                <li>✓ Dedicated ARE strategist</li>
                <li>✓ Bi-weekly strategy calls</li>
              </ul>
              <button
                onClick={onAudit}
                className="are-btn-gradient mt-auto w-full rounded-xl px-4 py-[14px] font-semibold text-white"
              >
                Get Free Audit First
              </button>
            </article>

            <article className="are-card flex h-full flex-col p-7">
              <p className="text-sm text-[var(--text-muted)]">For large teams & agencies</p>
              <h3 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">ARE Enterprise</h3>
              <p className="mono mt-4 text-4xl text-[var(--text-primary)]">Custom</p>
              <ul className="mt-5 space-y-2 text-sm text-[var(--text-muted)]">
                <li>✓ Unlimited ICP segments</li>
                <li>✓ Unlimited prospect volume</li>
                <li>✓ Multi-channel (email + LinkedIn + SMS)</li>
                <li>✓ Custom AI agent training on your sales data</li>
                <li>✓ CRM deep integration (Salesforce, custom)</li>
                <li>✓ Full pipeline and revenue analytics</li>
                <li>✓ Dedicated ARE team</li>
                <li>✓ Weekly war room calls</li>
                <li>✓ White-label for agencies</li>
              </ul>
              <a
                href={calLink}
                target="_blank"
                rel="noreferrer"
                className="mt-auto block w-full rounded-xl border border-[#E2E7F0] px-4 py-[14px] text-center font-semibold text-[var(--text-primary)] hover:border-[#8B7BFF]"
              >
                Book a Strategy Call
              </a>
            </article>
          </div>

          <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
            Not sure where to start? Get a free audit first. We'll tell you exactly
            which plan fits your pipeline.
          </p>
        </Reveal>
      </section>
    </>
  );
}
