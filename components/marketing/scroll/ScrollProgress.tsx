"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin mint line along the top edge showing how far down the page the visitor is. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[var(--mint)]"
      style={{ scaleX }}
    />
  );
}
