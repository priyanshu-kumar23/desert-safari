"use client";

import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CalendarDays, ChevronDown, Compass, Minus, Plus, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { ChatButton } from "@/components/ui/chat-button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cityTours, desertOffers, experiences, type Tour } from "@/data/tours";
import { cn } from "@/lib/utils";

type Option = { id: string; label: string; tour: Tour };

const byId = (list: Tour[], slug: string) => list.find((t) => t.slug === slug)!;

/** Dropdown options — prices come straight from /data/tours (null → "Best price on WhatsApp"). */
const OPTIONS: Option[] = [
  { id: "evening", label: "Evening Safari", tour: byId(desertOffers, "evening-desert-safari-dubai") },
  { id: "sunrise", label: "Sunrise Safari", tour: byId(desertOffers, "sunrise-desert-safari-dubai") },
  { id: "luxury", label: "Heritage Luxury", tour: byId(desertOffers, "arabian-heritage-safari") },
  { id: "hummer", label: "Hummer Safari", tour: byId(desertOffers, "hummer-desert-safari-dubai") },
  { id: "buggy", label: "Dune Buggy", tour: byId(experiences, "4-seater-dune-buggy-dubai") },
  { id: "dhow", label: "Dhow Cruise", tour: byId(experiences, "alexandra-dhow-cruise-dubai-marina") },
  { id: "city", label: "City Tour", tour: byId(cityTours, "dubai-full-day-city-tour") },
];

const fieldBtn =
  "group flex h-full min-w-0 flex-1 items-center gap-3 rounded-full px-5 text-left transition-colors hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-white";
const label = "text-[11px] font-medium uppercase leading-none tracking-[0.18em] text-white/80";
const value = "mt-1.5 block truncate text-[0.95rem] font-medium leading-tight text-white";
const divider = <span aria-hidden className="h-9 w-px shrink-0 bg-white/15" />;

function Stepper({ guests, setGuests, className }: { guests: number; setGuests: (n: number) => void; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        type="button"
        aria-label="Decrease guests"
        disabled={guests <= 1}
        onClick={() => setGuests(Math.max(1, guests - 1))}
        className="flex size-9 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15 disabled:opacity-35"
      >
        <Minus aria-hidden className="size-4" />
      </button>
      <output aria-live="polite" className="w-6 text-center text-[0.95rem] font-medium tabular-nums text-white">
        {guests}
      </output>
      <button
        type="button"
        aria-label="Increase guests"
        disabled={guests >= 20}
        onClick={() => setGuests(Math.min(20, guests + 1))}
        className="flex size-9 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15 disabled:opacity-35"
      >
        <Plus aria-hidden className="size-4" />
      </button>
    </div>
  );
}

