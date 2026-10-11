import { media } from "./media";

export type NavLink = { title: string; href: string };

export type NavFeature = {
  title: string;
  href: string;
  image: string;
  blurb: string;
  /** AED price; null renders "Best price on WhatsApp". TODO: replace with real data. */
  fromAed: number | null;
};

export type NavItem = {
  id: string;
  label: string;
  links: NavLink[];
  feature?: NavFeature;
  /** lg: inline from 1024px. wide: inline from 1440px; below that it lives under "More". */
  showFrom: "lg" | "wide";
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const make = (base: string, titles: string[]): NavLink[] =>
  titles.map((title) => ({ title, href: `/${base}/${slug(title)}` }));

export const navigation: NavItem[] = [
  {
    id: "desert-safari",
    label: "Desert Safari",
    showFrom: "lg",
    links: make("desert-safari", [
      "Evening Desert Safari Dubai",
      "VIP Desert Safari Dubai",
      "Red Dune Desert Safari Dubai",
      "Desert Safari Ajman",
      "Arabian Heritage Safari",
      "Private Morning Safari",
      "Private Evening Desert Safari",
      "Sunrise Desert Safari Dubai",
      "Hummer Desert Safari Dubai",
      "Overnight Desert Safari",
    ]),
    feature: {
      title: "Evening Desert Safari",
      href: "/desert-safari/evening-desert-safari-dubai",
      image: media.desertDunes,
      blurb: "Dune bashing, BBQ dinner & live shows.",
      fromAed: 99,
    },
  },
  {
    id: "dune-buggy-bike",
    label: "Dune Buggy",
    showFrom: "wide",
    links: make("dune-buggy-bike", [
      "Single Seater Dune Buggy",
      "2 Seater Polaris Dune Buggy",
      "4 Seater Dune Buggy Dubai",
      "4 Seater Buggy + Private Pickup",
      "4 Seater Buggy 1 Hour",
    ]),
    feature: {
      title: "Dune Buggy Adventure",
      href: "/dune-buggy-bike/4-seater-dune-buggy-dubai",
      image: media.buggy,
      blurb: "Drive your own buggy across the red dunes.",
      fromAed: null,
    },
  },
  {
    id: "city-tours",
    label: "City Tours",
    showFrom: "lg",
    links: make("city-tours", [
      "Dubai Full Day City Tour",
      "Abu Dhabi City Tour",
      "Hatta Full Day Tour",
      "Dubai Half Day City Tour",
      "Abu Dhabi Half Day City Tour",
      "Hatta Half Day Tour",
    ]),
    feature: {
      title: "Dubai Full Day City Tour",
      href: "/city-tours/dubai-full-day-city-tour",
      image: media.dubaiCity,
      blurb: "Icons, old town and the skyline in one day.",
      fromAed: null,
    },
  },
  {
    id: "attraction-tickets",
    label: "Attractions",
    showFrom: "lg",
    links: make("attraction-tickets", [
      "Ain Dubai",
      "Burj Khalifa",
      "Museum of the Future",
      "Dubai Miracle Garden",
      "Atlantis Aquaventure",
      "IMG Worlds of Adventure",
      "Ski Dubai",
      "MOTIONGATE Dubai",
      "Abu Dhabi F1 2026",
      "Skydive Dubai Palm Tandem",
    ]),
    feature: {
      title: "Burj Khalifa Tickets",
      href: "/attraction-tickets/burj-khalifa",
      image: media.museum,
      blurb: "Skip the queue at the world's tallest tower.",
      fromAed: null,
    },
  },
  {
    id: "cruises-yachts",
    label: "Cruises & Yachts",
    showFrom: "wide",
    links: [
      ...make("dhow-cruise", ["Alexandra Dhow Cruise Dubai Marina"]),
      ...make("yacht-tours", ["New Year Yacht Dubai", "Private Yacht Charter Dubai"]),
    ],
    feature: {
      title: "Private Yacht Charter",
      href: "/yacht-tours/private-yacht-charter-dubai",
      image: media.yacht,
      blurb: "Your own yacht along the Dubai coastline.",
      fromAed: null,
    },
  },
  {
    id: "why-choose-us",
    label: "Why Choose Us",
    showFrom: "lg",
    links: [
      { title: "Tour Gallery", href: "/gallery" },
      { title: "Travel Blog", href: "/blog" },
      { title: "FAQs", href: "/faqs" },
      { title: "About Us", href: "/about-us" },
      { title: "Contact Us", href: "/contact-us" },
    ],
  },
];
