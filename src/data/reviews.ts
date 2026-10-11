// TODO: replace with real data. These reviews (names, text, tours) were carried over from the
// previous version of this project — confirm each is a genuine review and set the true source.
export type Review = {
  name: string;
  initial: string;
  country: string;
  rating: number;
  quote: string;
  /** Substring of `quote` rendered in the accent colour. */
  highlight: string;
  tour: string;
  source: string;
};

export const reviews: Review[] = [
  {
    name: "Sophie Turner",
    initial: "S",
    country: "United Kingdom",
    rating: 5,
    quote:
      "The dune bashing was insane and the BBQ dinner under the stars was the highlight of our whole trip. Our driver Ali was fantastic and made sure everyone felt safe.",
    highlight: "the highlight of our whole trip",
    tour: "Evening Desert Safari",
    source: "Guest review", // TODO: real source (Google / TripAdvisor)
  },
  {
    name: "Marco Rossi",
    initial: "M",
    country: "Italy",
    rating: 5,
    quote:
      "Booked last minute over WhatsApp and they still fit us in. Pay on arrival made it so easy — no upfront risk. Would book again in a heartbeat.",
    highlight: "no upfront risk",
    tour: "Private Hummer Safari",
    source: "Guest review",
  },
  {
    name: "Aiko Tanaka",
    initial: "A",
    country: "Japan",
    rating: 5,
    quote:
      "The sunrise safari was peaceful and beautifully organized. Loved the photo stops — our guide knew exactly where to take the best shots.",
    highlight: "beautifully organized",
    tour: "Sunrise Desert Safari",
    source: "Guest review",
  },
  {
    name: "James Carter",
    initial: "J",
    country: "United States",
    rating: 5,
    quote:
      "Yacht charter with the family was seamless from booking to drop-off. Everything felt premium, from the boat to the crew.",
    highlight: "seamless from booking to drop-off",
    tour: "Luxury Yacht Charter",
    source: "Guest review",
  },
  {
    name: "Fatima Al Suwaidi",
    initial: "F",
    country: "UAE",
    rating: 5,
    quote:
      "As a local, I've tried a few operators — Red Sand Adventure is by far the most professional and reliable for hosting visiting family.",
    highlight: "the most professional and reliable",
    tour: "Arabian Heritage Luxury",
    source: "Guest review",
  },
];

// TODO: verify before showing publicly (carried over from the previous version).
// Set `verified: true` once the figures are confirmed — the hero meta bar only shows the badge when true.
export const ratingSummary = { rating: 4.9, count: 3400, verified: false } as const;
