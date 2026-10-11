export type Testimonial = {
  name: string;
  initials: string;
  country: string;
  rating: number;
  quote: string;
  /** A substring of `quote` to render in the red accent color. */
  highlight: string;
  tour: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Sophie Turner",
    initials: "ST",
    country: "United Kingdom",
    rating: 5,
    quote:
      "The dune bashing was insane and the BBQ dinner under the stars was the highlight of our whole trip. Our driver Ali was fantastic and made sure everyone felt safe.",
    highlight: "the highlight of our whole trip",
    tour: "Evening Desert Safari",
  },
  {
    name: "Marco Rossi",
    initials: "MR",
    country: "Italy",
    rating: 5,
    quote:
      "Booked last minute over WhatsApp and they still fit us in. Pay on arrival made it so easy — no upfront risk. Would book again in a heartbeat.",
    highlight: "no upfront risk",
    tour: "Private Hummer Safari",
  },
  {
    name: "Aiko Tanaka",
    initials: "AT",
    country: "Japan",
    rating: 5,
    quote:
      "The sunrise safari was peaceful and beautifully organized. Loved the photo stops — our guide knew exactly where to take the best shots.",
    highlight: "beautifully organized",
    tour: "Sunrise Desert Safari",
  },
  {
    name: "James Carter",
    initials: "JC",
    country: "United States",
    rating: 5,
    quote:
      "Yacht charter with the family was seamless from booking to drop-off. Everything felt premium, from the boat to the crew.",
    highlight: "seamless from booking to drop-off",
    tour: "Luxury Yacht Charter",
  },
  {
    name: "Fatima Al Suwaidi",
    initials: "FS",
    country: "UAE",
    rating: 5,
    quote:
      "As a local, I've tried a few operators — Red Sand Adventure is by far the most professional and reliable for hosting visiting family.",
    highlight: "the most professional and reliable",
    tour: "Arabian Heritage Luxury",
  },
];
