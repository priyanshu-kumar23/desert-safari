"use client";

import { MotionConfig } from "motion/react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", duration: 0.6, bounce: 0.15 }}>
      {children}
    </MotionConfig>
  );
}
