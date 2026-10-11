import { cn } from "@/lib/utils";

type PriceTagProps = {
  priceAed: number | null;
  unit?: string;
  tone?: "light" | "dark";
  className?: string;
};

/** "from AED 99 / per person" — falls back to a WhatsApp prompt while the price is a TODO. */
export function PriceTag({ priceAed, unit, tone = "light", className }: PriceTagProps) {
  const dark = tone === "dark";
  if (priceAed === null) {
    return (
      <p className={cn("text-sm font-semibold", dark ? "text-sand-100" : "text-ink-950", className)}>
        Best price on WhatsApp
      </p>
    );
  }
  return (
    <p className={cn("flex flex-wrap items-baseline gap-x-1.5 [font-variant-numeric:tabular-nums]", className)}>
      <span className={cn("text-xs font-medium uppercase tracking-[0.18em]", dark ? "text-sand-200/70" : "text-ink-400")}>
        from
      </span>
      <span className={cn("font-display text-4xl leading-none", dark ? "text-sand-50" : "text-ink-950")}>
        <span className="mr-1.5 font-sans text-sm font-medium text-red-500">AED</span>
        {priceAed.toLocaleString("en-US")}
      </span>
      {unit && <span className={cn("text-xs", dark ? "text-sand-200/70" : "text-ink-400")}>{unit}</span>}
    </p>
  );
}
