"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  BarChart3,
  Crosshair,
  Link2,
  ListChecks,
  Swords,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type Stage = {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  body: string;
  image: string;
  alt: string;
};

const STAGES: Stage[] = [
  {
    id: "prompts",
    label: "Track",
    icon: ListChecks,
    title: "Start with the questions that decide your category.",
    body: "A tracked set of real buyer prompts, monitored across every engine, staged by funnel position and scored for visibility.",
    image: "/platform/prompt-intelligence.png",
    alt: "Optimizer360.ai Prompt Intelligence screen tracking buyer prompts with visibility scores, funnel stages and per-engine coverage",
  },
  {
    id: "measure",
    label: "Measure",
    icon: BarChart3,
    title: "Your entire AI footprint in one view.",
    body: "Visibility score, citation rate, share of voice and engine breakdown, with every scan logged. The honest before-and-after, updated continuously.",
    image: "/platform/command-center.png",
    alt: "Optimizer360.ai Command Center dashboard showing AI visibility score, citation rate, share of voice, visibility-over-time chart and per-engine breakdown",
  },
  {
    id: "diagnose",
    label: "Diagnose",
    icon: Crosshair,
    title: "Every buyer question, engine by engine.",
    body: "The coverage matrix shows where you are visible, where you are absent, and the upside if it is fixed. No averages hiding the truth.",
    image: "/platform/ai-visibility.png",
    alt: "Optimizer360.ai AI Visibility screen with 30-day visibility trend, coverage by engine, and an LLM coverage matrix of prompts with visibility percentages",
  },
  {
    id: "sources",
    label: "Trace sources",
    icon: Link2,
    title: "Know exactly which domains AI trusts.",
    body: "Every citation traced to its source: the domains engines lean on, their authority, and the exact URLs behind each answer.",
    image: "/platform/citation-intelligence.png",
    alt: "Optimizer360.ai Citation Intelligence screen showing citation timeline, citations by AI engine, top citation domains and an AI cited link explorer",
  },
  {
    id: "benchmark",
    label: "Benchmark",
    icon: Swords,
    title: "See who is beating you, and why.",
    body: "Head-to-head visibility against every competitor: who gets named, on which prompts, which sources back them, and the gap to close.",
    image: "/platform/competitor-arena.png",
    alt: "Optimizer360.ai Competitor Arena screen with head-to-head AI visibility rankings, competitor mention counts and per-competitor gap analysis",
  },
  {
    id: "act",
    label: "Act",
    icon: Wrench,
    title: "Insights that end in actions, not dashboards.",
    body: "Impact-ranked recommendations for prompt gaps, content, schema and citations, turned into a playbook our team executes.",
    image: "/platform/recommendations.png",
    alt: "Optimizer360.ai Recommendations screen with an impact-ranked action playbook covering prompt gaps, content, schema and citation opportunities",
  },
];

