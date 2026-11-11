"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const TEXT =
  "An AI answer isn't a page of ten links. It's a shortlist of three. The brands on it get the call. The rest never find out they were left off.";
const MARK_FROM = "shortlist";
const MARK_LENGTH = 3; // "shortlist of three."

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }}>{word}</motion.span>;
}

/** One big sentence that inks in word by word as it scrolls; the key phrase gets one highlighter stroke. */
export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.6"] });
  const words = TEXT.split(" ");
  const n = words.length;
  const markStart = words.indexOf(MARK_FROM);
  const markEnd = markStart + MARK_LENGTH;

  // the highlighter draws left to right once the phrase has inked in
  const markSize = useTransform(scrollYProgress, [(markStart + 1) / n, (markEnd + 1) / n], ["0% 100%", "100% 100%"]);

  const word = (i: number) => (
    <Word key={i} word={words[i]} progress={scrollYProgress} range={[i / n, Math.min(1, (i + 2) / n)]} />
  );
  const run = (from: number, to: number) =>
    words.slice(from, to).flatMap((_, k) => [word(from + k), k < to - from - 1 ? " " : null]);

  return (
    <section ref={ref} className="border-y border-[var(--ink-line)] bg-[var(--ink-900)] py-28 sm:py-40" aria-label="Why it matters">
      <div className="mk-wrap">
        <p className="font-serif-display max-w-[24ch] text-[clamp(2.2rem,5.6vw,6rem)] leading-[1.05]">
          {run(0, markStart)}{" "}
          <motion.span className="mk-mark" style={{ backgroundSize: markSize }}>
            {run(markStart, markEnd)}
          </motion.span>{" "}
          {run(markEnd, n)}
        </p>
      </div>
    </section>
  );
}
