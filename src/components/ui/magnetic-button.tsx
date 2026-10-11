"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useMediaQuery, DESKTOP_FX, REDUCED_MOTION } from "@/hooks/use-media";
import { cn } from "@/lib/utils";

/**
 * primary  — red pill, arrow in a circle
 * outline  — outline pill for light backgrounds (secondary)
 * outlineLight — outline pill for dark backgrounds
 * light / whatsapp — filled pills for use on coloured banners
 */
type Variant = "primary" | "outline" | "outlineLight" | "glass" | "light" | "whatsapp";

const variants: Record<Variant, { pill: string; circle: string }> = {
  primary: { pill: "bg-red-500 text-sand-50 shadow-glow hover:bg-red-600", circle: "bg-sand-50 text-red-500" },
  outline: {
    pill: "border border-ink-950/25 text-ink-950 hover:border-ink-950 hover:bg-ink-950 hover:text-sand-50",
    circle: "bg-ink-950 text-sand-50 group-hover:bg-sand-50 group-hover:text-ink-950",
  },
  outlineLight: {
    pill: "border border-sand-50/40 text-sand-50 hover:border-sand-50 hover:bg-sand-50 hover:text-ink-950",
    circle: "bg-sand-50 text-ink-950 group-hover:bg-ink-950 group-hover:text-sand-50",
  },
  glass: {
    pill: "border border-white/25 bg-white/10 text-sand-50 backdrop-blur-md hover:bg-white/20",
    circle: "bg-white/20 text-sand-50",
  },
  light: { pill: "bg-sand-50 text-ink-950 hover:bg-white", circle: "bg-red-500 text-sand-50" },
  whatsapp: { pill: "bg-[#25D366] text-ink-950 hover:bg-[#1fbd5b]", circle: "bg-ink-950 text-sand-50" },
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  /** 48px default, 56px for the hero. */
  size?: "md" | "lg";
  arrow?: boolean;
  icon?: React.ReactNode;
  external?: boolean;
  className?: string;
};

/** Pill CTA with a magnetic pull toward the cursor (desktop + fine pointer only). */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = true,
  icon,
  external,
  className,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const desktop = useMediaQuery(DESKTOP_FX);
  const reduce = useMediaQuery(REDUCED_MOTION);
  const enabled = desktop && !reduce;
  const v = variants[variant];

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || !enabled) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.22;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.3;
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const cls = cn(
    "group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full text-[0.95rem] font-medium transition-[transform,background-color,color,border-color,box-shadow] duration-300 ease-out",
    size === "lg" ? "h-14" : "h-12",
    arrow ? "pl-6 pr-1.5" : "px-6",
    v.pill,
    className,
  );
  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && (
        <span
          aria-hidden
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-0.5",
            size === "lg" ? "size-11" : "size-9",
            v.circle,
          )}
        >
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:-rotate-45" />
        </span>
      )}
    </>
  );

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onPointerMove={onMove}
        onPointerLeave={reset}
        className={cls}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link ref={ref} href={href} onPointerMove={onMove} onPointerLeave={reset} className={cls}>
      {inner}
    </Link>
  );
}
