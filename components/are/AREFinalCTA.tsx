type AREFinalCTAProps = {
  onAudit: () => void;
};

const calLink =
  process.env.NEXT_PUBLIC_CAL_LINK ||
  "https://cal.com/abhay-desai/free-geo-strategy-call-optimizer360";

export function AREFinalCTA({ onAudit }: AREFinalCTAProps) {
  return (
    <section
      className="are-section py-20 md:py-24"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #00D2A015 0%, transparent 60%), #222735",
      }}
    >
      <div className="section-wrap text-center">
        <h2 className="display text-4xl font-bold leading-tight text-white md:text-6xl">
          Your distribution shouldn't stop
          <br />
          when your team goes home.
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg text-[#9AA4B7]">
          ARE runs your distribution infrastructure 24/7 — without missing a
          lead, dropping a follow-up, or waiting for Monday morning.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={calLink}
            target="_blank"
            rel="noreferrer"
            className="are-btn-gradient rounded-xl px-7 py-[14px] font-semibold text-white shadow-[0_14px_30px_rgba(139,123,255,0.24)]"
          >
            See ARE in Action
          </a>
          <button
            onClick={onAudit}
            className="rounded-xl border border-white/20 px-7 py-[14px] font-semibold text-white transition-all duration-200 hover:-translate-y-[1px] hover:border-white"
          >
            Get Your Free Audit
          </button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-[#646D82]">
          <span>✓ Setup in 5–7 days</span>
          <span>✓ No sales team required</span>
          <span>✓ Cancel anytime</span>
        </div>
      </div>
    </section>
  );
}
