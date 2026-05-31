import { Reveal } from "@/components/Reveal";

type FinalCTAProps = {
  onAudit: () => void;
};

const calLink =
  process.env.NEXT_PUBLIC_CAL_LINK ||
  "https://cal.com/abhay-desai/free-geo-strategy-call-optimizer360";

export function FinalCTA({ onAudit }: FinalCTAProps) {
  return (
    <section className="section-pad pulse-bg">
      <Reveal className="section-wrap text-center">
        <h2 className="display text-4xl font-bold leading-tight md:text-6xl">
          Your next client is asking AI right now.
          <br />
          Are you the answer?
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg text-[var(--text-muted)]">
          Join the brands building citation authority before their competitors
          figure out GEO exists.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={onAudit}
            className="rounded-lg bg-[var(--accent-green)] px-7 py-4 font-semibold text-[#0A0A0F]"
          >
            Get Your Free GEO Audit
          </button>
          <a
            href={calLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-[var(--border-color)] px-7 py-4 font-semibold text-[var(--text-primary)]"
          >
            Book a Strategy Call
          </a>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-[var(--text-muted)]">
          <span>✓ Delivered in 48 hours</span>
          <span>✓ Brand-specific report</span>
          <span>✓ No commitment required</span>
        </div>
      </Reveal>
    </section>
  );
}
