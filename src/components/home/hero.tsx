"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Flame, MessageCircle } from "lucide-react";
import desktopBg from "../../../public/images/hero/desktopbg.png";
import mobileBg from "../../../public/images/hero/mobilebg.jpg";
import { ConvoyHotspot } from "./hero-hotspot";
import { HeroMeta } from "./hero-meta";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { RevealLines } from "@/components/ui/reveal";
import { heroContent } from "@/data/home";
import { horizonMask } from "@/data/hero-mask";
import { DESKTOP_FX } from "@/hooks/use-media";
import { whatsappLink } from "@/lib/whatsapp";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ALT =
  "Aerial view of white 4x4 Land Cruisers dune bashing across orange desert dunes, with tyre tracks swirling through the sand";

// Dune silhouette (generated from the artwork): everything below the horizon line.
const DUNE_CLIP = `polygon(${horizonMask.map(([x, y]) => `${x}% ${y}%`).join(",")},100% 100%,0% 100%)`;

/**
 * Art-directed plate (<picture>): portrait dune below 768px, the aerial convoy shot from 768px up.
 * From md up the <img> is laid out by `.hero-plate` (cover maths in CSS) so overlays can use image-% coords.
 */
function PlatePicture({ clone = false }: { clone?: boolean }) {
  const common = {
    alt: clone ? "" : ALT,
    quality: 82,
    sizes: "100vw",
    priority: !clone,
    placeholder: clone ? ("empty" as const) : ("blur" as const),
  };
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, src: desktopBg });
  const { props: mobileProps } = getImageProps({ ...common, src: mobileBg });
  // the next/image inline style (blur placeholder, object-fit) would override our CSS-driven layout
  const { srcSet: mobileSet, style: _unused, ...img } = mobileProps;
  void _unused;
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopSet} />
      {/* mobile object-position centre 70% keeps the dune ridge in frame */}
      <img
        {...img}
        srcSet={mobileSet}
        alt={clone ? "" : ALT}
        aria-hidden={clone || undefined}
        style={clone ? { clipPath: DUNE_CLIP } : undefined}
        className="absolute inset-0 size-full object-cover object-[50%_70%] md:hero-plate md:inset-auto md:object-fill"
      />
    </picture>
  );
}

const WORDMARK = ["R", "E", "D", " ", "S", "A", "N", "D"];

