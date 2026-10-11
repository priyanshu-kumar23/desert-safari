"use client";

import { useSyncExternalStore } from "react";

/** SSR-safe media query hook (returns `false` on the server). */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Large screens with a precise pointer — gate for pinning, parallax, tilt, cursor effects. */
export const DESKTOP_FX = "(min-width: 1024px) and (pointer: fine)";
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
