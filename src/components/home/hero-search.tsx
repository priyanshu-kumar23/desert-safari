"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarDays, MapPin, Minus, Plus, Search, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

const destinations = navigation.filter((n) => n.id !== "why-choose-us");

const fieldBtn =
  "flex min-h-14 w-full items-center gap-3 rounded-[var(--radius-field)] px-4 text-left transition-colors hover:bg-white/10 focus-visible:bg-white/10 lg:rounded-full";

function Field({
  icon: Icon,
  label,
  value,
  placeholder,
}: {
  icon: typeof MapPin;
  label: string;
  value?: string;
  placeholder: string;
}) {
  return (
    <>
      <Icon aria-hidden className="size-5 shrink-0 text-ember-400" />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-sand-50">{label}</span>
        <span className={cn("truncate text-[0.95rem] font-medium", value ? "text-sand-50" : "text-sand-50")}>
          {value ?? placeholder}
        </span>
      </span>
    </>
  );
}

/** Where to / Date / Guests / Search — a glass pill on desktop, a stacked card on mobile. */
export function HeroSearch() {
  const router = useRouter();
  const [dest, setDest] = useState<(typeof navigation)[number] | null>(null);
  const [date, setDate] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [openDest, setOpenDest] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ guests: String(guests) });
    if (date) params.set("date", format(date, "yyyy-MM-dd"));
    router.push(`/${dest?.id ?? "desert-safari"}?${params}`);
  };

  return (
    <form
      onSubmit={submit}
      role="search"
      aria-label="Search tours"
      className="glass grid gap-1 rounded-[var(--radius-panel)] bg-ink-950/40 p-2 shadow-lift sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto] lg:items-center lg:rounded-full"
    >
      <Popover open={openDest} onOpenChange={setOpenDest}>
        <PopoverTrigger className={fieldBtn} aria-label="Where to">
          <Field icon={MapPin} label="Where to" value={dest?.label} placeholder="Choose an experience" />
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2">
          <ul>
            {destinations.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => {
                    setDest(n);
                    setOpenDest(false);
                  }}
                  className={cn(
                    "flex min-h-11 w-full items-center rounded-xl px-3 text-left text-sm font-semibold hover:bg-sand-200",
                    dest?.id === n.id && "bg-sand-200 text-red-500",
                  )}
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>

      <Popover open={openDate} onOpenChange={setOpenDate}>
        <PopoverTrigger className={fieldBtn} aria-label="Date">
          <Field
            icon={CalendarDays}
            label="Date"
            value={date ? format(date, "EEE, d MMM") : undefined}
            placeholder="Add date"
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              setDate(d);
              setOpenDate(false);
            }}
            disabled={{ before: new Date() }}
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger className={fieldBtn} aria-label="Guests">
          <Field icon={Users} label="Guests" value={`${guests} ${guests === 1 ? "guest" : "guests"}`} placeholder="" />
        </PopoverTrigger>
        <PopoverContent className="w-60">
          <div className="flex items-center justify-between gap-4 px-2 py-1">
            <span className="text-sm font-semibold">Guests</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Decrease guests"
                disabled={guests <= 1}
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="flex size-11 items-center justify-center rounded-full border border-sand-400 transition-colors hover:bg-sand-200 disabled:opacity-30"
              >
                <Minus aria-hidden className="size-4" />
              </button>
              <output aria-live="polite" className="w-5 text-center font-display text-2xl">
                {guests}
              </output>
              <button
                type="button"
                aria-label="Increase guests"
                disabled={guests >= 20}
                onClick={() => setGuests((g) => Math.min(20, g + 1))}
                className="flex size-11 items-center justify-center rounded-full border border-sand-400 transition-colors hover:bg-sand-200 disabled:opacity-30"
              >
                <Plus aria-hidden className="size-4" />
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <button
        type="submit"
        className="group flex h-14 items-center justify-center gap-2.5 rounded-full bg-red-500 px-8 text-[0.95rem] font-medium text-sand-50 shadow-glow transition-colors hover:bg-red-600 sm:col-span-2 lg:col-span-1"
      >
        <Search aria-hidden className="size-4 transition-transform group-hover:scale-110" />
        Search Tours
      </button>
    </form>
  );
}
