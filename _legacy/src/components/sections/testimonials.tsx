"use client";

import { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { fadeUp, viewportOnce } from "@/components/common/motion";
import { testimonials } from "@/data/testimonials";
import { pressMentions } from "@/data/press";

function circularDistance(index: number, selected: number, count: number) {
  let dist = (index - selected) % count;
  if (dist > count / 2) dist -= count;
  if (dist < -count / 2) dist += count;
  return dist;
}

export function Testimonials() {
  const [autoplay] = useState(() =>
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: false,
    })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [autoplay]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      autoplay.stop();
    }
  }, [autoplay]);

  const handleFocusIn = useCallback(() => autoplay.stop(), [autoplay]);
  const handleFocusOut = useCallback(() => autoplay.play(), [autoplay]);

  const count = testimonials.length;

  return (
    <section id="testimonials" className="scroll-mt-32 bg-sand-100 px-4 pt-32 pb-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-14 flex flex-col items-center"
        >
          <SectionHeading
            eyebrow="Guest Reviews"
            title="Loved by travelers worldwide"
            highlight="travelers worldwide"
            align="center"
            className="mx-auto items-center text-center"
          />
          <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-card px-4 py-2 shadow-card">
            <span className="font-display text-sm font-semibold text-ink-950">Google</span>
            <span className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-red-500 text-red-500" />
              ))}
            </span>
            <span className="text-sm text-ink-600">4.9 · 3,400+ reviews</span>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="relative"
        >
          <div
            ref={emblaRef}
            onFocus={handleFocusIn}
            onBlur={handleFocusOut}
            className="overflow-x-hidden overflow-y-visible py-12 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          >
            <div className="flex touch-pan-y">
              {testimonials.map((testimonial, index) => {
                const dist = circularDistance(index, selectedIndex, count);
                const absDist = Math.abs(dist);
                const isActive = absDist === 0;

                return (
                  <div
                    key={testimonial.name}
                    className="min-w-0 shrink-0 grow-0 basis-[88%] px-3 sm:basis-[62%] lg:basis-[42%]"
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1 : 0.86,
                        opacity: absDist >= 2 ? 0 : isActive ? 1 : 0.4,
                      }}
                      transition={{ type: "spring", duration: 0.6, bounce: 0.15 }}
                      className={`flex h-full flex-col items-center gap-5 rounded-3xl bg-card p-8 text-center shadow-card sm:p-10 ${
                        isActive ? "shadow-card-hover" : ""
                      }`}
                    >
                      <Quote className="size-8 shrink-0 text-red-500" />
                      <p className="text-balance-pretty font-display text-xl font-medium leading-snug text-ink-950 sm:text-2xl">
                        &ldquo;
                        {testimonial.quote.includes(testimonial.highlight) ? (
                          <>
                            {testimonial.quote.split(testimonial.highlight)[0]}
                            <span className="text-red-500">{testimonial.highlight}</span>
                            {testimonial.quote.split(testimonial.highlight)[1]}
                          </>
                        ) : (
                          testimonial.quote
                        )}
                        &rdquo;
                      </p>
                      <div className="flex shrink-0 items-center gap-0.5">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="size-4 fill-red-500 text-red-500" />
                        ))}
                      </div>
                      <div className="mt-auto flex shrink-0 items-center gap-3 pt-2">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-red-500/10 font-display text-sm font-medium text-red-500">
                          {testimonial.initials}
                        </span>
                        <div className="text-left">
                          <p className="text-sm font-medium text-ink-950">{testimonial.name}</p>
                          <p className="text-xs text-ink-400">
                            {testimonial.country} · {testimonial.tour}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => emblaApi?.scrollPrev()}
              className="focus-ring flex size-10 items-center justify-center rounded-full border border-sand-400 text-ink-800 transition-colors hover:border-red-500 hover:text-red-500"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex ? "w-6 bg-red-500" : "w-2 bg-sand-400 hover:bg-sand-500"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => emblaApi?.scrollNext()}
              className="focus-ring flex size-10 items-center justify-center rounded-full border border-sand-400 text-ink-800 transition-colors hover:border-red-500 hover:text-red-500"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-20"
        >
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
            As Seen On
          </p>
          <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee gap-16 group-hover:[animation-play-state:paused]">
              {[...pressMentions, ...pressMentions].map((name, index) => (
                <span
                  key={`${name}-${index}`}
                  className="shrink-0 font-display text-xl font-semibold whitespace-nowrap text-ink-400 grayscale"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
