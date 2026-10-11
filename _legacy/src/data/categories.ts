export type Category = {
  title: string;
  href: string;
  image: string;
  size: "feature" | "wide" | "regular";
};

export const categories: Category[] = [
  {
    title: "Desert Safari",
    href: "/tours/evening-desert-safari",
    image:
      "https://images.unsplash.com/photo-1569670380585-19bb0feec807?w=1200&h=1500&fit=crop",
    size: "feature",
  },
  {
    title: "Dune Buggy & Quad",
    href: "/tours/dune-buggy-quad",
    image:
      "https://images.unsplash.com/photo-1695878868496-fcbd6ef47f57?w=900&h=700&fit=crop",
    size: "regular",
  },
  {
    title: "Dhow Cruise",
    href: "/tours/dhow-cruise-marina",
    image:
      "https://images.unsplash.com/photo-1778008452928-8da3c5b9b9cd?w=900&h=700&fit=crop",
    size: "regular",
  },
  {
    title: "Yacht Charter",
    href: "/tours/yacht-charter",
    image:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&h=700&fit=crop",
    size: "wide",
  },
  {
    title: "City Tours",
    href: "/tours/dubai-city-tour",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&h=700&fit=crop",
    size: "wide",
  },
];
