"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { PriceTag } from "@/components/ui/price-tag";
import { SectionHeading } from "@/components/ui/section-heading";
import { blurDataURL } from "@/data/media";
import { experiences } from "@/data/tours";
import { DESKTOP_FX } from "@/hooks/use-media";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Recommended experiences. Desktop (lg + fine pointer, motion allowed): the section pins and the
 * track scrolls sideways with the page. Everywhere else it is a native swipeable snap carousel.
 */
export function Experiences() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${DESKTOP_FX} and (prefers-reduced-motion: no-preference)`, () => {
        const el = track.current;
        if (!el) return;
        const distance = () => Math.max(0, el.scrollWidth - el.clientWidth);
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance() + 200}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="experiences"
      aria-labelledby="experiences-title"
      className="relative overflow-hidden bg-ink-950 py-20 text-sand-50 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="container-x w-full">
        <SectionHeading
          id="experiences-title"
          tone="dark"
          eyebrow="Recommended For You"
          title="Recommended"
          accent="Experiences"
          subtitle="The adventures our guests book again and again."
        />
      </div>

      <ul
        ref={track}
        className="scrollbar-none container-x mt-12 flex w-full snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:w-max lg:max-w-none lg:snap-none lg:gap-6 lg:overflow-visible lg:pb-0"
      >
        {experiences.map((x, i) => (
          <li
            key={x.slug}
            className="group relative h-[26rem] w-[78vw] max-w-[22rem] shrink-0 snap-center overflow-hidden rounded-[var(--radius-card)] sm:w-80 lg:h-[min(30rem,56vh)] lg:w-[26rem] lg:max-w-none"
          >
            <Image
              src={x.image}
              alt={x.imageAlt}
              fill
              sizes="(min-width: 1024px) 26rem, 80vw"
              placeholder="blur"
              blurDataURL={blurDataURL}
              className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-110"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/30 to-transparent" />
            <span className="absolute left-5 top-5 rounded-full bg-sand-50/95 px-3.5 py-1.5 text-xs font-medium tracking-wide text-red-600">
              {x.badge}
            </span>
            <span aria-hidden className="absolute right-5 top-4 font-display text-5xl text-sand-50/30">
              0{i + 1}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="font-sans text-2xl font-semibold leading-tight">
                <Link href={x.href} className="after:absolute after:inset-0 after:content-['']">
                  {x.title}
                </Link>
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-sand-200/80">{x.description}</p>
              <div className="mt-5 flex items-end justify-between gap-4">
                <PriceTag priceAed={x.priceAed} unit={x.priceUnit} tone="dark" />
                <span
                  aria-hidden
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500 transition-transform duration-500 group-hover:rotate-45"
                >
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
