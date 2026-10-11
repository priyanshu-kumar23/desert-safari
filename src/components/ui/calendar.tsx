"use client";

import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Calendar({ className, ...props }: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays
      className={cn("p-1", className)}
      classNames={{
        months: "relative flex flex-col",
        month_caption: "flex h-10 items-center justify-center font-display text-base font-semibold",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
        button_previous:
          "flex size-10 items-center justify-center rounded-full hover:bg-sand-200 disabled:opacity-30",
        button_next:
          "flex size-10 items-center justify-center rounded-full hover:bg-sand-200 disabled:opacity-30",
        month_grid: "mt-2 border-collapse",
        weekday: "size-10 text-xs font-semibold uppercase text-ink-400",
        day: "p-0 text-center",
        day_button:
          "flex size-10 items-center justify-center rounded-full text-sm font-medium transition-colors hover:bg-sand-200 disabled:pointer-events-none disabled:opacity-30",
        selected: "[&>button]:bg-red-500 [&>button]:text-sand-50 [&>button]:hover:bg-red-600",
        today: "[&>button]:ring-1 [&>button]:ring-red-500/50",
        outside: "opacity-40",
        disabled: "opacity-30",
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft aria-hidden className="size-4" />
          ) : (
            <ChevronRight aria-hidden className="size-4" />
          ),
      }}
      {...props}
    />
  );
}
