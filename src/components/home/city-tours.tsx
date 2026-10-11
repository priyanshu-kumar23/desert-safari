import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TourCard } from "@/components/ui/tour-card";
import { blurDataURL } from "@/data/media";
import { cityTours, cityToursFeature } from "@/data/tours";

export function CityTours() {
  return (
    <section id="city-tours" aria-labelledby="city-title" className="bg-sand-200 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          id="city-title"
          eyebrow="Beyond the Dunes"
          title="Popular City"
          accent="Tours"
          subtitle="Skylines, mosques and mountains — guided by locals, with comfortable transfers."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cityTours.map((tour, i) => (
            <Reveal as="li" key={tour.slug} delay={i * 0.1}>
              <TourCard tour={tour} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw" />
            </Reveal>
          ))}

          <Reveal as="li" delay={0.3} className="sm:col-span-2 lg:col-span-1">
            <Link
              href={cityToursFeature.href}
              className="group relative flex min-h-[22rem] h-full flex-col justify-end overflow-hidden rounded-[var(--radius-card)] p-7 text-sand-50 shadow-card"
            >
              <Image
                src={cityToursFeature.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 90vw"
                placeholder="blur"
                blurDataURL={blurDataURL}
                className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-110"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/40 to-red-700/30" />
              <div className="relative">
                <h3 className="font-sans text-2xl font-semibold leading-tight">{cityToursFeature.title}</h3>
                <p className="mt-2 text-sm text-sand-200/85">{cityToursFeature.blurb}</p>
                <span className="mt-6 inline-flex size-14 items-center justify-center rounded-full bg-red-500 transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight aria-hidden className="size-6" />
                </span>
              </div>
            </Link>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
