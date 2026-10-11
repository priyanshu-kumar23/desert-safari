"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { convoyHotspot } from "@/data/home";
import { cn } from "@/lib/utils";

/**
 * Pulsing ring + dot on the convoy with a leader line to a glass label. Hover or focus expands the label
 * into a mini card. Positioned in % of the artwork (see `convoyHotspot`) so it follows the cars at any crop.
 * Must be rendered inside a `.hero-plate` box.
 */
export function ConvoyHotspot() {
  const [open, setOpen] = useState(false);
  const { x, y, label, location, blurb, href } = convoyHotspot;

  return (
    <div
      className="pointer-events-none absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        data-hero-item="hotspot"
        aria-expanded={open}
        aria-label={`${label}, ${location}. ${open ? "Collapse" : "Expand"} details`}
        onClick={() => setOpen((o) => !o)}
        className="pointer-events-auto absolute left-0 top-0 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
      >
        <span aria-hidden className="hotspot-ring absolute size-6 rounded-full border-2 border-white" />
        <span aria-hidden className="relative size-3 rounded-full bg-white shadow-[0_0_0_4px_rgb(255_255_255/0.3)]" />
      </button>

      {/* Leader line + label (the dot alone remains on short screens) */}
      <span aria-hidden className="hero-hide-680 absolute bottom-0 left-0 h-[clamp(1rem,4vh,3.25rem)] w-px -translate-x-1/2 bg-white/80" />
      <div
        data-hero-item="hotspot-label"
        className={cn(
          "hero-hide-680 pointer-events-auto absolute bottom-[clamp(1rem,4vh,3.25rem)] right-[-1.25rem] w-max max-w-[17rem] rounded-[var(--radius-field)] border border-white/20 bg-ink-950/60 px-3.5 py-2.5 text-sand-50 backdrop-blur-xl transition-[background-color] duration-300",
          open && "bg-ink-950/80",
        )}
      >
        <p className="text-[0.8125rem] font-medium leading-snug">
          {label} <span aria-hidden>·</span> <span className="text-white/85">{location}</span>
        </p>
        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <p className="mt-2 text-xs leading-relaxed text-white/85">{blurb}</p>
            <Link
              href={href}
              tabIndex={open ? 0 : -1}
              className="mt-2.5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ember-400 hover:text-white"
            >
              View safari <ArrowRight aria-hidden className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
