"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "motion/react";
import { Check, Star } from "lucide-react";
import desktopBg from "../../../public/images/hero/desktopbg-hq.jpg";
import mobileBg from "../../../public/images/hero/mobilebg-hq.jpg";
import { HeroAtmosphere } from "./hero-atmosphere";
import { BookingBar } from "./hero-booking";
import { HeroDock } from "./hero-dock";
import { RevealLines } from "@/components/ui/reveal";
import { heroContent } from "@/data/home";
import { DESKTOP_FX } from "@/hooks/use-media";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ALT =
  "Aerial view of white 4x4 Land Cruisers dune bashing across orange desert dunes, with tyre tracks swirling through the sand";

/**
 * Art-directed plate: the red dune ridge below 768px, the full aerial convoy shot from 768px up.
 * Plain <img> at scale 1 (object-cover); `hero-img-pos` carries the object-position tuned for the composition.
 */
function Plate() {
  // `cover` renders the artwork wider than the viewport on tall screens, so ask for the width it will really be drawn at
  const common = { alt: ALT, quality: 90, priority: true } as const;
  const desktopSizes = "max(100vw, 150vh)"; // 3:2 artwork
  const mobileSizes = "max(100vw, 77.6vh)"; // 735:947 artwork
  const { props: d } = getImageProps({ ...common, src: desktopBg, sizes: desktopSizes });
  const { props } = getImageProps({ ...common, src: mobileBg, sizes: mobileSizes });
  // next/image's inline style (colour: transparent, object-fit) is replaced by our own classes
  const { srcSet: mobileSet, style: _style, ...img } = props;
  void _style;
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={d.srcSet} sizes={desktopSizes} />
      <img
        {...img}
        srcSet={mobileSet}
        alt={ALT}
        className="hero-img hero-img-pos absolute inset-0 size-full object-cover max-md:[object-position:50%_72%]"
      />
    </picture>
  );
}

const enter = (delay: number, reduce: boolean | null) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
      };

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { popular, trust, eyebrow, subtext } = heroContent;

  // Light parallax (desktop, fine pointer, no reduced motion): the photo lags the page, the headline drifts up faster.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${DESKTOP_FX} and (prefers-reduced-motion: no-preference)`, () => {
        const h = () => root.current?.clientHeight ?? 800;
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true };
        gsap.to("[data-parallax]", { y: () => h() * 0.12, ease: "none", scrollTrigger: st });
        gsap.to("[data-layer=headline]", { y: () => -h() * 0.1, ease: "none", scrollTrigger: st });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="hero"
      ref={root}
      className="hero-root relative isolate overflow-hidden bg-ink-950 text-white [container-type:size]"
    >
      {/* 1 · The photograph, scale 1 */}
      <div data-parallax className="absolute inset-0 -z-30 will-change-transform">
        <Plate />
      </div>

      {/* 2 · Light grade only: a little weight at the top for the nav + copy, 30% ink at the bottom for the bar */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-20 h-[56%] [background:linear-gradient(to_bottom,rgb(10_22_38/0.56),rgb(10_22_38/0.44)_34%,rgb(10_22_38/0.26)_68%,transparent)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-20 h-[38%] [background:linear-gradient(to_top,rgb(20_17_15/0.78),rgb(20_17_15/0.4)_55%,transparent)] md:h-[30%] md:[background:linear-gradient(to_top,rgb(20_17_15/0.7),transparent)]"
      />

      {/* 3 · Phones: light sweep + blowing sand over the clear dune ridge */}
      <HeroAtmosphere />

      {/* 4 · Content */}
      <div className="hero-geo container-x pointer-events-none absolute inset-0 z-10 flex flex-col pb-3 md:pb-6">
        <div
          data-layer="headline"
          className="pt-[calc(4.5rem+clamp(12px,2.6vh,32px))] will-change-transform lg:pt-[calc(5rem+clamp(12px,2.6vh,32px))]"
        >
          <div className="hero-shift-h1 pointer-events-auto w-fit max-w-full">
            <motion.p
              data-hero-item="eyebrow"
              data-hero-text
              {...enter(0.45, reduce)}
              className="hero-hide-700 hero-hide-520 mb-4 inline-flex h-9 items-center gap-2.5 rounded-full border border-white/20 bg-[rgb(10_20_34/0.4)] px-4 text-[13px] font-medium text-white backdrop-blur-md"
            >
              <span aria-hidden className="size-2 rounded-full bg-ember-400 shadow-[0_0_0_4px_rgb(240_138_60/0.25)]" />
              {eyebrow}
            </motion.p>

            <h1
              data-hero-item="headline"
              data-hero-text
              className="hero-h1 text-white [filter:drop-shadow(0_2px_16px_rgb(10_30_60/0.5))]"
            >
              {/* phones: 3 lines */}
              <RevealLines
                className="md:hidden"
                delay={0.6}
                lines={[
                  "Your Dubai",
                  <span key="a">
                    Desert <em className="text-[#FFA24D] italic">Adventure</em>
                  </span>,
                  "Starts Here.",
                ]}
              />
              {/* tablet + desktop: 2 lines */}
              <RevealLines
                className="hidden md:block"
                delay={0.6}
                lines={[
                  "Your Dubai Desert",
                  <span key="b">
                    <em className="text-[#FFA24D] italic">Adventure</em> Starts Here.
                  </span>,
                ]}
              />
            </h1>
          </div>

          <div className="hero-shift-sub hero-hide-700 hero-hide-520 pointer-events-auto mt-4 hidden w-fit max-w-full flex-col gap-2 rounded-2xl border border-white/15 bg-[rgb(10_20_34/0.42)] px-4 py-3 backdrop-blur-md max-md:flex lg:flex">
            <motion.p
              data-hero-item="subtext"
              data-hero-text
              {...enter(0.95, reduce)}
              className="hero-hide-700 hidden max-w-[30rem] text-[1.0625rem] leading-snug text-white max-md:block xl:block xl:max-w-none xl:text-[1.125rem]"
            >
              {subtext}
            </motion.p>

            <motion.ul
              data-hero-item="ticks"
              data-hero-text
              {...enter(1.05, reduce)}
              className="hero-hide-520 hidden items-center gap-x-5 whitespace-nowrap text-[0.9375rem] font-medium text-white lg:flex"
            >
              {trust.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check aria-hidden className="size-4 text-ember-400" strokeWidth={3} />
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>

        <div className="min-h-4 flex-1" />

        {/* ≥1024px: popular tag + glass booking bar */}
        <div className="hidden flex-col items-end gap-3 lg:flex">
          <motion.div
            data-hero-item="popular"
            initial={reduce ? false : { scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 1.45 }}
            className="pointer-events-auto origin-bottom-right"
          >
            <Link
              href={popular.href}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-white/20 bg-[rgb(15_12_10/0.55)] px-4 text-[13px] font-medium text-white backdrop-blur-xl transition-colors hover:bg-[rgb(15_12_10/0.7)]"
            >
              <Star aria-hidden className="size-3.5 fill-ember-400 text-ember-400" />
              Popular · {popular.title}
            </Link>
          </motion.div>
          <BookingBar />
        </div>

        {/* <1024px: ticks marquee (phones) + glass dock */}
        <HeroDock />
      </div>
    </section>
  );
}
