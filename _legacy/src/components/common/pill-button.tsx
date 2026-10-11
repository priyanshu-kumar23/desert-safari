import { cva, type VariantProps } from "class-variance-authority";

export const pillButtonClass = cva(
  "focus-ring inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-red-500 font-semibold text-sand-50 uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-lg",
  {
    variants: {
      size: {
        compact: "h-11 text-[11px] sm:h-12 sm:text-xs",
        sm: "h-14 text-[14px]",
        lg: "h-20 text-[14px]",
      },
      trailing: {
        none: "gap-2",
        badge: "gap-3",
      },
    },
    compoundVariants: [
      { size: ["sm", "lg"], trailing: "none", className: "px-8" },
      { size: ["sm", "lg"], trailing: "badge", className: "pr-2 pl-7" },
      { size: "compact", trailing: "none", className: "px-4 sm:px-5" },
      { size: "compact", trailing: "badge", className: "pr-1.5 pl-4 sm:pl-5" },
    ],
    defaultVariants: { size: "sm", trailing: "none" },
  }
);

export type PillButtonVariants = VariantProps<typeof pillButtonClass>;
