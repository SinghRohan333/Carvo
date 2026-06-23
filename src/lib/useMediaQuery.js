"use client";

import { useEffect, useState } from "react";

/**
 * Shared responsive hook — avoids unreliable Tailwind hidden/lg: classes.
 * Usage: const isDesktop = useMediaQuery("(min-width: 1024px)");
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);
    setMounted(true);

    const listener = (event) => setMatches(event.matches);
    mediaQueryList.addEventListener("change", listener);

    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  // Returns false until mounted to avoid hydration mismatch
  return mounted ? matches : false;
}
