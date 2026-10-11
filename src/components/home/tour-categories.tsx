import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { blurDataURL } from "@/data/media";
import { tourCategories } from "@/data/tours";

export function TourCategories() {
  return (
    <section id="explore" aria-labelledby="categories-title" className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          id="categories-title"
          eyebrow="Explore Our Experiences"
          title="Tours"
          accent="Category"
          subtitle="From golden dunes to glittering skylines — pick the Dubai you want to feel."
        />
      </div>

      {/* Desktop: expanding accordion gallery. Mobile: horizontal snap scroll. */}
      <Reveal className="container-x mt-12">
        <ul className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 lg:mx-0 lg:h-[34rem] lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0">
          {tourCategories.map((c, i) => (
            <li
              key={c.title}
              className="group/cat relative h-[26rem] w-[78vw] max-w-80 shrink-0 snap-center overflow-hidden rounded-[var(--radius-card)] shadow-card transition-[flex-grow] duration-700 ease-out-expo sm:w-72 lg:h-full lg:w-auto lg:max-w-none lg:flex-1 lg:hover:flex-[2.8] lg:focus-within:flex-[2.8]"
            >
              <Link href={c.href} className="absolute inset-0 block" aria-label={c.title}>
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover/cat:scale-110"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/15 to-transparent transition-opacity duration-500"
                />
                <span className="absolute left-5 top-5 font-display text-xl text-sand-50/80">
                  0{i + 1}
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6 text-sand-50">
                  <div className="min-w-0">
                    <h3 className="font-sans text-2xl font-semibold leading-tight lg:whitespace-nowrap">
                      {c.title}
                    </h3>
                    <p className="mt-1 text-sm text-sand-200/80 transition-all duration-500 lg:h-0 lg:translate-y-2 lg:opacity-0 lg:group-focus-within/cat:h-5 lg:group-focus-within/cat:translate-y-0 lg:group-focus-within/cat:opacity-100 lg:group-hover/cat:h-5 lg:group-hover/cat:translate-y-0 lg:group-hover/cat:opacity-100">
                      {c.blurb}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-sand-50 text-ink-950 transition-all duration-500 group-hover/cat:rotate-45 group-hover/cat:bg-red-500 group-hover/cat:text-sand-50"
                  >
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
