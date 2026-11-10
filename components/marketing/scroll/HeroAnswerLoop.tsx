"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { ENGINES, loadGlyph, type EngineId } from "@/components/marketing/scroll/engineMarks";

type Scene = {
  engine: EngineId;
  question: string;
  lead: string;
  reason: string;
  score: number;
};

const SCENES: Scene[] = [
  {
    engine: "chatgpt",
    question: "Which hospital should I trust for cardiac surgery?",
    lead: "Based on surgeon credentials and published outcomes, the most recommended are",
    reason: "verified credentials, published outcomes",
    score: 61,
  },
  {
    engine: "perplexity",
    question: "Which private bank is best for wealth management?",
    lead: "For high-net-worth clients, sources most often point to",
    reason: "transparent fees, regulatory standing",
    score: 54,
  },
  {
    engine: "gemini",
    question: "Which developer should I buy an apartment from?",
    lead: "For delivery record and legal clarity, the names that surface are",
    reason: "RERA compliance, on-time delivery",
    score: 58,
  },
  {
    engine: "claude",
    question: "Which business school should I shortlist?",
    lead: "Considering accreditation and placements, answers converge on",
    reason: "accreditation, placement transparency",
    score: 66,
  },
];

type Phase = "typing" | "thinking" | "streaming" | "before" | "after" | "leaving";

const EASE = [0.22, 1, 0.36, 1] as const;

