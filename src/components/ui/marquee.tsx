import { cn } from "@/lib/utils";

/** Infinite CSS marquee: content is rendered twice so the -50% loop is seamless. */
export function Marquee({
  children,
  className,
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]",
        className,
      )}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "flex min-w-full shrink-0 animate-marquee items-center",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
