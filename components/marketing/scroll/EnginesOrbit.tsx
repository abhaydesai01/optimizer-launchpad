"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EngineParticles } from "@/components/marketing/scroll/EngineParticles";
import { ENGINES, loadGlyph, type EngineInfo } from "@/components/marketing/scroll/engineMarks";

const N = ENGINES.length;
const EASE = [0.22, 1, 0.36, 1] as const;

/** Each engine holds for the first part of its slot, then morphs into the next. */
function holdThenMorph(e: number) {
  const base = Math.min(Math.floor(e), N - 1);
  const frac = e - base;
  const m = Math.min(1, Math.max(0, (frac - 0.45) / 0.55));
  return Math.min(N - 1, base + m);
}

/** Data URL of the engine's white glyph, for use as a CSS mask so it can take any colour. */
function useGlyphUrl(engine: EngineInfo) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    loadGlyph(engine).then((canvas) => {
      if (alive) setUrl(canvas.toDataURL());
    });
    return () => {
      alive = false;
    };
  }, [engine]);
  return url;
}

function Glyph({ url, color, className = "" }: { url: string | null; color: string; className?: string }) {
  if (!url) return null;
  return (
    <span
      aria-hidden="true"
      className={`block ${className}`}
      style={{
        backgroundColor: color,
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

function OrbitCard({ engine, index, position }: { engine: EngineInfo; index: number; position: MotionValue<number> }) {
  const url = useGlyphUrl(engine);
  // front of the ring is the bottom of the tilted ellipse (angle 90°)
  const angle = useTransform(position, (p) => ((90 + (index - p) * (360 / N)) * Math.PI) / 180);
  const depth = useTransform(angle, (a) => Math.sin(a));
  const left = useTransform(angle, (a) => `${50 + Math.cos(a) * 44}%`);
  const top = useTransform(angle, (a) => `${56 + Math.sin(a) * 25}%`);
  const scale = useTransform(depth, (d) => 0.62 + ((d + 1) / 2) * 0.5);
  const opacity = useTransform(depth, (d) => 0.28 + ((d + 1) / 2) * 0.72);
  const zIndex = useTransform(depth, (d) => (d > 0 ? 30 + Math.round(d * 10) : 5));
  const front = useTransform(depth, (d) => Math.min(1, Math.max(0, (d - 0.8) / 0.2)));
  const rotateY = useTransform(front, (f) => (1 - f) * 180);
  const labelOpacity = useTransform(depth, (d) => Math.max(0, d));

  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{ left, top, scale, opacity, zIndex, x: "-50%", y: "-50%", perspective: 700 }}
    >
      <motion.div
        className="relative h-20 w-20 sm:h-24 sm:w-24"
        style={{ rotateY, transformStyle: "preserve-3d" }}
      >
        {/* front face: the engine the core is tracing */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl border border-[var(--mint)] bg-[rgba(10,16,32,0.94)] shadow-[0_18px_50px_rgba(0,0,0,0.55),0_0_0_4px_rgba(60,232,180,0.08)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Glyph url={url} color="var(--mint)" className="h-[52%] w-[52%]" />
        </div>
        {/* back face: the logo travelling the ring */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl border border-[var(--ink-line-strong)] bg-[rgba(13,21,38,0.92)]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Glyph url={url} color="var(--paper-soft)" className="h-[48%] w-[48%]" />
        </div>
      </motion.div>
      <motion.span
        style={{ opacity: labelOpacity }}
        className="mt-2 whitespace-nowrap text-[13px] font-medium text-[var(--paper-soft)]"
      >
        {engine.name}
      </motion.span>
    </motion.div>
  );
}

function StepBar({ position, index }: { position: MotionValue<number>; index: number }) {
  const scaleX = useTransform(position, (p) => Math.min(1, Math.max(0, p - index + 1)));
  return (
    <span className="block h-px w-full overflow-hidden bg-[var(--ink-line-strong)]">
      <motion.span className="block h-full origin-left bg-[var(--mint)]" style={{ scaleX }} />
    </span>
  );
}

export function EnginesOrbit() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const shape = useTransform(scrollYProgress, [0, 0.1], [0, 1], { clamp: true });
  const position = useTransform(scrollYProgress, (p) => {
    const e = Math.min(1, Math.max(0, (p - 0.1) / 0.86)) * (N - 1 + 0.45);
    return holdThenMorph(e);
  });

  const [active, setActive] = useState(0);
  useMotionValueEvent(position, "change", (p) => setActive(Math.min(N - 1, Math.round(p))));
  const engine = ENGINES[active];

  return (
    <section
      ref={ref}
      id="engines"
      className="theme-ink relative bg-[var(--ink-950)] text-[var(--paper)]"
      style={{ height: `${N * 90 + 100}vh` }}
      aria-labelledby="engines-heading"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-clip pb-6 pt-[108px]">
        <div className="mk-wrap grid items-center gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <div className="order-2 lg:order-1">
            <h2 id="engines-heading" className="font-serif-display text-[clamp(1.8rem,2.6vw,2.9rem)] leading-[1.06] text-[var(--paper)]">
              Every engine your buyers ask. Tracked the same way, every week.
            </h2>

            <div className="mt-6 min-h-[170px] sm:mt-8 sm:min-h-[250px]" aria-live="polite">
              <p className="flex items-center gap-3 text-[12px] tabular-nums text-[var(--paper-muted)]">
                {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                <span className="h-px w-8 bg-[var(--ink-line-strong)]" aria-hidden="true" />
                {engine.maker}
              </p>
              {/* the engine's name rises out of its line as the orbit brings it to the front */}
              <p className="font-serif-display relative mt-3 h-[1.15em] overflow-hidden text-4xl leading-[1.15] text-[var(--mint)] sm:text-5xl">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                    key={engine.id}
                    className="block"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    {engine.name}
                  </motion.span>
                </AnimatePresence>
              </p>
              <motion.p
                key={engine.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4 max-w-md text-[16px] leading-relaxed text-[var(--paper-soft)]"
              >
                {engine.how}
              </motion.p>
              <motion.ul
                key={`${engine.id}-tracks`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-5 hidden max-w-md grid-cols-2 gap-x-4 gap-y-2 sm:grid"
              >
                {engine.tracks.map((item) => (
                  <li key={item} className="flex gap-2 text-[14px] text-[var(--paper-soft)]">
                    <span className="mt-2 h-px w-3 shrink-0 bg-[var(--mint)]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </motion.ul>
            </div>

            <div className="mt-6 grid max-w-md gap-2" style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }} aria-hidden="true">
              {ENGINES.map((item, index) => (
                <div key={item.id}>
                  <StepBar position={position} index={index} />
                  <span
                    className={`mt-2 block text-[12px] leading-tight ${
                      index === active ? "text-[var(--paper)]" : "text-[var(--paper-muted)]"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            <Link href="/engines" className="mk-btn mk-btn-ghost mt-8">
              Full engine coverage
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="relative order-1 mx-auto aspect-square w-full max-w-[min(600px,62vh)] lg:order-2">
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
              <ellipse cx="50" cy="56" rx="44" ry="25" fill="none" stroke="var(--ink-line-strong)" strokeWidth="0.25" strokeDasharray="0.8 1.2" />
            </svg>
            <EngineParticles shape={shape} position={position} className="absolute bottom-[30%] left-[20%] right-[20%] top-[10%] z-10" />
            {ENGINES.map((item, index) => (
              <OrbitCard key={item.id} engine={item} index={index} position={position} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
