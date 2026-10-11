"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Star } from "lucide-react";
import { ratingSummary } from "@/data/reviews";

const fmt = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Dubai", hour: "numeric", minute: "2-digit" });

/** Bottom-edge meta bar: scroll cue | live Dubai time | rating (only when the rating is verified). */
export function HeroMeta() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      data-hero-item="meta"
      className="hero-hide-680 hidden grid-cols-3 items-center border-t border-white/70 pt-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white md:grid"
    >
      <a href="#explore" className="flex items-center gap-3 justify-self-start">
        <span>Scroll to explore</span>
        <ArrowDown aria-hidden className="size-3.5" />
        <span aria-hidden className="relative h-px w-10 overflow-hidden bg-white/30">
          <span className="scroll-line absolute inset-0 bg-white" />
        </span>
      </a>
      <p className="hero-hide-800 justify-self-center" suppressHydrationWarning>
        Dubai{time ? ` · ${time}` : ""}
      </p>
      {ratingSummary.verified ? (
        <p className="col-start-3 flex items-center gap-1.5 justify-self-end">
          <Star aria-hidden className="size-3.5 fill-current text-ember-400" />
          {ratingSummary.rating} Google reviews
        </p>
      ) : null}
    </div>
  );
}
