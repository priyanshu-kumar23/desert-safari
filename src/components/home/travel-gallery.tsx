"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { gallery } from "@/data/home";
import { blurDataURL } from "@/data/media";
import { cn } from "@/lib/utils";

export function TravelGallery() {
  const [active, setActive] = useState<number | null>(null);
  const item = active === null ? null : gallery[active];
  const step = (d: number) => setActive((i) => (i === null ? i : (i + d + gallery.length) % gallery.length));

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          id="gallery-title"
          eyebrow="Travel Gallery"
          title="Moments from the"
          accent="Journey"
          align="center"
        />

        <ul className="mt-14 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] md:grid-cols-4 md:gap-4">
          {gallery.map((g, i) => (
            <Reveal as="li" key={g.src} delay={(i % 4) * 0.06} className={cn("min-h-0", g.span)}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Open photo: ${g.caption}`}
                className="group relative block size-full overflow-hidden rounded-[var(--radius-card)] text-left"
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  className="object-cover transition-transform duration-[1000ms] ease-out-expo group-hover:scale-110"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
                <span className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between gap-2 p-4 text-sm font-semibold text-sand-50 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  {g.caption}
                  <Expand aria-hidden className="size-4 shrink-0" />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
          }}
        >
          {item && (
            <figure className="overflow-hidden rounded-[var(--radius-panel)] bg-ink-950">
              <div className="relative aspect-[4/3] max-h-[80vh] w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 64rem, 94vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="flex items-center justify-between gap-4 p-4 text-sand-50">
                <DialogTitle className="font-display text-xl font-semibold">{item.caption}</DialogTitle>
                <DialogDescription className="sr-only">{item.alt}</DialogDescription>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={() => step(-1)}
                    className="flex size-11 items-center justify-center rounded-full border border-sand-50/30 hover:bg-red-500"
                  >
                    <ArrowLeft aria-hidden className="size-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={() => step(1)}
                    className="flex size-11 items-center justify-center rounded-full border border-sand-50/30 hover:bg-red-500"
                  >
                    <ArrowRight aria-hidden className="size-5" />
                  </button>
                </div>
              </figcaption>
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
