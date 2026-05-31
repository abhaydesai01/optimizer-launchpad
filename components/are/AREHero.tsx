"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const PipelineScene = dynamic(() => import("@/components/three/PipelineScene"), {
  ssr: false,
  loading: () => (
    <div className="are-pipeline-mobile">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={`seg-${i}`} className="flex items-center gap-1">
          <div className="pipeline-node" style={{ ["--i" as string]: i }} />
          {i < 7 ? <div className="pipeline-arrow" /> : null}
        </div>
      ))}
    </div>
  ),
});

type AREHeroProps = {
  onAudit: () => void;
};

const calLink =
  process.env.NEXT_PUBLIC_CAL_LINK ||
  "https://cal.com/abhay-desai/free-geo-strategy-call-optimizer360";

export function AREHero({ onAudit }: AREHeroProps) {
  return (
    <section className="are-section min-h-screen bg-[var(--bg-primary)] py-16 md:py-20">
      <div className="section-wrap grid items-center gap-10 md:grid-cols-[55%_45%]">
        <div className="max-w-[620px]">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-[#00D2A030] bg-[#00D2A008] px-3 py-1 text-sm font-medium text-[#00D2A0]"
          >
            ⚡ ARE — Distribution Infrastructure for Every Brand
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="are-h1 mt-5 max-w-[560px]"
          >
            Distribution,
            <br />
            Finally on
            <br />
            <span className="bg-[linear-gradient(135deg,#00D2A0,#8B7BFF)] bg-clip-text text-transparent">
              Autopilot.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="are-body mt-5 max-w-[540px]"
          >
            ARE is the distribution engine that gets your product in front of the
            right buyer — automatically. Lead generation, outreach, nurturing,
            and closing. Running 24/7 without a human sales team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a
              href={calLink}
              target="_blank"
              rel="noreferrer"
              className="are-btn-gradient rounded-xl px-8 py-[14px] text-[15px] font-semibold text-white"
            >
              See ARE in Action
            </a>
            <button
              onClick={onAudit}
              className="rounded-xl border border-[#D5DEEB] bg-white px-6 py-[14px] text-[15px] font-semibold text-[#222735] transition-all duration-200 hover:-translate-y-[1px] hover:border-[#8B7BFF] hover:shadow-[0_10px_22px_rgba(34,39,53,0.08)]"
            >
              Get Your Free Audit
            </button>
          </motion.div>

          <div className="mt-7 max-w-xl space-y-1">
            <p className="text-sm text-[var(--text-muted)]">
              Built by Salil Chaturvedi — co-founder of Provogue & Prozone Realty
            </p>
            <p className="text-xs italic text-[var(--text-faint)]">
              "Three decades of building distribution infrastructure —
              Provogue, Prozone, and now ARE."
            </p>
          </div>
        </div>

        <div className="hidden md:block">
          <PipelineScene />
        </div>
      </div>
    </section>
  );
}
