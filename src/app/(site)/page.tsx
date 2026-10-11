import dynamic from "next/dynamic";
import { About } from "@/components/home/about";
import { CityTours } from "@/components/home/city-tours";
import { DesertOffers } from "@/components/home/desert-offers";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { PlanCta } from "@/components/home/plan-cta";
import { TourCategories } from "@/components/home/tour-categories";
import { TrustMarquee } from "@/components/home/trust-marquee";
import { faqs } from "@/data/faqs";
import { siteConfig } from "@/data/site";

// Below-the-fold, script-heavy sections are split into their own chunks.
const Experiences = dynamic(() => import("@/components/home/experiences").then((m) => m.Experiences));
const Reviews = dynamic(() => import("@/components/home/reviews").then((m) => m.Reviews));
const TravelGallery = dynamic(() => import("@/components/home/travel-gallery").then((m) => m.TravelGallery));

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${siteConfig.url}/#agency`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}/desktop_bg.png`,
    address: { "@type": "PostalAddress", ...siteConfig.address },
    sameAs: Object.values(siteConfig.social),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <TrustMarquee />
      <TourCategories />
      <About />
      <DesertOffers />
      <CityTours />
      <Experiences />
      <PlanCta />
      <Reviews />
      <TravelGallery />
      <Faq />
      <FinalCta />
    </>
  );
}
