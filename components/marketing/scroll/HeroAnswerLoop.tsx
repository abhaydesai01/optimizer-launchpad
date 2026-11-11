"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { ENGINES, loadGlyph, type EngineId } from "@/components/marketing/scroll/engineMarks";
import { cn } from "@/lib/utils";

type Scene = {
  engine: EngineId;
  question: string;
  lead: string;
  rivals: [string, string];
  reason: string;
  score: number;
  /** what the engine cites before (the rivals' pages) and after (the brand's own pages) */
  cites: { before: [string, string]; after: [string, string] };
};

// Brand names are invented for the illustration (labelled as such in the window's footer).
const SCENES: Scene[] = [
  {
    engine: "chatgpt",
    question: "Which hospital in Mumbai should I trust for cardiac surgery?",
    lead: "Based on surgeon credentials and published outcomes, the most often recommended are",
    rivals: ["Halden Heart Institute", "St. Arlo Cardiac Centre"],
    reason: "verified surgeon credentials",
    score: 61,
    cites: { before: ["Halden outcomes report", "City hospital rankings"], after: ["Your surgeon profiles", "Your outcomes page"] },
  },
  {
    engine: "perplexity",
    question: "Which private bank is best for wealth management in India?",
    lead: "For high-net-worth clients, sources most often point to",
    rivals: ["Meridale Private", "Corrow & Vane"],
    reason: "transparent fees",
    score: 54,
    cites: { before: ["Meridale fee guide", "Wealth manager survey"], after: ["Your fee schedule", "Your regulator filings"] },
  },
  {
    engine: "gemini",
    question: "Which developer should I buy an apartment from in Pune?",
    lead: "For delivery record and legal clarity, the names that come up are",
    rivals: ["Ashgrove Habitats", "Northline Estates"],
    reason: "on-time handovers",
    score: 58,
    cites: { before: ["Ashgrove project list", "Property forum thread"], after: ["Your RERA records", "Your handover dates"] },
  },
  {
    engine: "claude",
    question: "Which business school should I shortlist for an MBA?",
    lead: "Weighing accreditation and placements, the answers converge on",
    rivals: ["Westmere School of Business", "Calder Institute"],
    reason: "placement transparency",
    score: 66,
    cites: { before: ["Westmere rankings page", "MBA forum thread"], after: ["Your accreditation page", "Your placement report"] },
  },
];

type Phase = "typing" | "thinking" | "streaming" | "before" | "after" | "leaving";
type View = "before" | "after";
const EASE = [0.22, 1, 0.36, 1] as const;
const BASELINE = 4;

function EngineMark({ id, className = "" }: { id: EngineId; className?: string }) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    const engine = ENGINES.find((e) => e.id === id);
    if (engine) loadGlyph(engine).then((c) => alive && setUrl(c.toDataURL()));
    return () => {
      alive = false;
    };
  }, [id]);
  return (
    <span
      aria-hidden="true"
      className={cn("block h-4 w-4 bg-current", className)}
      style={
        url
          ? {
              WebkitMaskImage: `url(${url})`,
              maskImage: `url(${url})`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }
          : { opacity: 0 }
      }
    />
  );
}