/** ≥1024px: one dark-glass pill — Experience | Date | Guests | Price | Book now | WhatsApp. */
export function BookingBar() {
  const reduce = useReducedMotion();
  const [id, setId] = useState(OPTIONS[0].id);
  const [date, setDate] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [openExp, setOpenExp] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  const opt = OPTIONS.find((o) => o.id === id)!;
  const { tour } = opt;
  const params = new URLSearchParams({ guests: String(guests) });
  if (date) params.set("date", format(date, "yyyy-MM-dd"));
  const msg = `Hi! I'd like to book the ${tour.title} for ${guests} ${guests === 1 ? "guest" : "guests"}${
    date ? ` on ${format(date, "EEE d MMM yyyy")}` : ""
  }.`;

  return (
    <motion.div
      data-hero-item="bar"
      role="group"
      aria-label="Book your experience"
      initial={reduce ? false : { y: 110, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 130, damping: 19, mass: 0.9, delay: 1.0 }}
      className="pointer-events-auto hidden h-[84px] w-full items-stretch gap-1 rounded-full border border-white/15 bg-[rgb(15_12_10/0.55)] p-2 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.5)] backdrop-blur-2xl lg:flex"
    >
      {/* Experience */}
      <Popover open={openExp} onOpenChange={setOpenExp}>
        <PopoverTrigger className={cn(fieldBtn, "flex-[1.5]")} aria-label={`Experience: ${opt.label}`}>
          <Compass aria-hidden className="size-5 shrink-0 text-ember-400" />
          <span className="min-w-0 flex-1">
            <span className={label}>Experience</span>
            <span className={value}>{opt.label}</span>
          </span>
          <ChevronDown aria-hidden className="size-4 shrink-0 text-white/80 transition-transform group-data-[state=open]:rotate-180" />
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2" side="top" sideOffset={14}>
          <ul>
            {OPTIONS.map((o) => (
              <li key={o.id}>
                <button
                  type="button"
                  onClick={() => {
                    setId(o.id);
                    setOpenExp(false);
                  }}
                  className={cn(
                    "flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-3 text-left text-sm font-semibold hover:bg-sand-200",
                    o.id === id && "bg-sand-200 text-red-500",
                  )}
                >
                  {o.label}
                  <span className="text-xs font-medium text-ink-600">
                    {o.tour.priceAed === null ? "Ask" : `AED ${o.tour.priceAed}`}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>

      {divider}

      {/* Date (+ guests stepper while the Guests field is hidden, 1024–1279px) */}
      <Popover open={openDate} onOpenChange={setOpenDate}>
        <PopoverTrigger className={cn(fieldBtn, "flex-1")} aria-label={`Date: ${date ? format(date, "d MMM") : "add date"}`}>
          <CalendarDays aria-hidden className="size-5 shrink-0 text-ember-400" />
          <span className="min-w-0 flex-1">
            <span className={label}>Date</span>
            <span className={value}>{date ? format(date, "EEE, d MMM") : "Add date"}</span>
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-auto" side="top" sideOffset={14}>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              setDate(d);
              if (d) setOpenDate(false);
            }}
            disabled={{ before: new Date() }}
          />
          <div className="mt-2 flex items-center justify-between border-t border-sand-300 px-2 pt-3 xl:hidden">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Users aria-hidden className="size-4 text-red-500" /> Guests
            </span>
            <Stepper guests={guests} setGuests={setGuests} className="[&_button]:border-sand-400 [&_button]:text-ink-950 [&_button:hover]:bg-sand-200 [&_output]:text-ink-950" />
          </div>
        </PopoverContent>
      </Popover>

      {/* Guests (≥1280px) */}
      <span className="hidden xl:contents">{divider}</span>
      <div className="hidden min-w-0 flex-none items-center gap-3 px-5 xl:flex">
        <Users aria-hidden className="size-5 shrink-0 text-ember-400" />
        <span>
          <span className={label}>Guests</span>
          <span className="mt-1.5 block">
            <Stepper guests={guests} setGuests={setGuests} className="gap-2 [&_button]:size-7 [&_button_svg]:size-3.5" />
          </span>
        </span>
      </div>

      {divider}

      {/* Price */}
      <div className="flex min-w-[9.5rem] flex-none flex-col justify-center px-5 text-white" aria-live="polite">
        {tour.priceAed === null ? (
          <>
            <span className={label}>Price</span>
            <span className="mt-1 font-display text-[1.7rem] leading-none">Best price</span>
          </>
        ) : (
          <>
            <span className={label}>
              from{!/person/.test(tour.priceUnit) && <span className="normal-case tracking-normal"> · {tour.priceUnit.replace("per ", "/")}</span>}
            </span>
            <span className="mt-1 font-display text-[2.1rem] leading-none tabular-nums">
              <span className="mr-1.5 font-sans text-sm font-medium text-ember-400">AED</span>
              {tour.priceAed.toLocaleString("en-US")}
            </span>
          </>
        )}
      </div>

      <Link
        href={`${tour.href}?${params}`}
        className="group flex flex-none items-center gap-3 self-center rounded-full bg-red-500 py-3.5 pl-7 pr-3 text-[0.95rem] font-medium text-white shadow-glow transition-colors hover:bg-red-600"
      >
        Book now
        <span className="flex size-8 items-center justify-center rounded-full bg-sand-50 text-red-500">
          <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </Link>

      <ChatButton variant="glass" tooltip="top" message={msg} className="size-[60px] self-center" />
    </motion.div>
  );
}
