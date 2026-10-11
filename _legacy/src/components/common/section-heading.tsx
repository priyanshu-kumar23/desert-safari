import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  /** A substring of `title` to render in the red accent color. */
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  /** "light" = dark ink text on a light/sand section (default). "dark" = light text on a dark or image-backed section. */
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const parts = highlight && title.includes(highlight) ? title.split(highlight) : null;

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2
        className={cn(
          "text-balance-pretty max-w-2xl text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl",
          tone === "light" ? "text-ink-950" : "text-sand-50"
        )}
      >
        {parts ? (
          <>
            {parts[0]}
            <span className="text-red-500">{highlight}</span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-xl text-base leading-relaxed sm:text-lg",
            tone === "light" ? "text-ink-600" : "text-sand-300"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
