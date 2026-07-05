"use client";

import { useEffect } from "react";

/**
 * Global cursor-tracking glow for .mk-card elements.
 * One delegated listener instead of per-card handlers.
 */
export function CardGlow() {
  useEffect(() => {
    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const card = (event.target as Element | null)?.closest?.(".mk-card");
        if (!(card instanceof HTMLElement)) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
