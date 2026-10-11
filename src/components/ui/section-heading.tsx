import { cn } from "@/lib/utils";
import { Reveal, RevealLines } from "./reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  /** Accent word(s) rendered in the brand colour after `title`. */
  accent?: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  /** Heading level — the page h1 lives in the hero, so sections default to h2. */
  as?: "h2" | "h3";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  align = "left",
  tone = "light",
  className,
  as: Tag = "h2",
  id,
}: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center", className)}>
      <Reveal>
        <p className={cn("eyebrow", tone === "dark" && "!text-ember-400", center && "justify-center")}>
          <span aria-hidden className="h-px w-8 bg-current" />
          {eyebrow}
          {center && <span aria-hidden className="h-px w-8 bg-current" />}
        </p>
      </Reveal>
      <Tag
        id={id}
        className={cn(
          "text-fluid-h2 mt-5 font-normal text-balance",
          tone === "dark" ? "text-sand-50" : "text-ink-950",
        )}
      >
        <RevealLines
          lines={[
            <span key="t">
              {title}
              {accent && (
                <>
                  {" "}
                  <em className={cn("italic", tone === "dark" ? "text-ember-400" : "text-red-500")}>{accent}</em>
                </>
              )}
            </span>,
          ]}
        />
      </Tag>
      {subtitle && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "mt-6 max-w-[62ch] text-[1.0625rem] leading-relaxed text-pretty sm:text-lg",
              tone === "dark" ? "text-sand-200/80" : "text-ink-600",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
