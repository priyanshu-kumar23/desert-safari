import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { CategoryGrid } from "@/components/sections/category-grid";
import { FeaturedPackages } from "@/components/sections/featured-packages";
import { WhyBook } from "@/components/sections/why-book";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Testimonials } from "@/components/sections/testimonials";
import { Gallery } from "@/components/sections/gallery";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <Hero />
        <CategoryGrid />
        <FeaturedPackages />
        <WhyBook />
        <ExperienceTimeline />
        <Testimonials />
        <Gallery />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
