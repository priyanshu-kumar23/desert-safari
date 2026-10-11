"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SectionHeading } from "@/components/common/section-heading";
import { fadeUp, viewportOnce } from "@/components/common/motion";
import { galleryImages } from "@/data/gallery";

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const showPrev = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length));
  }, []);
  const showNext = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % galleryImages.length));
  }, []);

  useEffect(() => {
    if (openIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, showPrev, showNext]);

  const current = openIndex !== null ? galleryImages[openIndex] : null;

  return (
    <section className="scroll-mt-32 bg-sand-200 px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-12"
        >
          <SectionHeading
            eyebrow="Gallery"
            title="Moments from the dunes"
            highlight="the dunes"
            description="A glimpse of what's waiting for you out in the desert and along the coast."
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="columns-2 gap-4 sm:columns-3"
        >
          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setOpenIndex(index)}
              className={`focus-ring group relative mb-4 block w-full overflow-hidden rounded-2xl shadow-card transition-shadow duration-500 hover:shadow-card-hover ${
                image.tall ? "aspect-3/4" : "aspect-4/3"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <p className="flex items-center gap-1.5 p-3 text-xs font-medium text-sand-50 sm:text-sm">
                  <Expand className="size-3.5" />
                  {image.caption}
                </p>
              </div>
            </button>
          ))}
        </motion.div>
      </div>

      <Dialog open={openIndex !== null} onOpenChange={(open) => !open && setOpenIndex(null)}>
        <DialogContent
          showCloseButton
          className="max-w-4xl border-none bg-transparent p-0 shadow-none ring-0 sm:max-w-4xl"
        >
          <DialogTitle className="sr-only">{current?.caption ?? "Gallery image"}</DialogTitle>
          {current ? (
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-ink-950 sm:aspect-16/9">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/90 to-transparent p-4 text-sm text-sand-50">
                {current.caption}
              </p>
              <button
                type="button"
                aria-label="Previous image"
                onClick={showPrev}
                className="focus-ring absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/70 text-sand-50 hover:bg-red-500"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={showNext}
                className="focus-ring absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/70 text-sand-50 hover:bg-red-500"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
