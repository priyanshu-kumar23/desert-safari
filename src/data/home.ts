import { media } from "./media";

// TODO: replace with own photography. The hero plate is a licensed Unsplash photo (see public/images/hero/CREDITS.md).
export const heroContent = {
  popular: {
    title: "Evening Desert Safari",
    fromAed: 99,
    features: ["Dune Bashing", "BBQ Dinner", "Live Shows"],
    href: "/desert-safari/evening-desert-safari-dubai",
  },
  eyebrow: "Dubai · Desert safaris & UAE tours",
  subtext: "Dune bashing, camel rides and BBQ dinners under the stars.",
  trust: ["Pay on arrival", "Free cancellation", "Best price"],
};

export const usps = [
  "Best Price Guarantee",
  "Free Cancellation",
  "Pay on Arrival",
  "Instant WhatsApp Confirmation",
  "Licensed UAE Tour Operator",
];

export const about = {
  eyebrow: "Authentic Desert Adventures",
  title: "Crafted by Locals Who Love the",
  accent: "Dunes",
  imageAlt: "A white Land Cruiser dune bashing through red sand, kicking up a wall of dust",
  badge: { title: "Dubai Desert Experts", sub: "Local drivers & guides" },
  copy: "We are a Dubai-based tour operator that lives and breathes the desert. From golden-hour dune bashing to quiet sunrise dunes and private luxury camps, every trip is run by experienced local drivers and confirmed instantly on WhatsApp.",
  features: [
    { icon: "steering", title: "Experienced Drivers", text: "Trained, vetted local drivers who know every dune." },
    { icon: "package", title: "All-Inclusive Packages", text: "Transfers, activities and dinner — nothing hidden." },
    { icon: "calendar", title: "Easy Booking", text: "Message us on WhatsApp and pay on arrival." },
  ] as const,
  // TODO: replace with verified numbers (carried over from the previous site version).
  stats: [
    { label: "Bookings / month", value: 1200, suffix: "+", decimals: 0 },
    { label: "Years operating", value: 9, suffix: "+", decimals: 0 },
    { label: "Average rating", value: 4.9, suffix: "", decimals: 1 },
  ],
};

export const planTrip = {
  title: "Make Your Dubai Trip",
  accent: "Unforgettable",
  chips: ["Desert Safari", "Dune Buggy", "City Tours", "Attractions", "Dhow Cruise", "Yacht Tours"],
  image: media.desertDunes,
};

export type GalleryItem = { src: string; alt: string; caption: string; span: string };

export const gallery: GalleryItem[] = [
  { src: media.desertDunes, alt: "4x4 parked on red sand dunes at sunset", caption: "Dune bashing at golden hour", span: "md:col-span-2 md:row-span-2" },
  { src: media.camels, alt: "Camel caravan crossing red sand dunes", caption: "Camel trekking", span: "" },
  { src: media.dhow, alt: "Traditional dhow cruise on Dubai Marina at night", caption: "Dhow cruise, Dubai Marina", span: "" },
  { src: media.yacht, alt: "Luxury yacht sailing near Dubai skyline", caption: "Yacht charter", span: "md:row-span-2" },
  { src: media.dubaiCity, alt: "Burj Khalifa and downtown Dubai skyline", caption: "Downtown Dubai", span: "" },
  { src: media.buggy, alt: "Dune buggies kicking up sand", caption: "Dune buggy adventure", span: "md:col-span-2" },
  { src: media.hatta, alt: "Hatta mountains and turquoise lake", caption: "Hatta mountain escape", span: "" },
  { src: media.desertCamp, alt: "Desert camp at night with a bonfire", caption: "Sunset camp & BBQ", span: "" },
];

export const finalCta = {
  title: "Not Sure Which UAE Experience to Choose?",
  text: "Tell us your dates, group and interests — we'll recommend the best fit and the best price.",
};

export const footerColumns = [
  {
    title: "Desert Safari",
    links: [
      ["Evening Desert Safari", "/desert-safari/evening-desert-safari-dubai"],
      ["VIP Desert Safari", "/desert-safari/vip-desert-safari-dubai"],
      ["Sunrise Desert Safari", "/desert-safari/sunrise-desert-safari-dubai"],
      ["Hummer Desert Safari", "/desert-safari/hummer-desert-safari-dubai"],
      ["Overnight Desert Safari", "/desert-safari/overnight-desert-safari"],
    ],
  },
  {
    title: "Dune Buggy",
    links: [
      ["Single Seater Buggy", "/dune-buggy-bike/single-seater-dune-buggy"],
      ["2 Seater Polaris Buggy", "/dune-buggy-bike/2-seater-polaris-dune-buggy"],
      ["4 Seater Dune Buggy", "/dune-buggy-bike/4-seater-dune-buggy-dubai"],
      ["Buggy 1 Hour", "/dune-buggy-bike/4-seater-buggy-1-hour"],
    ],
  },
  {
    title: "City Tours & Attractions",
    links: [
      ["Dubai City Tour", "/city-tours/dubai-full-day-city-tour"],
      ["Abu Dhabi City Tour", "/city-tours/abu-dhabi-city-tour"],
      ["Hatta Tour", "/city-tours/hatta-full-day-tour"],
      ["Burj Khalifa", "/attraction-tickets/burj-khalifa"],
      ["Dhow Cruise Marina", "/dhow-cruise/alexandra-dhow-cruise-dubai-marina"],
    ],
  },
  {
    title: "Help & Contact",
    links: [
      ["About Us", "/about-us"],
      ["Contact Us", "/contact-us"],
      ["Privacy Policy", "/privacy-policy"],
      ["Terms & Conditions", "/terms-and-conditions"],
      ["Cancellation & Refund", "/cancellation-and-refund"],
    ],
  },
] as const;
