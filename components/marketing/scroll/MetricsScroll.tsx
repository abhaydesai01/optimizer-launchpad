"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useIsDesktop } from "@/components/marketing/scroll/useIsDesktop";

type Visual = "gauge" | "bars" | "share" | "rank" | "sentiment";

const METRICS: { label: string; detail: string; visual: Visual }[] = [
  {
    label: "AI Visibility",
    detail: "How often your brand appears in engine answers for the prompts we track.",
    visual: "gauge",
  },
  {
    label: "Citation Rate",
    detail: "The share of answers that name or link to you, not just mention the category.",
    visual: "bars",
  },
  {
    label: "Share of Voice",
    detail: "Your slice of brand mentions against every competitor in the set.",
    visual: "share",
  },
  {
    label: "Position",
    detail: "Where you rank inside the answer when you are named: first, second, or absent.",
    visual: "rank",
  },
  {
    label: "Sentiment",
    detail: "How engines frame your brand when they mention you. Trust signals matter.",
    visual: "sentiment",
  },
];

const ease = (v: number) => 1 - Math.pow(1 - v, 3);

function Gauge({ p }: { p: MotionValue<number> }) {
  const [value, setValue] = useState(0);
  useMotionValueEvent(p, "change", (v) => setValue(Math.round(ease(v) * 61)));
  const dash = useTransform(p, (v) => `${ease(v) * 0.61 * 264} 264`);
  return (
    <div className="relative mx-auto h-36 w-36">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r="42" fill="none" stroke="var(--ink-800)" strokeWidth="7" />
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="var(--mint)"
          strokeWidth="7"
          strokeLinecap="round"
          style={{ strokeDasharray: dash }}
        />
      </svg>
      <span className="font-serif-display absolute inset-0 flex items-center justify-center text-3xl tabular-nums text-[var(--paper)]">
        {value}%
      </span>
    </div>
  );
}

const BAR_HEIGHTS = [22, 30, 28, 41, 47, 58, 72];

function Bar({ p, index, height }: { p: MotionValue<number>; index: number; height: number }) {
  const h = useTransform(p, (v) => {
    const local = Math.min(1, Math.max(0, v * 1.6 - index * 0.08));
    return `${ease(local) * height}%`;
  });
  const last = index === BAR_HEIGHTS.length - 1;
  return (
    <motion.span
      className={`w-full rounded-t-sm ${last ? "bg-[var(--mint)]" : "bg-[var(--mint)] opacity-25"}`}
      style={{ height: h }}
    />
  );
}

function Bars({ p }: { p: MotionValue<number> }) {
  return (
    <div className="mx-auto flex h-36 w-full max-w-[220px] items-end gap-2 border-b border-[var(--ink-line-strong)]" aria-hidden="true">
      {BAR_HEIGHTS.map((h, i) => (
        <Bar key={i} p={p} index={i} height={h} />
      ))}
    </div>
  );
}

function Share({ p }: { p: MotionValue<number> }) {
  const you = useTransform(p, (v) => `${8 + ease(v) * 26}%`);
  const a = useTransform(p, (v) => `${38 - ease(v) * 14}%`);
  const b = useTransform(p, (v) => `${32 - ease(v) * 8}%`);
  const [pct, setPct] = useState(8);
  useMotionValueEvent(p, "change", (v) => setPct(Math.round(8 + ease(v) * 26)));
  return (
    <div className="flex h-36 flex-col justify-center gap-4" aria-hidden="true">
      <div className="flex h-4 w-full overflow-hidden rounded-full bg-[var(--ink-800)]">
        <motion.span className="h-full bg-[var(--mint)]" style={{ width: you }} />
        <motion.span className="h-full bg-[rgba(148,163,196,0.45)]" style={{ width: a }} />
        <motion.span className="h-full bg-[rgba(148,163,196,0.25)]" style={{ width: b }} />
      </div>
      <div className="flex justify-between text-[12px] text-[var(--paper-muted)]">
        <span>
          <span className="font-serif-display text-2xl tabular-nums text-[var(--paper)]">{pct}%</span> you
        </span>
        <span className="self-end">vs 2 competitors</span>
      </div>
    </div>
  );
}

const RANKS = ["Halden Heart Institute", "St. Arlo Cardiac", "Rowan Medical", "Your brand"];

function Rank({ p }: { p: MotionValue<number> }) {
  // the brand climbs from 4th to 1st; the others shift down one slot
  return (
    <div className="relative mx-auto h-36 w-full max-w-[240px]" aria-hidden="true">
      {RANKS.map((name, i) => (
        <RankRow key={name} p={p} name={name} start={i} end={i === 3 ? 0 : i + 1} />
      ))}
    </div>
  );
}

