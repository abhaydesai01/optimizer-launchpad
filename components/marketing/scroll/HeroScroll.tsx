"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { BeamsBackground } from "@/components/marketing/scroll/BeamsBackground";
import { HeroAnswerLoop } from "@/components/marketing/scroll/HeroAnswerLoop";
import { Button } from "@/components/ui/button";
import { CAL_LINK } from "@/lib/site";

const WORDS = ["recommends.", "cites.", "trusts.", "names first."];
const EASE = [0.22, 1, 0.36, 1] as const;

/** Headline word that cycles in place; every word sits in one grid cell so the line never jumps. */
function CyclingWord() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <span className="relative inline-grid align-bottom">
      {WORDS.map((word) => (
        <span key={word} className="invisible col-start-1 row-start-1" aria-hidden="true">
          {word}
        </span>
      ))}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={WORDS[index]}
          className="col-start-1 row-start-1 text-[var(--mint)]"
          initial={{ y: "60%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-60%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

export function HeroScroll() {
  return (
    <section className="relative flex min-h-screen items-center overflow-clip" aria-labelledby="hero-heading">
      <BeamsBackground />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,10,20,0.35) 0%, rgba(6,10,20,0.15) 40%, var(--ink-950) 100%)",
        }}
      />

      <div className="mk-wrap relative grid items-center gap-12 pb-20 pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-16 lg:pt-32">
        <div>
          <motion.p className="mk-pill" {...rise(0)}>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
            Generative Engine Optimisation
          </motion.p>

          <motion.h1 id="hero-heading" className="mk-h1 mt-6 text-[var(--paper)]" {...rise(0.08)}>
            Be the brand AI <CyclingWord />
          </motion.h1>

          <motion.p className="mk-body mt-7 max-w-xl" {...rise(0.16)}>
            Your buyers now ask ChatGPT, Perplexity and Google AI who to trust,
            and each answer names only a few brands. Optimizer360.ai makes sure
            one of them is you.
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap items-center gap-3" {...rise(0.24)}>
            <Button asChild size="lg">
              <a href={CAL_LINK} target="_blank" rel="noreferrer">
                <CalendarDays aria-hidden="true" />
                Book a demo
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/request-audit">
                Get your AI visibility audit
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
          <HeroAnswerLoop />
        </motion.div>
      </div>
    </section>
  );
}
