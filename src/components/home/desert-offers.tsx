import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tilt } from "@/components/ui/tilt";
import { TourCard } from "@/components/ui/tour-card";
import { desertOffers } from "@/data/tours";

const FEATURED = 1;

export function DesertOffers() {
  return (
    <section id="offers" aria-labelledby="offers-title" className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          id="offers-title"
          eyebrow="Handpicked Packages"
          title="Best Desert Safari"
          accent="Offers"
          align="center"
          subtitle="Transparent prices, hotel pickup included, and nothing to pay until you arrive."
        />

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch lg:pt-6">
          {desertOffers.map((tour, i) => (
            <Reveal as="li" key={tour.slug} delay={i * 0.1}>
              {i === FEATURED ? (
                <Tilt className="h-full">
                  <TourCard tour={tour} featured />
                </Tilt>
              ) : (
                <TourCard tour={tour} />
              )}
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14 flex justify-center">
          <MagneticButton href="/desert-safari" variant="outline">
            View All Desert Safari Packages
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
