"use client";

import { useEffect } from "react";

/**
 * The home page is several screens of pinned, scroll-driven sections, so a restored scroll
 * position (reload, back/forward, reopened tab) drops visitors mid-story. Always start at the
 * top, unless the URL targets a section (e.g. /#platform).
 */
export function StartAtTop() {
  useEffect(() => {
    if (!("scrollRestoration" in history)) return;
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";
    if (!window.location.hash) window.scrollTo(0, 0);
    return () => {
      history.scrollRestoration = previous;
    };
  }, []);
  return null;
}
