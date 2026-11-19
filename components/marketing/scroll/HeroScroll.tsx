"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroDemo } from "@/components/marketing/scroll/HeroAnswerLoop";
import { Button } from "@/components/ui/button";
import { CAL_LINK } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;


/**
 * The first screen: the claim across the top, then the copy and the two actions beside the product
 * window that proves it. From 1024px wide everything ends inside one screen.
 */
export function HeroScroll() {
  const reduced = useReducedMotion();
  // entrance: the two lines rise out of their masks, then the rest settles; nothing waits to be read
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };
  const line = (i: number) =>
    reduced
      ? {}
      : {
          initial: { y: "105%" },
          animate: { y: "0%" },
          transition: { duration: 0.8, delay: 0.05 + i * 0.09, ease: EASE },
        };

  return (
    <section
      className="relative flex flex-col pb-12 pt-32 sm:pt-36 lg:min-h-[100svh] lg:pb-10 lg:pt-[8.5rem]"
      aria-labelledby="hero-heading"
    >
      <div className="mk-wrap flex flex-1 flex-col">
        <h1
          id="hero-heading"
          className="font-serif-display text-[clamp(2.6rem,5.6vw,5.4rem)] leading-[0.98] tracking-[-0.01em] text-[var(--paper)]"
        >
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span className="block" {...line(0)}>
              Ask AI who&apos;s best in your category.
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span className="block" {...line(1)}>
              If it isn&apos;t <span className="mk-mark">you</span>, we fix that.
            </motion.span>
          </span>
        </h1>

        <div className="mt-10 grid flex-1 grid-cols-[minmax(0,1fr)] gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col lg:col-span-4">
            <motion.p className="max-w-md text-[17px] leading-relaxed text-[var(--paper-soft)]" {...rise(0.3)}>
              Buyers now ask ChatGPT, Gemini and Perplexity before they ask anyone else. Each answer names
              two or three brands. We track what the engines say about you and do the work that gets you
              named.
            </motion.p>
            <motion.div className="mt-8 flex flex-wrap items-center gap-3" {...rise(0.38)}>
              <Button asChild size="lg">
                <a href={CAL_LINK} target="_blank" rel="noreferrer">
                  Book a demo
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/request-audit">
                  Request an audit
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </motion.div>

          </div>

          <motion.div
            className="min-h-0 min-w-0 lg:col-span-8"
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, y: 20, scale: 0.985 },
                  animate: { opacity: 1, y: 0, scale: 1 },
                  transition: { duration: 0.9, delay: 0.25, ease: EASE },
                })}
          >
            <HeroDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