function EngineMark({ id }: { id: EngineId }) {
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
      className="block h-4 w-4 bg-[var(--paper)]"
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

export function HeroAnswerLoop() {
  const reduced = useReducedMotion();
  const [sceneIndex, setSceneIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState(0);
  const [words, setWords] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const scene = SCENES[sceneIndex];
  const engine = ENGINES.find((e) => e.id === scene.engine)!;
  const leadWords = scene.lead.split(" ");

  const score = useMotionValue(4);
  const [scoreText, setScoreText] = useState(4);
  useMotionValueEvent(score, "change", (v) => setScoreText(Math.round(v)));

  // the loop: type → think → stream → show the gap → brand appears → next engine
  useEffect(() => {
    if (reduced) return;
    const next = (fn: () => void, ms: number) => {
      timer.current = setTimeout(fn, ms);
    };
    if (phase === "typing") {
      if (typed < scene.question.length) next(() => setTyped((n) => n + 1), 24);
      else next(() => setPhase("thinking"), 400);
    } else if (phase === "thinking") {
      next(() => setPhase("streaming"), 1000);
    } else if (phase === "streaming") {
      if (words < leadWords.length) next(() => setWords((n) => n + 1), 45);
      else next(() => setPhase("before"), 350);
    } else if (phase === "before") {
      next(() => setPhase("after"), 2400);
    } else if (phase === "after") {
      next(() => setPhase("leaving"), 3800);
    } else if (phase === "leaving") {
      next(() => {
        setSceneIndex((i) => (i + 1) % SCENES.length);
        setTyped(0);
        setWords(0);
        setPhase("typing");
      }, 500);
    }
    return () => clearTimeout(timer.current);
  }, [phase, typed, words, scene.question.length, leadWords.length, reduced]);

  // score follows the phase
  useEffect(() => {
    if (reduced) {
      score.set(scene.score);
      return;
    }
    if (phase === "after") {
      const controls = animate(score, scene.score, { duration: 1.6, ease: EASE, delay: 0.35 });
      return () => controls.stop();
    }
    if (phase === "typing") score.set(4);
  }, [phase, scene.score, score, reduced]);

  const showAnswer = reduced || ["streaming", "before", "after", "leaving"].includes(phase);
  const complete = reduced || ["before", "after", "leaving"].includes(phase);
  const after = reduced || phase === "after" || phase === "leaving";
  const ranked = after ? ["brand", "a", "b"] : ["a", "b"];

  return (
    <div
      className="relative rounded-2xl bg-gradient-to-b from-[rgba(148,163,196,0.28)] via-[rgba(148,163,196,0.08)] to-[rgba(60,232,180,0.18)] p-px shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)]"
      role="img"
      aria-label="Illustration: an AI engine answers a buyer question naming only competitors, then, after GEO work, recommends your brand first"
    >
      <div className="overflow-hidden rounded-[15px] bg-[rgba(9,14,28,0.94)] backdrop-blur-xl">
        {/* header */}
        <div className="flex items-center justify-between border-b border-[var(--ink-line)] px-5 py-3.5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={engine.id}
              className="flex items-center gap-2.5"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--ink-line-strong)] bg-[var(--ink-850)]">
                <EngineMark id={engine.id} />
              </span>
              <span className="text-[13px] font-medium text-[var(--paper)]">{engine.name}</span>
            </motion.div>
          </AnimatePresence>
          <motion.span
            layout
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors duration-500 ${
              after
                ? "bg-[var(--mint-dim)] text-[var(--mint)] ring-1 ring-inset ring-[rgba(60,232,180,0.35)]"
                : "bg-[var(--amber-dim)] text-[var(--amber)] ring-1 ring-inset ring-[rgba(227,178,105,0.3)]"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${after ? "bg-[var(--mint)]" : "bg-[var(--amber)]"}`} />
            {after ? "After GEO" : "Today"}
          </motion.span>
        </div>

        <motion.div
          className="min-h-[340px] space-y-4 p-5 sm:p-6"
          animate={{ opacity: phase === "leaving" ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* question */}
          <div className="flex justify-end">
            <p className="max-w-[88%] rounded-2xl rounded-br-md bg-[var(--ink-800)] px-4 py-2.5 text-[13.5px] leading-relaxed text-[var(--paper)]">
              {reduced ? scene.question : scene.question.slice(0, typed)}
              {!reduced && phase === "typing" ? <span className="mk-caret ml-0.5" /> : null}
            </p>
          </div>

          {/* thinking */}
          <AnimatePresence>
            {!reduced && phase === "thinking" ? (
              <motion.div
                className="flex items-center gap-1.5 px-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                aria-hidden="true"
              >
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    className="h-1.5 w-1.5 rounded-full bg-[var(--paper-muted)]"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15 }}
                  />
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* answer */}
          {showAnswer ? (
            <motion.div
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="rounded-2xl rounded-tl-md border border-[var(--ink-line)] bg-[var(--ink-900)] px-4 py-3.5"
            >
              <p className="text-[13.5px] leading-relaxed text-[var(--paper-soft)]">
                {reduced ? scene.lead : leadWords.slice(0, words).join(" ")}
              </p>
              {complete ? (
                <motion.ol layout className="mt-3 space-y-2 text-[13px]">
                  <AnimatePresence initial={false}>
                    {ranked.map((key, i) => (
                      <motion.li
                        key={key}
                        layout
                        initial={{ opacity: 0, x: key === "brand" ? -14 : 0, scale: key === "brand" ? 0.96 : 1 }}
                        animate={{ opacity: key === "brand" || !after ? 1 : 0.5, x: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="flex items-center gap-2.5"
                      >
                        <span className="w-4 tabular-nums text-[var(--paper-muted)]">{i + 1}.</span>
                        {key === "brand" ? (
                          <>
                            <span className="rounded-full bg-[var(--mint)] px-2.5 py-0.5 font-medium text-[var(--ink-950)]">
                              Your brand
                            </span>
                            <span className="truncate text-[12px] text-[var(--paper-muted)]">{scene.reason}</span>
                          </>
                        ) : (
                          <span className="rounded-full border border-[var(--ink-line-strong)] px-2.5 py-0.5 text-[var(--paper-soft)]">
                            Competitor {key.toUpperCase()}
                          </span>
                        )}
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ol>
              ) : null}
              <AnimatePresence>
                {complete && !after ? (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="overflow-hidden text-[13px] text-[var(--amber)]"
                  >
                    <span className="mt-3 block border-t border-dashed border-[var(--ink-line-strong)] pt-3">
                      Your brand is not in the answer.
                    </span>
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </motion.div>
          ) : null}

          {/* visibility score */}
          <motion.div layout className="pt-1">
            <div className="flex items-baseline justify-between text-[12px] text-[var(--paper-muted)]">
              <span>AI visibility for this prompt</span>
              <span className="font-serif-display text-2xl tabular-nums text-[var(--paper)]">{scoreText}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--ink-800)]">
              <motion.div className="h-full rounded-full bg-[var(--mint)]" style={{ width: `${scoreText}%` }} />
            </div>
          </motion.div>
        </motion.div>

        <p className="border-t border-[var(--ink-line)] px-5 py-2.5 text-[11px] text-[var(--paper-muted)]">
          Illustration with example figures.
        </p>
      </div>
    </div>
  );
}
