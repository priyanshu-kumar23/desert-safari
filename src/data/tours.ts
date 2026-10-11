import { media } from "./media";

export type TourCategory = {
  title: string;
  blurb: string;
  href: string;
  image: string;
};

export type Tour = {
  slug: string;
  title: string;
  href: string;
  image: string;
  imageAlt: string;
  badge?: string;
  description: string;
  highlights: string[];
  /** AED. null → "Best price on WhatsApp". TODO: replace nulls with real prices. */
  priceAed: number | null;
  priceUnit: string;
  duration?: string;
};

export const tourCategories: TourCategory[] = [
  { title: "Yacht Tours", blurb: "Sail the Dubai coastline", href: "/yacht-tours/private-yacht-charter-dubai", image: media.yacht },
  { title: "Attractions", blurb: "Skip-the-line tickets", href: "/attraction-tickets/burj-khalifa", image: media.museum },
  { title: "Desert Safari", blurb: "Dunes, dinner & shows", href: "/desert-safari/evening-desert-safari-dubai", image: media.desertDunes },
  { title: "City Tour", blurb: "Dubai, Abu Dhabi & Hatta", href: "/city-tours/dubai-full-day-city-tour", image: media.dubaiCity },
  { title: "Dhow Cruise", blurb: "Dinner under the skyline", href: "/dhow-cruise/alexandra-dhow-cruise-dubai-marina", image: media.dhow },
];

export const desertOffers: Tour[] = [
  {
    slug: "evening-desert-safari-dubai",
    title: "Evening Desert Safari",
    href: "/desert-safari/evening-desert-safari-dubai",
    image: media.desertDunes,
    imageAlt: "4x4 parked on red sand dunes at sunset in the Dubai desert",
    badge: "Best Seller",
    description: "Dune bashing, camel riding, sandboarding, BBQ dinner and live shows.",
    highlights: ["Dune bashing", "BBQ dinner", "Live shows"],
    priceAed: 99,
    priceUnit: "per person",
    duration: "6 hours",
  },
  {
    slug: "arabian-heritage-safari",
    title: "Arabian Heritage Luxury",
    href: "/desert-safari/arabian-heritage-safari",
    image: media.desertCamp,
    imageAlt: "Desert camp at night with a bonfire under the stars",
    badge: "Luxury",
    description: "A private majlis, gourmet dinner and falconry show in a premium camp.",
    highlights: ["Private majlis", "Gourmet dinner", "Falconry show"],
    priceAed: 375,
    priceUnit: "per person",
    duration: "7 hours",
  },
  {
    slug: "sunrise-desert-safari-dubai",
    title: "Sunrise Desert Safari",
    href: "/desert-safari/sunrise-desert-safari-dubai",
    image: media.desertSunrise,
    imageAlt: "Guests watching the sun rise over the red desert dunes",
    badge: "Early Bird",
    description: "Watch the dunes ignite at dawn, with photo stops and a light breakfast.",
    highlights: ["Sunrise views", "Photo stops", "Light breakfast"],
    priceAed: 150,
    priceUnit: "per person",
    duration: "4 hours",
  },
  {
    slug: "hummer-desert-safari-dubai",
    title: "Hummer Desert Safari",
    href: "/desert-safari/hummer-desert-safari-dubai",
    image: media.hummer,
    imageAlt: "A Hummer dune bashing, kicking up a spray of sand on a red dune",
    badge: "Private",
    description: "A private Hummer for your group, with BBQ dinner at camp.",
    highlights: ["Private Hummer", "Up to 6 guests", "BBQ dinner"],
    priceAed: 840,
    priceUnit: "per group (up to 6)",
    duration: "6 hours",
  },
];

export const cityTours: Tour[] = [
  {
    slug: "dubai-full-day-city-tour",
    title: "Dubai City Tour",
    href: "/city-tours/dubai-full-day-city-tour",
    image: media.dubaiCity,
    imageAlt: "Burj Khalifa and downtown Dubai skyline",
    badge: "Full Day",
    description: "Burj Khalifa, Dubai Mall, Jumeirah and the old souks in a single day.",
    highlights: ["Burj Khalifa", "Old Dubai", "Jumeirah"],
    priceAed: null,
    priceUnit: "per person",
  },
  {
    slug: "abu-dhabi-city-tour",
    title: "Abu Dhabi City Tour",
    href: "/city-tours/abu-dhabi-city-tour",
    image: media.abuDhabi,
    imageAlt: "Sheikh Zayed Grand Mosque in Abu Dhabi",
    badge: "Culture",
    description: "The Grand Mosque, Corniche and the best of the capital.",
    highlights: ["Grand Mosque", "Corniche", "Heritage Village"],
    priceAed: null,
    priceUnit: "per person",
  },
  {
    slug: "hatta-full-day-tour",
    title: "Hatta Mountain Tour",
    href: "/city-tours/hatta-full-day-tour",
    image: media.hatta,
    imageAlt: "Hatta mountains and turquoise lake",
    badge: "Scenic",
    description: "Mountain roads, turquoise dam views and heritage village stops.",
    highlights: ["Hatta Dam", "Heritage Village", "Mountain views"],
    priceAed: null,
    priceUnit: "per person",
  },
];

export const cityToursFeature = {
  title: "See All City Tours",
  blurb: "Full-day and half-day tours across Dubai, Abu Dhabi and Hatta.",
  href: "/city-tours",
  image: media.abuDhabi,
};

export const experiences: Tour[] = [
  {
    slug: "evening-desert-safari-dubai",
    title: "Evening Desert Safari",
    href: "/desert-safari/evening-desert-safari-dubai",
    image: media.desertDunes,
    imageAlt: "4x4 on red sand dunes at sunset",
    badge: "Best Seller",
    description: "Golden-hour dune bashing followed by BBQ dinner under the stars.",
    highlights: [],
    priceAed: 99,
    priceUnit: "per person",
  },
  {
    slug: "alexandra-dhow-cruise-dubai-marina",
    title: "Dhow Cruise Dubai Marina",
    href: "/dhow-cruise/alexandra-dhow-cruise-dubai-marina",
    image: media.dhow,
    imageAlt: "Traditional dhow cruise on Dubai Marina at night",
    badge: "Family Favorite",
    description: "A relaxed dinner cruise past the glittering Marina skyline.",
    highlights: [],
    priceAed: null,
    priceUnit: "per person",
  },
  {
    slug: "4-seater-dune-buggy-dubai",
    title: "Dune Buggy Adventure",
    href: "/dune-buggy-bike/4-seater-dune-buggy-dubai",
    image: media.buggy,
    imageAlt: "Dune buggies kicking up sand in the desert",
    badge: "Adventure",
    description: "Take the wheel and carve your own line through the dunes.",
    highlights: [],
    priceAed: null,
    priceUnit: "per buggy",
  },
  {
    slug: "private-hummer-safari",
    title: "Private Hummer Safari",
    href: "/desert-safari/hummer-desert-safari-dubai",
    image: media.hummer,
    imageAlt: "A Hummer dune bashing on a red dune",
    badge: "Private Tour",
    description: "Your own Hummer, driver and pace — exclusive to your group.",
    highlights: [],
    priceAed: 840,
    priceUnit: "per group (up to 6)",
  },
];
