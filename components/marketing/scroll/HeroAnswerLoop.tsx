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
import { ArrowUp, Copy, Globe, Plus, RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react";
import { AnswerGlyph } from "@/components/marketing/AnswerMark";
import { ENGINES, loadGlyph, type EngineId } from "@/components/marketing/scroll/engineMarks";
import { cn } from "@/lib/utils";

type Scene = {
  engine: EngineId;
  /** what the composer says before anything is typed */
  placeholder: string;
  /** the engine's working line while it answers */
  working: string;
  question: string;
  lead: string;
  rivals: [string, string];
  reason: string;
  score: number;
  /** what the engine cites before (the rivals' pages) and after (the brand's own pages) */
  cites: { before: [string, string]; after: [string, string] };
};

// Brand names are invented for the illustration (said so on the score card).
const SCENES: Scene[] = [
  {
    engine: "chatgpt",
    placeholder: "Ask anything",
    working: "Searching the web",
    question: "Which hospital in Mumbai should I trust for cardiac surgery?",
    lead: "Based on surgeon credentials and published outcomes, the most often recommended are:",
    rivals: ["Halden Heart Institute", "St. Arlo Cardiac Centre"],
    reason: "verified surgeon credentials and published outcomes",
    score: 61,
    cites: { before: ["Halden outcomes report", "City hospital rankings"], after: ["Your surgeon profiles", "Your outcomes page"] },
  },
  {
    engine: "perplexity",
    placeholder: "Ask anything",
    working: "Reading 9 sources",
    question: "Which private bank is best for wealth management in India?",
    lead: "For high-net-worth clients, sources most often point to:",
    rivals: ["Meridale Private", "Corrow & Vane"],
    reason: "transparent fees and regulatory standing",
    score: 54,
    cites: { before: ["Meridale fee guide", "Wealth manager survey"], after: ["Your fee schedule", "Your regulator filings"] },
  },
  {
    engine: "gemini",
    placeholder: "Ask Gemini",
    working: "Thinking",
    question: "Which developer should I buy an apartment from in Pune?",
    lead: "For delivery record and legal clarity, the names that come up are:",
    rivals: ["Ashgrove Habitats", "Northline Estates"],
    reason: "RERA compliance and on-time handovers",
    score: 58,
    cites: { before: ["Ashgrove project list", "Property forum thread"], after: ["Your RERA records", "Your handover dates"] },
  },
  {
    engine: "claude",
    placeholder: "Reply to Claude",
    working: "Thinking",
    question: "Which business school should I shortlist for an MBA?",
    lead: "Weighing accreditation and placements, the answers converge on:",
    rivals: ["Westmere School of Business", "Calder Institute"],
    reason: "accreditation and placement transparency",
    score: 66,
    cites: { before: ["Westmere rankings page", "MBA forum thread"], after: ["Your accreditation page", "Your placement report"] },
  },
];

type Phase = "typing" | "sent" | "streaming" | "before" | "after" | "leaving";
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

/** a numbered citation marker, as the engines print them after a claim */
function Cite({ n }: { n: number }) {
  return (
    <sup className="ml-0.5 inline-grid h-[1.15rem] min-w-[1.15rem] -translate-y-px place-items-center rounded-full bg-[var(--ink-800)] px-1 align-middle text-[10.5px] font-medium not-italic text-[var(--paper-soft)]">
      {n}
    </sup>
  );
}

/**
 * The hero's picture: a real-looking engine conversation. The question types into the composer and
 * is sent, the engine answers, and the answer names rivals ("Before GEO") or puts the brand first
 * ("After GEO"). Optimizer360's own read of it, the prompt's visibility, floats on a card over the
 * chat's corner, with the Before / After switch that takes over the loop when a visitor uses it.
 */
export function HeroDemo() {
  const reduced = useReducedMotion();
  // the window opens on the finished picture (the first scene, after GEO), then the loop takes over
  const [sceneIndex, setSceneIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("after");
  const [typed, setTyped] = useState(SCENES[0].question.length);
  const [words, setWords] = useState(SCENES[0].lead.split(" ").length);
  const [manual, setManual] = useState<View | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  // the loop only advances while the window is on screen, so it never runs in the background
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.2 });
  // phones hold the finished picture (the visitor can still tap Before / After); the loop runs from 640px
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const scene = SCENES[sceneIndex];
  const engine = ENGINES.find((e) => e.id === scene.engine)!;
  const leadWords = scene.lead.split(" ");
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
      if (typed < scene.question.length) next(() => setTyped((n) => n + 1), 22);
      else next(() => setPhase("sent"), 350);
    } else if (phase === "sent") {
      next(() => setPhase("streaming"), 1100);
    } else if (phase === "streaming") {
      if (words < leadWords.length) next(() => setWords((n) => n + 1), 45);
      else next(() => setPhase("before"), 250);
    } else if (phase === "before") {
      next(() => setPhase("after"), 2600);
    } else if (phase === "after") {
      next(() => setPhase("leaving"), 4400);
    } else if (phase === "leaving") {
      next(() => {
        setSceneIndex((i) => (i + 1) % SCENES.length);
        setTyped(0);
        setWords(0);
        setPhase("typing");
      }, 400);
    }
    return () => clearTimeout(timer.current);
  }, [phase, typed, words, scene.question.length, leadWords.length, still, inView]);

  // what the chat shows: the visitor's choice, else the loop's phase
  const view: View = manual ?? (still || phase === "after" || phase === "leaving" ? "after" : "before");
  const after = view === "after";
  const sent = still || phase !== "typing";
  const answering = !still && phase === "sent";
  const answered = still || ["streaming", "before", "after", "leaving"].includes(phase);
  const complete = still || ["before", "after", "leaving"].includes(phase);

  useEffect(() => {
    if (reduced) {
      score.set(after ? scene.score : BASELINE);
      return;
    }
    const controls = after
      ? animate(score, scene.score, { duration: 1.6, ease: EASE, delay: manual ? 0 : 0.3 })
      : animate(score, BASELINE, { duration: 0.5, ease: EASE });
    return () => controls.stop();
  }, [after, scene.score, score, reduced, manual]);

  const choose = (v: View) => {
    clearTimeout(timer.current);
    setManual(v);
    setTyped(scene.question.length);
    setWords(leadWords.length);
  };

  // the answer's lines: rivals only before; the brand first, with its reason, after
  const cites = after ? scene.cites.after : scene.cites.before;
  const items = after
    ? [
        { key: "brand", name: "Your brand", note: `for ${scene.reason}`, cite: 1 },
        { key: "r0", name: scene.rivals[0], note: "for its published record", cite: 2 },
        { key: "r1", name: scene.rivals[1], note: "on several lists", cite: 2 },
      ]
    : [
        { key: "r0", name: scene.rivals[0], note: `per ${scene.cites.before[0]}`, cite: 1 },
        { key: "r1", name: scene.rivals[1], note: `per ${scene.cites.before[1]}`, cite: 2 },
      ];

  return (
    <div ref={rootRef} className="relative flex h-full min-w-0 flex-col">
      {/* the engine's chat */}
      <div
        className="flex min-h-[460px] min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[var(--ink-line-strong)] bg-[var(--ink-850)] shadow-[0_40px_90px_-45px_rgba(6,10,20,0.6)]"
        role="img"
        aria-label={`Illustration: ${engine.name} answers "${scene.question}" ${
          after ? "naming your brand first" : "naming only rival brands"
        }`}
      >
        <div className="flex items-center gap-2.5 px-5 py-3.5 text-[14px] font-medium text-[var(--paper)]" aria-hidden="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={engine.id}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <EngineMark id={engine.id} />
              {engine.name}
            </motion.span>
          </AnimatePresence>
          <span className="text-[var(--paper-muted)]">·</span>
          <span className="font-normal text-[var(--paper-muted)]">New chat</span>
        </div>

        {/* the conversation column, kept clear of the score card on wide screens */}
        <div className="flex min-h-0 flex-1 flex-col px-5 pb-4 lg:pr-[17.5rem]" aria-hidden="true">
          <div className="flex-1 space-y-5 pt-2">
            <AnimatePresence initial={false}>
              {sent ? (
                <motion.div
                  key={`${scene.engine}-q`}
                  className="flex justify-end"
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <p className="max-w-[85%] rounded-3xl bg-[var(--ink-800)] px-4 py-2.5 text-[14.5px] leading-relaxed text-[var(--paper)]">
                    {scene.question}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {sent ? (
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center text-[var(--paper)]">
                  <EngineMark id={engine.id} className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0 flex-1 text-[14.5px] leading-[1.65] text-[var(--paper-soft)]">
                  {answering ? (
                    <motion.p
                      className="flex items-center gap-2 text-[var(--paper-muted)]"
                      animate={{ opacity: [0.45, 1, 0.45] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {scene.engine === "chatgpt" || scene.engine === "perplexity" ? (
                        <Globe className="h-3.5 w-3.5" />
                      ) : null}
                      {scene.working}
                    </motion.p>
                  ) : null}

                  {answered ? <p>{still ? scene.lead : leadWords.slice(0, words).join(" ")}</p> : null}

                  {complete ? (
                    <ol className="relative mt-2 space-y-1.5">
                      <AnimatePresence initial={false} mode="popLayout">
                        {items.map((item, i) => (
                          <motion.li
                            key={`${scene.engine}-${item.key}`}
                            layout={!reduced}
                            initial={reduced ? false : { opacity: 0, y: item.key === "brand" ? -8 : 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: reduced ? 0 : 0.45, ease: EASE, delay: reduced ? 0 : i * 0.08 }}
                            className="flex gap-2"
                          >
                            <span className="w-4 shrink-0 tabular-nums text-[var(--paper-muted)]">{i + 1}.</span>
                            <span className="min-w-0">
                              <strong
                                className={cn(
                                  "font-semibold text-[var(--paper)]",
                                  item.key === "brand" && "rounded-[3px] bg-[var(--mint-dim)] px-1 shadow-[inset_0_-2px_0_var(--mint)]",
                                )}
                              >
                                {item.name}
                              </strong>{" "}
                              {item.note}
                              <Cite n={item.cite} />
                            </span>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ol>
                  ) : null}

                  {complete ? (
                    <motion.div
                      key={`${scene.engine}-${view}-src`}
                      className="mt-3 flex flex-wrap gap-1.5"
                      initial={reduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.35, delay: reduced ? 0 : 0.3 }}
                    >
                      {cites.map((src, i) => (
                        <span
                          key={src}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--ink-line)] bg-[var(--ink-900)] py-1 pl-1 pr-2.5 text-[12.5px] text-[var(--paper-soft)]"
                        >
                          <span
                            className={cn(
                              "grid h-4 w-4 place-items-center rounded-full text-[9.5px] font-semibold",
                              after ? "bg-[var(--mint)] text-[var(--ink-950)]" : "bg-[var(--ink-800)] text-[var(--paper-soft)]",
                            )}
                          >
                            {i + 1}
                          </span>
                          {src}
                        </span>
                      ))}
                    </motion.div>
                  ) : null}

                  {complete ? (
                    <div className="mt-3 flex gap-3 text-[var(--paper-muted)]">
                      {[Copy, ThumbsUp, ThumbsDown, RefreshCw].map((Icon, i) => (
                        <Icon key={i} className="h-3.5 w-3.5" />
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          {/* the composer: the question types here first, then it is sent */}
          <div className="mt-4 flex items-center gap-3 rounded-[1.4rem] border border-[var(--ink-line-strong)] bg-[var(--ink-900)] py-2 pl-3 pr-2">
            <Plus className="h-4 w-4 shrink-0 text-[var(--paper-muted)]" />
            <span className="min-w-0 flex-1 truncate text-[14.5px]">
              {!sent && typed > 0 ? (
                <span className="text-[var(--paper)]">
                  {scene.question.slice(0, typed)}
                  <span className="mk-caret ml-0.5 !bg-[var(--paper)]" />
                </span>
              ) : (
                <span className="text-[var(--paper-muted)]">{scene.placeholder}</span>
              )}
            </span>
            <span
              className={cn(
                "grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors",
                !sent && typed > 0 ? "bg-[var(--paper)] text-[var(--ink-950)]" : "bg-[var(--ink-800)] text-[var(--paper-muted)]",
              )}
            >
              <ArrowUp className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>

      {/* Optimizer360's read of the answer: the prompt's visibility, floating over the chat's corner */}
      <div className="relative z-10 mt-3 w-full rounded-xl border border-[var(--ink-line-strong)] bg-[var(--ink-950)] p-4 shadow-[0_24px_60px_-28px_rgba(6,10,20,0.7)] lg:absolute lg:right-4 lg:top-16 lg:mt-0 lg:w-[16rem]">
        <div className="flex items-center gap-2 text-[13px] font-medium text-[var(--paper)]">
          <AnswerGlyph className="h-5 w-5 text-[var(--paper-soft)]" />
          Optimizer360
        </div>
        <div
          className="mt-3 flex rounded-lg border border-[var(--ink-line)] bg-[var(--ink-900)] p-0.5"
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
                "relative h-8 flex-1 rounded-md text-[13px] font-medium transition-colors",
                view === v ? "text-[var(--paper)]" : "text-[var(--paper-muted)] hover:text-[var(--paper-soft)]",
              )}
            >
              {view === v ? (
                <motion.span
                  layoutId="hero-view-pill"
                  className="absolute inset-0 rounded-md border border-[var(--ink-line-strong)] bg-[var(--ink-850)]"
                  transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
                />
              ) : null}
              <span className="relative">{v === "before" ? "Before GEO" : "After GEO"}</span>
            </button>
          ))}
        </div>

        <p className="mt-4 text-[12.5px] text-[var(--paper-muted)]">AI visibility for this prompt</p>
        <p className="font-serif-display mt-1 text-[3.25rem] leading-none tabular-nums text-[var(--paper)]">
          {scoreText}
          <span className="text-[0.45em] text-[var(--paper-muted)]">%</span>
        </p>
        <p className={cn("mt-2 text-[13px]", after ? "text-[var(--mint)]" : "text-[var(--amber)]")}>
          {after ? (
            <>
              Named first, up from <span className="line-through opacity-70">{BASELINE}%</span>
            </>
          ) : (
            "Your brand is not in the answer"
          )}
        </p>

        {/* the line draws left to right by a clip wipe (a path-length dash breaks on a non-scaling stroke) */}
        <div className="relative mt-3 h-10 w-full" aria-hidden="true">
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
            transition={{ duration: reduced ? 0 : 1.4, ease: EASE, delay: after && !manual ? 0.3 : 0 }}
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
        <p className="mt-2 text-[12px] text-[var(--paper-muted)]">8 weekly checks · brand names are fictional</p>
      </div>
    </div>
  );
}

