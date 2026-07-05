"use client";

import { useEffect, useRef, useState } from "react";

type Scene = {
  engine: string;
  question: string;
  answerLead: string;
  competitors: [string, string];
  afterLine: string;
};

const SCENES: Scene[] = [
  {
    engine: "ChatGPT",
    question: "Which hospital should I trust for cardiac surgery?",
    answerLead: "Based on credentials and patient outcomes, the most frequently recommended are",
    competitors: ["Competitor A", "Competitor B"],
    afterLine: "cited for verified surgeon credentials and published outcomes.",
  },
  {
    engine: "Perplexity",
    question: "Which private bank is best for wealth management?",
    answerLead: "For high-net-worth clients, sources most often point to",
    competitors: ["Competitor A", "Competitor B"],
    afterLine: "cited for transparent fee structures and regulatory standing.",
  },
  {
    engine: "Google AI Overviews",
    question: "Which jewellery house sells certified heirloom pieces?",
    answerLead: "For certified, investment-grade pieces, buyers are directed to",
    competitors: ["Competitor A", "Competitor B"],
    afterLine: "cited for hallmark certification and provenance records.",
  },
  {
    engine: "Gemini",
    question: "Which developer should I buy an apartment from?",
    answerLead: "For delivery track record and legal clarity, the names that surface are",
    competitors: ["Competitor A", "Competitor B"],
    afterLine: "cited for RERA compliance and on-time delivery history.",
  },
  {
    engine: "Claude",
    question: "Which business school should I shortlist?",
    answerLead: "Considering accreditation and placements, the answers converge on",
    competitors: ["Competitor A", "Competitor B"],
    afterLine: "cited for accreditation, faculty and placement transparency.",
  },
];

type Phase = "typing" | "thinking" | "streaming" | "without" | "with";

export function HeroAnswerDemo() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typedQuestion, setTypedQuestion] = useState("");
  const [streamedWords, setStreamedWords] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const scene = SCENES[sceneIndex];
  const answerWords = scene.answerLead.split(" ");

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);
    const onChange = (event: MediaQueryListEvent) => setReduceMotion(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timers.current.push(id);
    };

    if (phase === "typing") {
      if (typedQuestion.length < scene.question.length) {
        schedule(
          () => setTypedQuestion(scene.question.slice(0, typedQuestion.length + 1)),
          26,
        );
      } else {
        schedule(() => setPhase("thinking"), 350);
      }
    } else if (phase === "thinking") {
      schedule(() => setPhase("streaming"), 950);
    } else if (phase === "streaming") {
      if (streamedWords < answerWords.length) {
        schedule(() => setStreamedWords((count) => count + 1), 46);
      } else {
        schedule(() => setPhase("without"), 500);
      }
    } else if (phase === "without") {
      schedule(() => setPhase("with"), 2400);
    } else if (phase === "with") {
      schedule(() => {
        setSceneIndex((index) => (index + 1) % SCENES.length);
        setPhase("typing");
        setTypedQuestion("");
        setStreamedWords(0);
      }, 3400);
    }

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [phase, typedQuestion, streamedWords, scene.question, answerWords.length, reduceMotion]);

  const showAnswer = phase === "streaming" || phase === "without" || phase === "with";
  const answerComplete = phase === "without" || phase === "with";
  const fixed = reduceMotion;

  return (
    <div
      className={`relative border border-[var(--ink-line-strong)] bg-[rgba(10,16,32,0.92)] backdrop-blur-sm ${
        phase === "with" ? "mk-demo-flash" : ""
      }`}
      role="img"
      aria-label="Illustration of an AI engine answering a buyer's question — first without your brand in the answer, then with your brand cited after GEO work"
    >
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-[var(--ink-line)] px-5 py-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink-800)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink-800)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink-800)]" />
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--paper-muted)]">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              phase === "with" || fixed ? "bg-[var(--mint)]" : "bg-[var(--amber)]"
            }`}
            aria-hidden="true"
          />
          {fixed ? SCENES[0].engine : scene.engine}
        </div>
      </div>

      <div className="min-h-[320px] p-6 sm:p-7">
        {/* question */}
        <div className="flex justify-end">
          <p className="max-w-[85%] rounded-lg rounded-br-none border border-[var(--ink-line-strong)] bg-[var(--ink-800)] px-4 py-2.5 text-[13.5px] leading-relaxed text-[var(--paper)]">
            {fixed ? SCENES[0].question : typedQuestion}
            {!fixed && phase === "typing" ? <span className="mk-caret ml-0.5" /> : null}
          </p>
        </div>

        {/* thinking */}
        {!fixed && phase === "thinking" ? (
          <div className="mt-5 flex items-center gap-1.5 px-1" aria-hidden="true">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--paper-muted)]"
                style={{ animationDelay: `${dot * 180}ms` }}
              />
            ))}
          </div>
        ) : null}

        {/* answer */}
        {showAnswer || fixed ? (
          <div className="mt-5 max-w-[92%] rounded-lg rounded-tl-none border border-[var(--ink-line)] bg-[var(--ink-900)] px-4 py-3.5">
            <p className="text-[13.5px] leading-relaxed text-[var(--paper-soft)]">
              {fixed
                ? SCENES[0].answerLead
                : answerWords.slice(0, streamedWords).join(" ")}
              {answerComplete || fixed ? (
                <>
                  {" "}
                  <span className="mk-pop inline-block rounded-full border border-[var(--ink-line-strong)] px-2.5 py-0.5 text-[12px] text-[var(--paper-soft)]">
                    {scene.competitors[0]}
                  </span>{" "}
                  <span className="text-[var(--paper-muted)]">and</span>{" "}
                  <span
                    className="mk-pop inline-block rounded-full border border-[var(--ink-line-strong)] px-2.5 py-0.5 text-[12px] text-[var(--paper-soft)]"
                    style={{ animationDelay: "140ms" }}
                  >
                    {scene.competitors[1]}
                  </span>
                  .
                </>
              ) : null}
            </p>

            {(answerComplete && phase !== "with") || fixed ? (
              <p className="mk-pop mt-3 border-t border-dashed border-[var(--ink-line-strong)] pt-3 text-[13px] text-[var(--amber)]">
                Your brand — not in the answer.
              </p>
            ) : null}

            {phase === "with" && !fixed ? (
              <p className="mk-pop mt-3 border-t border-[var(--ink-line-strong)] pt-3 text-[13px] leading-relaxed text-[var(--paper-soft)]">
                <span className="inline-block rounded-full border border-[var(--mint)] bg-[var(--mint-dim)] px-2.5 py-0.5 text-[12px] font-medium text-[var(--mint)]">
                  Your brand
                </span>{" "}
                {scene.afterLine}
              </p>
            ) : null}
          </div>
        ) : null}

        {/* state badge */}
        {(answerComplete || fixed) && (
          <div className="mt-5 flex items-center gap-2">
            {phase === "with" && !fixed ? (
              <span className="mk-pop inline-flex items-center gap-1.5 rounded-full border border-[var(--mint)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--mint)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
                After GEO
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--amber)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--amber)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber)]" aria-hidden="true" />
                Today
              </span>
            )}
          </div>
        )}
      </div>

      <p className="border-t border-[var(--ink-line)] px-5 py-2.5 text-[11px] text-[var(--paper-muted)]">
        Illustration. Request an audit to see the real picture for your brand.
      </p>
    </div>
  );
}
