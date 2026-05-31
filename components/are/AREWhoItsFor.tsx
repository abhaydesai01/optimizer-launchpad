import { Reveal } from "@/components/Reveal";

export function AREWhoItsFor() {
  return (
    <section className="are-section border-y border-[var(--border-color)] bg-[#F8FAFD] py-20 md:py-24">
      <Reveal className="section-wrap">
        <h2 className="are-h2">
          ARE builds distribution for every business with a product to sell
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="flex h-full flex-col rounded-2xl border border-[#E2E7F0] bg-[linear-gradient(135deg,#00D2A015,#FFFFFF)] p-7 shadow-[0_2px_16px_rgba(34,39,53,0.04)]">
            <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
              For Growing Businesses
            </h3>
            <ul className="mt-5 space-y-2 text-[var(--text-muted)]">
              <li>You have a great product but no distribution system</li>
              <li>You're doing outreach manually and inconsistently</li>
              <li>You're losing deals because follow-up falls through</li>
              <li>You want to scale distribution 3x without hiring 3x</li>
            </ul>
            <div className="mt-5 space-y-2 text-sm text-[var(--text-primary)]">
              <p>→ Distribution infrastructure without a sales team salary</p>
              <p>→ Your product reaching the right buyer 24/7 automatically</p>
              <p>
                → Consistent follow-up on every single lead, forever
              </p>
            </div>
          </article>

          <article className="flex h-full flex-col rounded-2xl border border-[#E2E7F0] bg-[linear-gradient(135deg,#8B7BFF15,#FFFFFF)] p-7 shadow-[0_2px_16px_rgba(34,39,53,0.04)]">
            <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
              For Enterprises
            </h3>
            <ul className="mt-5 space-y-2 text-[var(--text-muted)]">
              <li>Your distribution is expensive and slow to scale</li>
              <li>Your CRM data is underutilised for distribution</li>
              <li>You want AI running distribution parallel to your team</li>
              <li>You need distribution visibility across multiple markets</li>
            </ul>
            <div className="mt-5 space-y-2 text-sm text-[var(--text-primary)]">
              <p>→ AI agents augmenting your best reps — not replacing them</p>
              <p>→ Faster distribution velocity across every segment</p>
              <p>→ Revenue forecasting based on real distribution data</p>
            </div>
          </article>
        </div>
      </Reveal>
    </section>
  );
}
