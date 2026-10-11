"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  Car,
  Footprints,
  MapPin,
  Mountain,
  Sailboat,
  Search,
  Users,
} from "lucide-react";
import { fadeUp } from "@/components/common/motion";
import { pillButtonClass } from "@/components/common/pill-button";
import { useEnquire } from "@/components/common/enquire-modal";

const searchFields = [
  { icon: MapPin, label: "Where To", value: "Dubai" },
  { icon: Calendar, label: "Date", value: "Flexible" },
  { icon: Users, label: "Guests", value: "2 Adults" },
];

const experienceIcons = [Mountain, Footprints, Car, Sailboat];

// Hand-built Next.js image-optimizer URLs so the <picture> below only ever
// fetches one image per viewport (a <source>+<img> pair, not two <Image>
// components — two next/image elements would each trigger their own fetch
// regardless of which one is CSS-hidden). Widths are capped at each source's
// native resolution (mobile_bg is 941px wide, desktop_bg is 1599px) so
// neither gets upscaled server-side.
const mobileBgSrc = `/_next/image?url=${encodeURIComponent("/mobile_bg.png")}&w=828&q=90`;
const desktopBgSrc = `/_next/image?url=${encodeURIComponent("/desktop_bg.png")}&w=1599&q=90`;

export function Hero() {
  const openEnquire = useEnquire();
  return (
    <section className="relative min-h-svh overflow-hidden sm:h-svh sm:min-h-[760px] bg-ink-950">
      <picture>
        <source media="(min-width: 640px)" srcSet={desktopBgSrc} />
        <img
          src={mobileBgSrc}
          alt="Land Cruiser dune bashing through red sand dunes at sunset, kicking up a wall of dust in the Dubai desert"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover object-[62%_center] sm:object-[44%_46%]"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/45 to-ink-950/20 sm:from-ink-950/85 sm:via-ink-950/5 sm:to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1600px] flex-col px-4 sm:h-full sm:min-h-0 sm:px-6 lg:px-12">
        {/* Nav clearance — the real nav is a fixed sibling (Header); this reserves its footprint */}
        <div className="h-[120px] shrink-0" aria-hidden />

        {/* Wordmark lives here, baked into the background image */}
        <div className="pointer-events-none min-h-12 flex-1 sm:min-h-0" />

        {/* Bottom block */}
        <div className="shrink-0 pb-20 sm:pb-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <h1
              className="hidden text-balance font-display font-semibold text-sand-50 sm:block lg:w-[46%]"
              style={{ fontSize: "clamp(32px, 3vw, 56px)", lineHeight: 1.1 }}
            >
              Your Dubai Desert <br className="hidden lg:block" />
              Adventure Starts Here<span className="text-red-500">.</span>
            </h1>

            <div className="flex w-full flex-col gap-3 rounded-3xl bg-sand-50 p-3 shadow-2xl sm:flex-row sm:items-center sm:gap-1 sm:rounded-full sm:p-2 lg:w-[50%] lg:max-w-[720px]">
              {searchFields.map((field, i) => (
                <div key={field.label} className="contents">
                  <div className="flex min-w-0 flex-1 items-center gap-2 px-2 xl:px-3">
                    <field.icon className="size-5 shrink-0 text-red-500" />
                    <div className="flex min-w-0 flex-col leading-tight">
                      <span className="text-[11px] font-bold tracking-wider text-ink-400 uppercase">
                        {field.label}
                      </span>
                      <span className="truncate text-sm font-semibold text-ink-950">
                        {field.value}
                      </span>
                    </div>
                  </div>
                  {i < searchFields.length - 1 && (
                    <div className="hidden h-8 w-px shrink-0 bg-sand-300 sm:block" />
                  )}
                </div>
              ))}
              <a
                href="#packages"
                className={`${pillButtonClass({ size: "compact", trailing: "none" })} w-full shrink-0 sm:w-auto`}
              >
                <Search className="size-4" />
                Search Tours
              </a>
            </div>
          </motion.div>

          {/* Divider row */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.15 }}
            className="mt-8 flex flex-col items-start gap-6 border-t border-white/20 pt-6 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="hidden shrink-0 flex-col gap-4 lg:flex">
              <p className="text-lg leading-snug font-semibold text-sand-50">
                50+ Desert
                <br />
                Experiences
              </p>
              <div className="flex items-center gap-3">
                {experienceIcons.map((Icon, i) => (
                  <span
                    key={i}
                    className="flex size-14 items-center justify-center rounded-full border border-sand-50/30 text-sand-50"
                  >
                    <Icon className="size-5" />
                  </span>
                ))}
              </div>
            </div>
            <p className="py-2 text-sm font-semibold text-sand-50 sm:py-0 lg:hidden">50+ Desert Experiences</p>

            <div className="flex min-w-0 w-full items-center gap-2 rounded-full border border-gold-400/40 bg-ink-950/70 p-2 backdrop-blur-md sm:gap-3 lg:flex lg:h-[68px] lg:max-w-[680px] lg:flex-1">
              <span className="relative ml-1 flex size-2 sm:ml-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-red-500" />
              </span>
              <span className="shrink-0 rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold tracking-wide sm:px-3 sm:text-xs text-sand-50 uppercase">
                Limited Offer
              </span>
              <button
                type="button"
                onClick={openEnquire}
                className="focus-ring group flex min-w-0 flex-1 items-center justify-between gap-2 sm:gap-3"
              >
                <span className="whitespace-nowrap text-xs font-semibold text-sand-100 sm:text-base">
                  ENQUIRE NOW
                </span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-500 sm:size-11 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="size-4 text-sand-50" />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
