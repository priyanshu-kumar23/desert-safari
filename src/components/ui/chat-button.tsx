import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappLink, WA_GENERAL } from "@/lib/whatsapp";

const variants = {
  /** over the hero / dark backgrounds */
  glass: "border border-white/20 bg-white/[0.12] text-white backdrop-blur-xl hover:bg-white/20",
  /** follows the surrounding text colour (transparent navbar → white, cream navbar → ink) */
  ghost: "border border-current/20 bg-current/10 text-inherit hover:bg-current/20",
  /** floating on light sections */
  solid: "border border-white/10 bg-red-500 text-white shadow-[0_10px_30px_-8px_rgba(200,54,31,0.6)] hover:bg-red-600",
} as const;

const tipSide = {
  left: "right-full top-1/2 mr-3 -translate-y-1/2",
  top: "bottom-full left-1/2 mb-3 -translate-x-1/2",
  bottom: "left-1/2 top-full mt-3 -translate-x-1/2",
} as const;

/** One on-brand chat button for every placement. Opens WhatsApp with a prefilled message. */
export function ChatButton({
  variant = "glass",
  message = WA_GENERAL,
  tooltip,
  className,
  children,
}: {
  variant?: keyof typeof variants;
  message?: string;
  tooltip?: keyof typeof tipSide;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={cn(
        "group/chat relative inline-flex shrink-0 items-center justify-center rounded-full transition-[transform,background-color] duration-200 hover:scale-105 active:scale-[0.96]",
        variants[variant],
        className,
      )}
    >
      <MessageCircle
        aria-hidden
        strokeWidth={1.75}
        className="size-[46%] transition-transform duration-200 group-hover/chat:-rotate-6 group-hover/chat:translate-x-px"
      />
      {children}
      {tooltip && (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute z-50 hidden whitespace-nowrap rounded-full bg-ink-950 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-card transition-opacity duration-200 group-hover/chat:opacity-100 lg:block",
            tipSide[tooltip],
          )}
        >
          Chat with us
        </span>
      )}
    </a>
  );
}