/** Eight weeks of the prompt's visibility: flat at the baseline, then climbing to the scene's score. */
function trendPath(score: number) {
  const pts = [BASELINE, BASELINE, BASELINE + 1, BASELINE + 3, score * 0.32, score * 0.55, score * 0.8, score];
  return pts
    .map((v, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * 100} ${38 - (v / 70) * 34}`)
    .join(" ");
}

/**
 * The hero's product window: a buyer asks an engine, the answer names only rivals ("Before GEO"),
 * then the brand is recommended first ("After GEO") and the prompt's visibility climbs. It plays by
 * itself while on screen; the Before / After switch takes over when a visitor uses it.
 */
export function HeroDemo() {
  const reduced = useReducedMotion();
  const [sceneIndex, setSceneIndex] = useState(0);
  // the window opens on the finished picture (the first scene, after GEO), then the loop takes over
  const [phase, setPhase] = useState<Phase>("after");
  const [typed, setTyped] = useState(SCENES[0].question.length);
  const [words, setWords] = useState(SCENES[0].lead.split(" ").length);
  const [manual, setManual] = useState<View | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  // the loop only advances while the window is on screen, so it never runs in the background
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.2 });

  const scene = SCENES[sceneIndex];
  const engine = ENGINES.find((e) => e.id === scene.engine)!;
  const leadWords = scene.lead.split(" ");
  // phones hold the finished picture (the visitor can still tap Before / After); the loop runs from 640px
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const still = reduced || narrow || manual !== null;

  const score = useMotionValue(BASELINE);
  const [scoreText, setScoreText] = useState(BASELINE);
  useMotionValueEvent(score, "change", (v) => setScoreText(Math.round(v)));

  useEffect(() => {
    if (still || !inView) return;
    const next = (fn: () => void, ms: number) => {
      timer.current = setTimeout(fn, ms);
    };
    if (phase === "typing") {
      if (typed < scene.question.length) next(() => setTyped((n) => n + 1), 16);
      else next(() => setPhase("thinking"), 250);
    } else if (phase === "thinking") {
      next(() => setPhase("streaming"), 600);
    } else if (phase === "streaming") {
      if (words < leadWords.length) next(() => setWords((n) => n + 1), 40);
      else next(() => setPhase("before"), 300);
    } else if (phase === "before") {
      next(() => setPhase("after"), 2400);
    } else if (phase === "after") {
      next(() => setPhase("leaving"), 4200);
    } else if (phase === "leaving") {
      next(() => {
        setSceneIndex((i) => (i + 1) % SCENES.length);
        setTyped(0);
        setWords(0);
        setPhase("typing");
      }, 450);
    }
    return () => clearTimeout(timer.current);
  }, [phase, typed, words, scene.question.length, leadWords.length, still, inView]);

  // what the window shows: the visitor's choice, else the loop's phase
  const view: View = manual ?? (reduced || narrow || phase === "after" || phase === "leaving" ? "after" : "before");
  const answered = still || ["streaming", "before", "after", "leaving"].includes(phase);
  const complete = still || ["before", "after", "leaving"].includes(phase);
  const after = view === "after";

  useEffect(() => {
    if (reduced) {
      score.set(after ? scene.score : BASELINE);
      return;
    }
    if (after) {
      const controls = animate(score, scene.score, { duration: 1.6, ease: EASE, delay: manual ? 0 : 0.25 });
      return () => controls.stop();
    }
    const controls = animate(score, BASELINE, { duration: 0.5, ease: EASE });
    return () => controls.stop();
  }, [after, scene.score, score, reduced, manual]);

  const choose = (v: View) => {
    clearTimeout(timer.current);
    setManual(v);
    setTyped(scene.question.length);
    setWords(leadWords.length);
  };

  const rows = after ? (["brand", "0", "1"] as const) : (["0", "1", "missing"] as const);
  const question = still ? scene.question : scene.question.slice(0, typed);
  const lead = still ? scene.lead : leadWords.slice(0, words).join(" ");

  return (
    <div
      ref={rootRef}
      className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[var(--ink-line-strong)] bg-[var(--ink-850)] shadow-[0_30px_80px_-40px_rgba(6,10,20,0.55)]"
    >
      {/* window bar: the engine being asked, and the switch between before and after */}
      <div className="flex items-center gap-3 border-b border-[var(--ink-line)] px-4 py-2.5">
        <span className="hidden gap-1.5 sm:flex" aria-hidden="true">
          <i className="h-2.5 w-2.5 rounded-full bg-[var(--ink-line-strong)]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[var(--ink-line-strong)]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[var(--ink-line-strong)]" />
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={engine.id}
            className="flex min-w-0 items-center gap-2 text-[13px] font-medium text-[var(--paper)]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <EngineMark id={engine.id} />
            {engine.name}
          </motion.span>
        </AnimatePresence>
        <div
          className="ml-auto flex rounded-lg border border-[var(--ink-line)] bg-[var(--ink-900)] p-0.5"
          role="group"
          aria-label="Show the answer before or after GEO work"
        >
          {(["before", "after"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => choose(v)}
              className={cn(
                "relative h-8 rounded-md px-3 text-[13px] font-medium transition-colors",
                view === v ? "text-[var(--paper)]" : "text-[var(--paper-muted)] hover:text-[var(--paper-soft)]",
              )}
            >
              {view === v ? (
                <motion.span
                  layoutId="hero-view-pill"
                  className="absolute inset-0 rounded-md border border-[var(--ink-line-strong)] bg-[var(--ink-850)] shadow-[0_1px_2px_rgba(6,10,20,0.12)]"
                  transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
                />
              ) : null}
              <span className="relative">{v === "before" ? "Before GEO" : "After GEO"}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        {/* the conversation: a fixed-height stage, so nothing jumps as the answer arrives */}
        <div className="flex min-h-[300px] min-w-0 flex-col gap-4 p-4 sm:p-5" aria-live="off">
          <div className="flex justify-end">
            <p className="min-h-[2.75rem] max-w-[92%] rounded-2xl rounded-br-md bg-[var(--ink-800)] px-4 py-2.5 text-[14px] leading-relaxed text-[var(--paper)]">
              {question}
              {!still && phase === "typing" ? <span className="mk-caret ml-0.5 !bg-[var(--paper)]" /> : null}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--ink-line)] text-[var(--paper-soft)]">
              <EngineMark id={engine.id} className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              {answered ? (
                <p className="text-[14px] leading-relaxed text-[var(--paper-soft)]">{lead}</p>
              ) : (
                // while the question is still being asked, the answer's place holds two quiet lines
                <div className="space-y-2 pt-1.5" aria-hidden="true">
                  <span className="block h-2.5 w-[86%] rounded-full bg-[var(--ink-800)]" />
                  <span className="block h-2.5 w-[64%] rounded-full bg-[var(--ink-800)]" />
                </div>
              )}

              <ol className="relative mt-3 space-y-1.5">
                {complete ? (
                  <AnimatePresence initial={false} mode="popLayout">
                    {rows.map((key, i) => (
                      <motion.li
                        key={`${scene.engine}-${key}`}
                        layout={!reduced}
                        initial={{ opacity: 0, y: key === "brand" ? -10 : 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
                        className={cn(
                          "flex items-center gap-3 rounded-lg border px-3 py-2 text-[14px]",
                          key === "brand" && "border-[var(--mint)] bg-[var(--mint-dim)] text-[var(--paper)]",
                          key === "missing" && "border-dashed border-[var(--amber)] text-[var(--amber)]",
                          (key === "0" || key === "1") &&
                            cn("border-[var(--ink-line)] text-[var(--paper-soft)]", after && "opacity-60"),
                        )}
                      >
                        <span className="w-4 shrink-0 font-medium tabular-nums">{key === "missing" ? "–" : i + 1}</span>
                        {key === "brand" ? (
                          <span className="min-w-0 truncate">
                            <span className="font-medium">Your brand</span>
                            <span className="ml-2 text-[13px] text-[var(--paper-soft)]">{scene.reason}</span>
                          </span>
                        ) : key === "missing" ? (
                          <span className="min-w-0 truncate">Your brand is not in the answer</span>
                        ) : (
                          <span className="min-w-0 truncate">{scene.rivals[Number(key)]}</span>
                        )}
                      </motion.li>
                    ))}
                  </AnimatePresence>
                ) : (
                  [0, 1, 2].map((n) => (
                    <li key={n} className="h-[38px] rounded-lg border border-[var(--ink-line)]" aria-hidden="true" />
                  ))
                )}
              </ol>

              {/* the sources behind the answer: the rivals' pages before, the brand's own after */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px]">
                <span className="text-[var(--paper-muted)]">Sources cited</span>
                {complete ? (
                  (after ? scene.cites.after : scene.cites.before).map((src) => (
                    <motion.span
                      key={`${scene.engine}-${src}`}
                      initial={reduced ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: EASE, delay: after && !manual ? 0.5 : 0 }}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-md border px-2 py-1",
                        after
                          ? "border-[var(--mint)] text-[var(--paper)]"
                          : "border-[var(--ink-line)] text-[var(--paper-soft)]",
                      )}
                    >
                      <span
                        className={cn("h-1.5 w-1.5 rounded-full", after ? "bg-[var(--mint)]" : "bg-[var(--paper-muted)]")}
                        aria-hidden="true"
                      />
                      {src}
                    </motion.span>
                  ))
                ) : (
                  <span className="h-[28px] w-40 rounded-md border border-[var(--ink-line)]" aria-hidden="true" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* the prompt's visibility: one number and its eight-week line */}
        <div className="flex flex-col justify-between gap-4 border-t border-[var(--ink-line)] p-5 md:border-l md:border-t-0">
          <p className="text-[13px] font-medium text-[var(--paper-muted)]">AI visibility for this prompt</p>
          <div>
            <p className="font-serif-display text-[clamp(4rem,6.4vw,6.25rem)] leading-[0.85] tabular-nums text-[var(--paper)]">
              {scoreText}
              <span className="text-[0.42em] text-[var(--paper-muted)]">%</span>
            </p>
            <p className="mt-3 min-h-[1.5em] text-[14px] text-[var(--paper-soft)]">
              {after ? (
                <>
                  up from <span className="line-through decoration-[var(--paper-muted)]">{BASELINE}%</span>, named first
                </>
              ) : (
                "Named in almost no answers"
              )}
            </p>
          </div>
          {/* the line draws left to right by a clip wipe (a path-length dash breaks on a non-scaling stroke) */}
          <div className="relative h-14 w-full" aria-hidden="true">
            <svg viewBox="0 0 100 40" className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none">
              <path d="M0 38 H100" stroke="var(--ink-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>
            <motion.svg
              key={`${scene.engine}-${after}`}
              viewBox="0 0 100 40"
              className="absolute inset-0 h-full w-full overflow-visible"
              preserveAspectRatio="none"
              initial={{ clipPath: reduced ? "inset(-10% 0% -10% 0%)" : "inset(-10% 100% -10% 0%)" }}
              animate={{ clipPath: "inset(-10% 0% -10% 0%)" }}
              transition={{ duration: reduced ? 0 : 1.4, ease: EASE, delay: after && !manual ? 0.25 : 0 }}
            >
              <path
                d={after ? trendPath(scene.score) : `M0 ${38 - (BASELINE / 70) * 34} L100 ${38 - (BASELINE / 70) * 34}`}
                fill="none"
                stroke={after ? "var(--mint)" : "var(--paper-muted)"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </motion.svg>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[var(--ink-line)] px-4 py-2 text-[12px] text-[var(--paper-muted)]">
        <span>Illustration: brand names are fictional</span>
        <span className="hidden sm:inline">Weekly check, 8 weeks</span>
      </div>
    </div>
  );
}