const enter = (delay: number, reduce: boolean | null, from: { x?: number; y?: number } = { y: 24 }) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, ...from },
        animate: { opacity: 1, x: 0, y: 0 },
        transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
      };

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { popular, trust, eyebrow } = heroContent;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${DESKTOP_FX} and (prefers-reduced-motion: no-preference)`, () => {
        const h = () => root.current?.clientHeight ?? 800;
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true };
        // plate (+ dune clone + hotspot) travels at 0.3x scroll speed; the wordmark lags half as much,
        // so the letters slide down behind the dunes as you scroll.
        gsap.to("[data-parallax]", { y: () => h() * 0.3, ease: "none", scrollTrigger: st });
        gsap.to("[data-layer=wordmark]", { y: () => h() * 0.14, ease: "none", scrollTrigger: st });
        gsap.to("[data-layer=content]", { y: () => -h() * 0.06, opacity: 0.2, ease: "none", scrollTrigger: st });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  /* ≥1280px: vertical glass card on the open dunes (right) */
  const PopularCard = (
      <motion.aside
        data-hero-item="popular"
        {...enter(1.05, reduce, { x: 48 })}
        aria-label="Popular tour"
        className="pointer-events-auto hidden w-full max-w-[340px] rounded-[var(--radius-card)] border border-white/15 bg-[rgb(20_17_15/0.55)] p-[clamp(14px,2.2vh,22px)] backdrop-blur-xl xl:block xl:w-[340px]"
      >
        <p className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-xs font-medium tracking-wide text-white">
          <Flame aria-hidden className="size-3" /> Popular
        </p>
        <p className="mt-[clamp(8px,1.4vh,14px)] font-display text-3xl leading-none text-white">{popular.title}</p>
        <p className="mt-2 flex items-baseline gap-1.5 text-white [font-variant-numeric:tabular-nums]">
          <span className="text-xs font-medium uppercase tracking-[0.18em]">from</span>
          <span className="font-display text-5xl leading-none">
            <span className="mr-1.5 font-sans text-sm font-medium text-ember-400">AED</span>
            {popular.fromAed}
          </span>
        </p>
        <p className="hero-hide-800 mt-2 text-sm text-white/90">{popular.features.join(" · ")}</p>
        <Link
          href={popular.href}
          className="group mt-[clamp(10px,1.8vh,16px)] flex h-12 items-center justify-between rounded-full bg-red-500 pl-6 pr-1.5 text-[0.95rem] font-medium text-white shadow-glow transition-colors hover:bg-red-600"
        >
          Book now
          <span className="flex size-9 items-center justify-center rounded-full bg-sand-50 text-red-500">
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-rotate-45" />
          </span>
        </Link>
        <p className="mt-2.5 text-center text-sm text-white/80">Pay on arrival</p>
      </motion.aside>
  );

  /* 768–1279px: slim horizontal strip under the CTAs */
  const PopularStrip = (
      <motion.aside
        data-hero-item="popular-strip"
        {...enter(1.05, reduce)}
        aria-label="Popular tour"
        className="pointer-events-auto hidden w-full max-w-[420px] items-center gap-3 rounded-[var(--radius-card)] border border-white/15 bg-[rgb(20_17_15/0.55)] py-2.5 pl-4 pr-2 backdrop-blur-xl md:flex xl:hidden"
      >
        <div className="min-w-0 flex-1 text-white">
          <p className="flex items-baseline gap-2 whitespace-nowrap">
            <Flame aria-hidden className="size-3.5 self-center text-ember-400" />
            <span className="font-display text-2xl leading-none">{popular.title}</span>
            <span className="text-sm [font-variant-numeric:tabular-nums]">from AED {popular.fromAed}</span>
          </p>
          <p className="mt-0.5 text-xs text-white/80">Pay on arrival</p>
        </div>
        <Link
          href={popular.href}
          className="group flex h-11 shrink-0 items-center gap-2 rounded-full bg-red-500 pl-4 pr-1.5 text-[0.9rem] font-medium text-white"
        >
          Book now
          <span className="flex size-8 items-center justify-center rounded-full bg-sand-50 text-red-500">
            <ArrowRight aria-hidden className="size-4" />
          </span>
        </Link>
      </motion.aside>
  );

  return (
    <section
      id="hero"
      ref={root}
      className="relative isolate h-screen h-[100svh] min-h-[560px] overflow-hidden bg-ink-950 text-sand-50 [container-type:size] [@media(max-height:640px)]:min-h-0"
    >
      {/* 1 · Plate: drone-settle + 0.3x parallax */}
      <div data-parallax className="absolute inset-0 -z-40 will-change-transform">
        <div className="animate-settle absolute inset-0">
          <PlatePicture />
          {/* faint tyre tracks, drawn once (md+ only; image-space coordinates) */}
          <svg
            aria-hidden
            viewBox="0 0 1536 1024"
            className="hero-plate pointer-events-none hidden md:block"
            fill="none"
          >
            <defs>
              <mask id="track-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="1536" height="1024">
                <path
                  className="track-mask"
                  pathLength={1}
                  d="M 430 800 C 290 720, 200 560, 240 430 S 320 350, 362 330"
                  stroke="white"
                  strokeWidth="14"
                />
              </mask>
            </defs>
            <path
              d="M 430 800 C 290 720, 200 560, 240 430 S 320 350, 362 330"
              stroke="rgb(255 255 255 / 0.5)"
              strokeWidth="3"
              strokeDasharray="10 14"
              strokeLinecap="round"
              mask="url(#track-reveal)"
            />
          </svg>
        </div>
      </div>

      {/* Sky tint — sits UNDER the wordmark so the letters stay pure white */}
      <div
        aria-hidden
        className="absolute inset-0 -z-[35] [background:linear-gradient(to_bottom,rgb(10_20_35/0.45),rgb(10_20_35/0.38)_26%,transparent_46%)]"
      />

      {/* 2 · Wordmark: sits in the sky band, below the nav; the dunes (layer 3) overlap its bottom edge */}
      <div
        data-layer="wordmark"
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -z-30 select-none will-change-transform [top:calc(4.5rem+24px)] lg:[top:calc(5rem+24px+2.5vh)]"
      >
        <p
          data-hero-item="wordmark"
          className="hero-wordmark relative flex justify-center font-display uppercase leading-[0.85] tracking-[-0.01em] text-white [filter:drop-shadow(0_6px_30px_rgb(10_20_35/0.28))]"
        >
          {WORDMARK.map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden pt-[0.06em]">
              <motion.span
                className="inline-block"
                initial={reduce ? false : { y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                {ch === " " ? " " : ch}
              </motion.span>
            </span>
          ))}
          {/* one-off light sweep, same glyphs on top */}
          <span aria-hidden className="wordmark-sweep absolute inset-0 flex justify-center">
            {WORDMARK.map((ch, i) => (
              <span key={i} className="inline-block pt-[0.06em]">
                {ch === " " ? " " : ch}
              </span>
            ))}
          </span>
        </p>
      </div>

      {/* 3 · Dune silhouette clone — same artwork clipped to the sand, drawn over the wordmark (depth) */}
      <div data-parallax aria-hidden className="pointer-events-none absolute inset-0 -z-20 hidden will-change-transform md:block">
        <div className="animate-settle absolute inset-0">
          <PlatePicture clone />
        </div>
      </div>

      {/* 4 · Colour grade */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[60%] [background:linear-gradient(to_top,rgb(20_17_15/0.88),rgb(20_17_15/0.58)_42%,transparent)] max-md:h-[58%] max-md:[background:linear-gradient(to_top,rgb(20_17_15/0.92),rgb(20_17_15/0.6)_45%,transparent)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background:radial-gradient(130%_100%_at_50%_45%,transparent_62%,rgb(120_60_20/0.28))]"
      />
      <div aria-hidden className="film-grain pointer-events-none absolute inset-0 -z-10 !opacity-[0.05]" />

      {/* 5 · Hotspot on the convoy (desktop only) */}
      <div data-parallax className="pointer-events-none absolute inset-0 z-10 hidden will-change-transform md:block">
        <div className="animate-settle absolute inset-0">
          <div className="hero-plate">
            <motion.div
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.7 }}
            >
              <ConvoyHotspot />
            </motion.div>
          </div>
        </div>
      </div>

      {/* 6 · Content */}
      <div
        data-layer="content"
        className="container-x pointer-events-none relative z-20 flex h-full flex-col justify-end pb-[clamp(14px,2.4vh,28px)]"
      >
        <div className="grid items-end gap-6 xl:grid-cols-[1fr_auto]">
          {/* On desktop the text column starts right of the big 4x4 (≈36% of the artwork) so it never covers it */}
          <div className="pointer-events-auto hero-text-offset">
            <div className="relative flex flex-col gap-[clamp(8px,1.6vh,18px)]">
              {/* soft ink scrim so white + orange text stays ≥4.5:1 on bright sand */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-x-14 -inset-y-20 -z-10 [background:radial-gradient(closest-side,rgb(20_17_15/0.9),rgb(20_17_15/0.86)_68%,transparent)]"
              />
            <motion.p
              data-hero-item="eyebrow"
              {...enter(0.55, reduce)}
              className="eyebrow hero-hide-800 self-start !text-white max-md:hidden"
            >
              <span aria-hidden className="h-px w-8 bg-ember-400" />
              {eyebrow}
            </motion.p>

            <h1
              data-hero-item="headline"
              className="hero-h1 max-w-[8em] text-balance text-white [text-shadow:0_2px_20px_rgb(20_17_15/0.65)]"
            >
              <RevealLines
                delay={0.6}
                lines={[
                  "Your Dubai Desert",
                  <span key="a">
                    <em className="text-[#F08A3C] italic">Adventure</em> Starts Here.
                  </span>,
                ]}
              />
            </h1>

            <motion.ul
              data-hero-item="ticks"
              {...enter(0.95, reduce)}
              className="flex flex-wrap gap-x-[clamp(12px,1.6vw,28px)] gap-y-1.5 text-[0.9375rem] font-medium text-white"
            >
              {trust.map((t) => (
                <li key={t} className="flex items-center gap-2 whitespace-nowrap">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-red-500">
                    <Check aria-hidden className="size-3" strokeWidth={3.5} />
                  </span>
                  {t}
                </li>
              ))}
            </motion.ul>

            <motion.div data-hero-item="ctas" {...enter(1.05, reduce)} className="hidden gap-3 md:flex">
              <MagneticButton href="/desert-safari" size="lg" className="h-[clamp(48px,7vh,56px)]">
                Explore tours
              </MagneticButton>
              <MagneticButton
                href={whatsappLink("Hi! I'd like help planning a desert safari.")}
                external
                variant="glass"
                size="lg"
                className="h-[clamp(48px,7vh,56px)]"
                icon={<MessageCircle aria-hidden className="size-4" />}
              >
                <span className="max-[1365px]:hidden">Plan on </span>WhatsApp
              </MagneticButton>
            </motion.div>

            {/* Mobile: one full-width button instead of the card + CTAs */}
            <motion.div data-hero-item="book" {...enter(1.05, reduce)} className="pointer-events-auto md:hidden">
              <Link
                href={popular.href}
                className="group flex h-14 w-full items-center justify-between rounded-full bg-red-500 pl-6 pr-1.5 text-base font-medium text-white shadow-glow"
              >
                Book from AED {popular.fromAed}
                <span className="flex size-11 items-center justify-center rounded-full bg-sand-50 text-red-500">
                  <ArrowRight aria-hidden className="size-5" />
                </span>
              </Link>
            </motion.div>

            {/* 768–1279px strip */}
{PopularStrip}
            </div>
          </div>

          {/* ≥1280px card, right column */}
          <div className="hidden xl:block">{PopularCard}</div>
        </div>

        <div className="pointer-events-auto mt-[clamp(10px,2vh,22px)]">
          <HeroMeta />
        </div>
      </div>
    </section>
  );
}
