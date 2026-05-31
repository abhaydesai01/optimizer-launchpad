"use client";

import { ArrowRight } from "lucide-react";

type HeroProps = {
  onAudit: () => void;
  onHowItWorks: () => void;
};

export function Hero({ onAudit, onHowItWorks }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#f5f6fa] pb-20 pt-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(20,30,55,0.06) 1px, transparent 1px)",
          backgroundSize: "92px 100%",
        }}
      />
      <div className="section-wrap relative flex justify-center">
        <div className="max-w-4xl text-center">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#122847] px-3 py-1 text-sm text-white">
            GEO Early Access{" "}
            <span className="font-semibold text-[#5de2ff]">
              Join 50+ founders on the waitlist
            </span>
          </p>
          <h1 className="display text-5xl font-bold leading-[1.05] text-[#222735] md:text-7xl">
            Your Brand,
            <br />
            Cited by{" "}
            <span className="relative">
              Every
              <span className="absolute bottom-1 left-0 h-[3px] w-full bg-[#7d53f670]" />
            </span>
            <br />
            AI Engine.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#656f86]">
            Optimizer360 GEO gets your business cited in ChatGPT, Perplexity,
            Google AI Overviews, and every AI engine your buyers are using -
            while you track every citation in real time.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onAudit}
              className="rounded-full bg-[linear-gradient(135deg,#7d53f6,#9f55ff)] px-8 py-4 font-semibold text-white shadow-[0_14px_24px_rgba(125,83,246,0.32)] transition-all duration-200 hover:scale-[1.03]"
            >
              Book A Consult
            </button>
            <button
              onClick={onHowItWorks}
              className="inline-flex items-center gap-2 font-medium text-[#6657a8] transition-colors hover:text-[#4f4290]"
            >
              See how it works <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-8 space-y-1">
            <p className="text-sm text-[#7b8499]">
              Founded by Salil Chaturvedi - builder of Provogue & Prozone Realty
            </p>
            <p className="text-xs italic text-[#97a1b7]">
              "The man who built India's first lifestyle brand before malls
              existed is now building revenue infrastructure for the AI era."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
