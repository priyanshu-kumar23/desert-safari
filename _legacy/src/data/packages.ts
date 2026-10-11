import type { LucideIcon } from "lucide-react";
import { Car, Flame, Sunrise, Users, UtensilsCrossed, Camera } from "lucide-react";

export type PackageBadge = "Best Seller" | "Luxury" | "Private" | "New";

export type TourPackage = {
  slug: string;
  title: string;
  image: string;
  /** Falls back to `title` when omitted. */
  imageAlt?: string;
  badge: PackageBadge;
  inclusions: { icon: LucideIcon; label: string }[];
  duration: string;
  rating: number;
  reviewCount: number;
  priceAed: number;
  priceUnit: string;
};

export const packages: TourPackage[] = [
  {
    slug: "evening-desert-safari",
    title: "Evening Desert Safari",
    image:
      "https://images.unsplash.com/photo-1569670380585-19bb0feec807?w=800&h=1000&fit=crop",
    badge: "Best Seller",
    inclusions: [
      { icon: Car, label: "Dune bashing" },
      { icon: UtensilsCrossed, label: "BBQ dinner" },
      { icon: Flame, label: "Live shows" },
    ],
    duration: "6 hours",
    rating: 4.9,
    reviewCount: 2140,
    priceAed: 99,
    priceUnit: "per person",
  },
  {
    slug: "sunrise-desert-safari",
    title: "Sunrise Desert Safari",
    image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/11/f5/21/a0.jpg",
    imageAlt:
      "Two guests in white robes sitting on a rug atop a dune, watching the sun rise over the desert",
    badge: "New",
    inclusions: [
      { icon: Sunrise, label: "Sunrise views" },
      { icon: Camera, label: "Photo stops" },
      { icon: UtensilsCrossed, label: "Light breakfast" },
    ],
    duration: "4 hours",
    rating: 4.8,
    reviewCount: 860,
    priceAed: 150,
    priceUnit: "per person",
  },
  {
    slug: "arabian-heritage-luxury",
    title: "Arabian Heritage Luxury",
    image:
      "https://images.unsplash.com/photo-1591373894845-53da22b7c487?w=800&h=1000&fit=crop",
    badge: "Luxury",
    inclusions: [
      { icon: Users, label: "Private majlis" },
      { icon: UtensilsCrossed, label: "Gourmet dinner" },
      { icon: Flame, label: "Falconry show" },
    ],
    duration: "7 hours",
    rating: 5.0,
    reviewCount: 410,
    priceAed: 375,
    priceUnit: "per person",
  },
  {
    slug: "private-hummer-safari",
    title: "Private Hummer Safari",
    image:
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/bc/d4/01.jpg",
    imageAlt: "A silver Hummer dune bashing, kicking up a spray of sand on a red desert dune",
    badge: "Private",
    inclusions: [
      { icon: Car, label: "Private Hummer" },
      { icon: Users, label: "Up to 6 guests" },
      { icon: UtensilsCrossed, label: "BBQ dinner" },
    ],
    duration: "6 hours",
    rating: 5.0,
    reviewCount: 190,
    priceAed: 840,
    priceUnit: "per group (up to 6)",
  },
];
