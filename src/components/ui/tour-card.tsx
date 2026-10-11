import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { blurDataURL } from "@/data/media";
import type { Tour } from "@/data/tours";
import { cn } from "@/lib/utils";
import { PriceTag } from "./price-tag";

type TourCardProps = {
  tour: Tour;
  featured?: boolean;
  sizes?: string;
  className?: string;
};

export function TourCard({
  tour,
  featured,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw",
  className,
}: TourCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-sand-50 transition-all duration-500 ease-out-expo",
        featured
          ? "shadow-lift ring-1 ring-red-500/30 lg:-translate-y-6"
          : "shadow-card hover:-translate-y-1.5 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.imageAlt}
          fill
          sizes={sizes}
          placeholder="blur"
          blurDataURL={blurDataURL}
          className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-110"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink-950/65 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        />
        {tour.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-sand-50/95 px-3.5 py-1.5 text-xs font-medium tracking-wide text-red-600 shadow-soft">
            {tour.badge}
          </span>
        )}
        {tour.duration && (
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-xs font-semibold text-sand-50">
            <Clock aria-hidden className="size-3.5" />
            {tour.duration}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-sans text-xl font-semibold leading-snug text-ink-950">
          <Link
            href={tour.href}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-[-3px]"
          >
            {tour.title}
          </Link>
        </h3>
        <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-600">{tour.description}</p>
        {tour.highlights.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {tour.highlights.map((h) => (
              <li key={h} className="rounded-full bg-sand-200 px-3 py-1 text-xs font-semibold text-ink-800">
                {h}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <PriceTag priceAed={tour.priceAed} unit={tour.priceUnit} />
          <span
            aria-hidden
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink-950 text-sand-50 transition-all duration-500 group-hover:rotate-45 group-hover:bg-red-500"
          >
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </div>
    </article>
  );
}
