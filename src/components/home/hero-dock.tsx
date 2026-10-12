"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Flame } from "lucide-react";
import { ChatButton } from "@/components/ui/chat-button";
import { heroContent } from "@/data/home";

const chips = [
  { label: "Desert Safari", href: "/desert-safari" },
  { label: "Dune Buggy", href: "/dune-buggy-bike" },
  { label: "City Tours", href: "/city-tours" },
  { label: "Yachts", href: "/yacht-tours" },
  { label: "Dhow Cruise", href: "/dhow-cruise" },
  { label: "Attractions", href: "/attraction-tickets" },
];

/** <1024px: thin ticks marquee (phones only) above a glass dock — 3 rows on phones, 2 rows on tablets. */
export function HeroDock() {
  const reduce = useReducedMotion();
  const { popular, trust } = heroContent;
  const ticks = (
    <>
      {[0, 1].map((n) =>
        trust.map((t) => (
          <span key={`${n}-${t}`} className="mr-8 flex shrink-0 items-center gap-2 whitespace-nowrap">
            <Check aria-hidden className="size-3.5 text-ember-400" strokeWidth={3} />
            {t}
          </span>
        )),
      )}
    </>
  );

  return (
    <div className="pointer-events-auto absolute inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom))] box-border flex max-w-[calc(100vw-24px)] flex-col gap-2 md:inset-x-6 lg:hidden">
      {/* ticks marquee — phones only, hidden on short screens */}
      <motion.div
        data-hero-item="marquee"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="hero-hide-700 flex h-6 items-center overflow-hidden text-[13px] font-medium text-white [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] md:hidden"
      >
        <span className="sr-only">{trust.join(" · ")}</span>
        <div aria-hidden className="hero-marquee-track flex w-max shrink-0">
          {ticks}
        </div>
        <div aria-hidden className="hero-marquee-track flex w-max shrink-0">
          {ticks}
        </div>
      </motion.div>

      <motion.div
        data-hero-item="dock"
        aria-label="Book the most popular tour"
        role="group"
        initial={reduce ? false : { y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 130, damping: 19, mass: 0.9, delay: 1.0 }}
        className="box-border grid w-full min-w-0 gap-3 rounded-3xl border border-white/15 bg-[rgb(15_12_10/0.55)] p-[14px] backdrop-blur-2xl [grid-template-areas:'info'_'chips'_'cta'] md:grid-cols-[1fr_auto] md:items-center md:gap-x-5 md:[grid-template-areas:'info_cta'_'chips_chips']"
      >
        {/* Row 1 — title + price, Popular badge top-right */}
        <div className="flex min-w-0 items-start justify-between gap-3 [grid-area:info] md:justify-start md:gap-5">
          <div className="min-w-0">
            <p className="font-display text-[1.65rem] leading-[1.05] text-white">{popular.title}</p>
            <p className="mt-1.5 text-[13px] text-white [font-variant-numeric:tabular-nums]">
              from{" "}
              <span className="font-display text-xl">
                <span className="mr-1 font-sans text-xs font-medium text-ember-400">AED</span>
                {popular.fromAed}
              </span>{" "}
              · Pay on arrival
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium tracking-wide text-white">
            <Flame aria-hidden className="size-3" /> Popular
          </span>
        </div>

        {/* Row 2 — category chips: scroll sideways, fade on the right edge */}
        <ul className="hero-hide-520 scrollbar-none flex min-w-0 snap-x snap-mandatory gap-2 overflow-x-auto [grid-area:chips] [mask-image:linear-gradient(to_right,black_85%,transparent)]">
          {chips.map((c) => (
            <li key={c.label} className="shrink-0 snap-start">
              <Link
                href={c.href}
                className="flex h-9 shrink-0 items-center whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-3.5 text-[13px] font-medium text-white transition-colors hover:bg-white/20"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Row 3 — Book + chat */}
        <div className="grid min-w-0 grid-cols-[1fr_auto] gap-2.5 [grid-area:cta] md:w-80">
          <Link
            href={popular.href}
            className="group flex h-[52px] w-full min-w-0 items-center justify-between rounded-full bg-red-500 pl-5 pr-2 text-base font-medium text-white shadow-glow transition-colors hover:bg-red-600 max-[340px]:h-12 max-[340px]:text-[15px]"
          >
            <span className="truncate">Book now</span>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sand-50 text-red-500">
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
          <ChatButton
            variant="glass"
            message={`Hi! I'd like to book the ${popular.title}.`}
            className="size-[52px] max-[340px]:size-12"
          />
        </div>
      </motion.div>
    </div>
  );
}
