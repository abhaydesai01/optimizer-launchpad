"use client";

import { useEffect, useState } from "react";

/** True at the `lg` breakpoint (≥1024px) and up, where sections pin and scrub with scroll. */
export function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return desktop;
}
