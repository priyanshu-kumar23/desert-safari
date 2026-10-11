import Link from "next/link";
import { cn } from "@/lib/utils";

/** "Red Sand" in the display serif + "Adventure" in its italic, one line, fixed size. */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Red Sand Adventure — home"
      className={cn(
        "flex shrink-0 items-baseline gap-[0.3em] whitespace-nowrap font-display text-[1.75rem] leading-none transition-colors",
        tone === "light" ? "text-sand-50" : "text-ink-950",
        className,
      )}
    >
      <span>Red Sand</span>
      <span className={cn("italic", tone === "light" ? "text-ember-400" : "text-red-500")}>Adventure</span>
    </Link>
  );
}