function RankRow({ p, name, start, end }: { p: MotionValue<number>; name: string; start: number; end: number }) {
  const y = useTransform(p, (v) => (start + (end - start) * ease(v)) * 34);
  const brand = name === "Your brand";
  return (
    <motion.div
      style={{ y }}
      className={`absolute inset-x-0 top-0 flex h-[28px] items-center gap-3 rounded border px-3 text-[12px] ${
        brand
          ? "z-10 border-[var(--mint)] bg-[var(--ink-850)] text-[var(--mint)]"
          : "border-[var(--ink-line)] bg-[var(--ink-850)] text-[var(--paper-soft)]"
      }`}
    >
      <span className="w-3 tabular-nums text-[var(--paper-muted)]">•</span>
      {name}
    </motion.div>
  );
}

function Sentiment({ p }: { p: MotionValue<number> }) {
  const left = useTransform(p, (v) => `${42 + ease(v) * 40}%`);
  return (
    <div className="flex h-36 flex-col justify-center gap-3" aria-hidden="true">
      <div className="relative h-2 rounded-full bg-gradient-to-r from-[rgba(227,107,105,0.6)] via-[rgba(148,163,196,0.4)] to-[var(--mint)]">
        <motion.span
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--ink-950)] bg-[var(--paper)] shadow"
          style={{ left }}
        />
      </div>
      <div className="flex justify-between text-[11px] uppercase tracking-[0.14em] text-[var(--paper-muted)]">
        <span>Cautious</span>
        <span>Neutral</span>
        <span>Trusted</span>
      </div>
    </div>
  );
}

function MetricVisual({ visual, p }: { visual: Visual; p: MotionValue<number> }) {
  switch (visual) {
    case "gauge":
      return <Gauge p={p} />;
    case "bars":
      return <Bars p={p} />;
    case "share":
      return <Share p={p} />;
    case "rank":
      return <Rank p={p} />;
    case "sentiment":
      return <Sentiment p={p} />;
  }
}

function MetricCard({ metric, index, p }: { metric: (typeof METRICS)[number]; index: number; p: MotionValue<number> }) {
  return (
    <article className="flex w-full shrink-0 flex-col rounded-md border border-[var(--ink-line)] bg-[var(--ink-850)] p-7 lg:w-[clamp(340px,30vw,460px)]">
      <p className="text-[12px] tabular-nums text-[var(--paper-muted)]">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="font-serif-display mt-2 text-2xl text-[var(--paper)]">{metric.label}</h3>
      <div className="my-[min(2rem,3vh)]">
        <MetricVisual visual={metric.visual} p={p} />
      </div>
      <p className="mt-auto text-[14px] leading-relaxed text-[var(--paper-muted)]">{metric.detail}</p>
    </article>
  );
}

/** Desktop: progress for card i comes from how far the pinned track has moved. */
function PinnedCard({ metric, index, progress }: { metric: (typeof METRICS)[number]; index: number; progress: MotionValue<number> }) {
  const n = METRICS.length;
  const p = useTransform(progress, (v) => Math.min(1, Math.max(0, (v * (n + 1) - index * 0.85) / 1.4)));
  return <MetricCard metric={metric} index={index} p={p} />;
}

/** Mobile: each card plays once when it scrolls into view. */
function InViewCard({ metric, index }: { metric: (typeof METRICS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const p = useMotionValue(0);
  useEffect(() => {
    if (inView) animate(p, 1, { duration: 1.4, ease: "linear" });
  }, [inView, p]);
  return (
    <div ref={ref}>
      <MetricCard metric={metric} index={index} p={p} />
    </div>
  );
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function MetricsScroll() {
  const desktop = useIsDesktop();
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const laneRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useIsoLayoutEffect(() => {
    if (!desktop) return;
    const measure = () => {
      const track = trackRef.current;
      const lane = laneRef.current;
      if (!track || !lane) return;
      // slide until the last card's right edge lines up with the content column's right edge
      const laneRect = lane.getBoundingClientRect();
      setDistance(Math.max(0, track.scrollWidth - laneRect.width));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [desktop]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);

  const heading = (
    <div className="mk-wrap">
      <h2 id="metrics-heading" className="font-serif-display text-[clamp(1.8rem,2.6vw,2.9rem)] leading-[1.06] text-[var(--paper)]">
        Five numbers that say whether AI is choosing you.
      </h2>
      <p className="mt-4 max-w-xl text-[14px] text-[var(--paper-muted)]">
        Measured weekly. You can check every one in the engines. Figures shown here are examples.
      </p>
    </div>
  );

  if (!desktop) {
    return (
      <section ref={ref} className="mk-section mk-hairline bg-[var(--ink-900)]" aria-labelledby="metrics-heading">
        {heading}
        <div className="mk-wrap mt-10 grid gap-5 sm:grid-cols-2">
          {METRICS.map((metric, index) => (
            <InViewCard key={metric.label} metric={metric} index={index} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[320vh] mk-hairline bg-[var(--ink-900)]" aria-labelledby="metrics-heading">
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-[5vh] overflow-clip pb-6 pt-[108px]">
        {heading}
        <div ref={laneRef} className="mk-wrap">
          <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-6">
            {METRICS.map((metric, index) => (
              <PinnedCard key={metric.label} metric={metric} index={index} progress={scrollYProgress} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
