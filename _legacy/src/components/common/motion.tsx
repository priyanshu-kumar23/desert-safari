import type { Variants } from "motion/react";

export const viewportOnce = { once: true, margin: "-100px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 0.7, bounce: 0.15 },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", duration: 0.6, bounce: 0.2 },
  },
};

export const staggerContainer = (
  stagger = 0.12,
  delayChildren = 0
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const revealMask: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  show: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { type: "spring", duration: 0.8, bounce: 0.1 },
  },
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "100%" },
  show: {
    opacity: 1,
    y: "0%",
    transition: { type: "spring", duration: 0.7, bounce: 0.2 },
  },
};