function TabProgress({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const n = STAGES.length;
  const scaleX = useTransform(progress, [index / n, (index + 1) / n], [0, 1], { clamp: true });
  return (
    <span className="absolute inset-x-3 bottom-0 h-px overflow-hidden bg-[var(--ink-line)]" aria-hidden="true">
      <motion.span className="block h-full origin-left bg-[var(--mint)]" style={{ scaleX }} />
    </span>
  );
}

export function StagesScroll() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // pinned progress through the stages
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(STAGES.length - 1, Math.max(0, Math.floor(v * STAGES.length))));
  });

  // the product window lifts and flattens as the section arrives
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const rotateX = useTransform(enter, [0, 1], [18, 0]);
  const frameY = useTransform(enter, [0, 1], [80, 0]);
  const frameScale = useTransform(enter, [0, 1], [0.92, 1]);

  const goTo = (index: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((index + 0.5) / STAGES.length), behavior: "smooth" });
  };

  const stage = STAGES[active];

  return (
    <section
      ref={ref}
      id="platform"
      className="relative mk-hairline bg-[var(--ink-900)]"
      style={{ height: `${STAGES.length * 70 + 100}vh` }}
      aria-labelledby="platform-heading"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-clip pb-6 pt-[108px]">
        <div className="mk-wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 id="platform-heading" className="font-serif-display text-[clamp(1.8rem,2.6vw,2.9rem)] leading-[1.06] text-[var(--paper)]">
                We find where you&apos;re missing. Then we fix it.
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-[var(--paper-soft)]">
              Our own platform, run by our own team. Every number in it can be
              checked by asking the engines yourself.
            </p>
          </div>

          <div
            className="mt-[3vh] flex justify-center"
            role="tablist"
            aria-label="Platform stages"
          >
            <div className="grid w-full grid-cols-6 gap-1 rounded-md border border-[var(--ink-line)] bg-[var(--ink-950)] p-1 sm:flex sm:w-auto sm:max-w-full">
              {STAGES.map((item, index) => {
                const Icon = item.icon;
                const selected = index === active;
                return (
                  <button
                    key={item.id}
                    role="tab"
                    id={`stage-tab-${item.id}`}
                    aria-selected={selected}
                    aria-controls="stage-panel"
                    onClick={() => goTo(index)}
                    className={`relative flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded px-1 py-2 text-[13px] font-medium transition-colors sm:justify-start sm:gap-2 sm:px-4 ${
                      selected
                        ? "bg-[var(--ink-800)] text-[var(--paper)]"
                        : "text-[var(--paper-muted)] hover:text-[var(--paper-soft)]"
                    }`}
                  >
                    <Icon size={15} className={`hidden sm:block ${selected ? "text-[var(--mint)]" : ""}`} aria-hidden="true" />
                    <span className="hidden sm:inline">{item.label}</span>
                    <span className="sm:hidden tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                    <span className="sr-only sm:hidden">{item.label}</span>
                    <TabProgress progress={scrollYProgress} index={index} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-[3vh] grid items-start gap-6 lg:grid-cols-[0.9fr_2.1fr] lg:gap-10">
            <div
              id="stage-panel"
              role="tabpanel"
              aria-labelledby={`stage-tab-${stage.id}`}
              aria-live="polite"
              className="min-h-[150px] lg:pt-6"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-[12px] font-medium tabular-nums text-[var(--mint)]">
                    {String(active + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
                  </p>
                  <h3 className="font-serif-display mt-3 text-2xl text-[var(--paper)]">
                    {stage.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-[var(--paper-soft)]">
                    {stage.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div style={{ perspective: 1400 }}>
              <motion.div
                style={{ rotateX, y: frameY, scale: frameScale, transformOrigin: "50% 0%" }}
                className="overflow-hidden rounded-md border border-[var(--ink-line-strong)] bg-[var(--ink-950)] shadow-[0_40px_80px_-40px_rgba(17,20,26,0.45)]"
              >
                <div className="flex items-center gap-1.5 border-b border-[var(--ink-line)] px-4 py-2.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink-800)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink-800)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink-800)]" />
                  <span className="ml-3 rounded bg-[var(--ink-800)] px-2 py-0.5 text-[10px] text-[var(--paper-muted)]">
                    app.optimizer360.ai
                  </span>
                  <span className="ml-auto text-[10px] uppercase tracking-[0.14em] text-[var(--paper-muted)]">
                    Demo data
                  </span>
                </div>
                <div className="relative w-full" style={{ height: "min(46vh, 620px)" }}>
                  {STAGES.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="absolute inset-0"
                      initial={false}
                      animate={{
                        opacity: index === active ? 1 : 0,
                        scale: index === active ? 1 : 1.03,
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      aria-hidden={index !== active}
                    >
                      {/* on a phone the screen is shown at a readable size: its top-left corner, zoomed */}
                      <div className="absolute left-0 top-0 h-full w-full max-sm:h-[190%] max-sm:w-[190%]">
                        <Image
                          src={item.image}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 640px) 200vw, (max-width: 1024px) 100vw, 66vw"
                          className="object-cover object-left-top"
                          priority={index === 0}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
