"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useMediaQuery, REDUCED_MOTION } from "@/hooks/use-media";
import { ratingSummary, reviews } from "@/data/reviews";

function Highlighted({ quote, highlight }: { quote: string; highlight: string }) {
  const at = quote.indexOf(highlight);
  if (at < 0) return <>{quote}</>;
  return (
    <>
      {quote.slice(0, at)}
      <mark className="rounded bg-red-500/10 px-1 font-semibold text-red-600">{highlight}</mark>
      {quote.slice(at + highlight.length)}
    </>
  );
}

export function Reviews() {
  const reduce = useMediaQuery(REDUCED_MOTION);
  const plugins = useMemo(
    () => (reduce ? [] : [Autoplay({ delay: 5500, stopOnInteraction: false, stopOnMouseEnter: true })]),
    [reduce],
  );
  const [ref, api] = useEmblaCarousel({ align: "start", loop: true, slidesToScroll: 1 }, plugins);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => api && setSelected(api.selectedScrollSnap()), [api]);
  useEffect(() => {
    if (!api) return;
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-sand-200 py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="reviews-title"
            eyebrow="Guest Reviews"
            title="Loved by Travelers"
            accent="Worldwide"
          />
          {/* TODO: only keep this badge if the rating below is verified (data/reviews.ts). */}
          <Reveal className="flex items-center gap-4 rounded-[var(--radius-card)] bg-sand-50 p-5 shadow-soft">
            <span className="font-display text-6xl leading-none [font-variant-numeric:tabular-nums]">{ratingSummary.rating}</span>
            <div>
              <div className="flex gap-0.5 text-ember-500" aria-label={`${ratingSummary.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} aria-hidden className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-1 text-sm text-ink-600">
                from {ratingSummary.count.toLocaleString("en-US")}+ reviews
              </p>
            </div>
          </Reveal>
        </div>

        <div
          className="mt-12"
          role="region"
          aria-roledescription="carousel"
          aria-label="Guest reviews"
        >
          <div ref={ref} className="-mx-3 overflow-hidden px-3 py-4">
            <ul className="flex">
              {reviews.map((r, i) => (
                <li
                  key={r.name}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${reviews.length}`}
                  className="min-w-0 shrink-0 basis-[88%] px-3 sm:basis-1/2 lg:basis-1/3"
                >
                  <figure className="relative flex h-full flex-col rounded-[var(--radius-card)] bg-sand-50 p-7 shadow-card">
                    <Quote aria-hidden className="size-9 text-red-500/25" />
                    <div className="mt-3 flex gap-0.5 text-ember-500" aria-label={`${r.rating} out of 5 stars`}>
                      {Array.from({ length: r.rating }).map((_, s) => (
                        <Star key={s} aria-hidden className="size-4 fill-current" />
                      ))}
                    </div>
                    <blockquote className="mt-4 flex-1 text-[1.02rem] leading-relaxed text-ink-800">
                      “<Highlighted quote={r.quote} highlight={r.highlight} />”
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-sand-300 pt-5">
                      <span
                        aria-hidden
                        className="flex size-12 items-center justify-center rounded-full bg-red-500 font-display text-xl font-semibold text-sand-50"
                      >
                        {r.initial}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{r.name}</span>
                        <span className="block truncate text-xs text-ink-400">
                          {r.country} · {r.tour}
                        </span>
                      </span>
                      <span className="shrink-0 rounded-full bg-sand-200 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-ink-600">
                        {r.source}
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2" role="tablist" aria-label="Choose review">
              {reviews.map((r, i) => (
                <button
                  key={r.name}
                  role="tab"
                  aria-selected={selected === i}
                  aria-label={`Show review ${i + 1}`}
                  onClick={() => api?.scrollTo(i)}
                  className="flex size-6 items-center justify-center"
                >
                  <span
                    className={`h-2 rounded-full transition-all duration-300 ${selected === i ? "w-8 bg-red-500" : "w-2 bg-ink-400/40"}`}
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => api?.scrollPrev()}
                aria-label="Previous review"
                className="flex size-12 items-center justify-center rounded-full border border-ink-950/20 transition-colors hover:bg-ink-950 hover:text-sand-50"
              >
                <ArrowLeft aria-hidden className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => api?.scrollNext()}
                aria-label="Next review"
                className="flex size-12 items-center justify-center rounded-full bg-red-500 text-sand-50 transition-colors hover:bg-red-600"
              >
                <ArrowRight aria-hidden className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
