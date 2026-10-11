export type NavLink = {
  title: string;
  href: string;
  image: string;
};

export type NavGroup = {
  title: string;
  links: NavLink[];
};

export const experienceGroups: NavGroup[] = [
  {
    title: "Desert",
    links: [
      {
        title: "Evening Desert Safari",
        href: "/tours/evening-desert-safari",
        image:
          "https://images.unsplash.com/photo-1569670380585-19bb0feec807?w=200&h=200&fit=crop",
      },
      {
        title: "Sunrise Desert Safari",
        href: "/tours/sunrise-desert-safari",
        image:
          "https://images.unsplash.com/photo-1762800639292-5a5af73e85fc?w=200&h=200&fit=crop",
      },
      {
        title: "Dune Buggy & Quad Bike",
        href: "/tours/dune-buggy-quad",
        image:
          "https://images.unsplash.com/photo-1695878868496-fcbd6ef47f57?w=200&h=200&fit=crop",
      },
      {
        title: "Private Hummer Safari",
        href: "/tours/private-hummer-safari",
        image:
          "https://images.unsplash.com/photo-1690917448793-cf9a81b31940?w=200&h=200&fit=crop",
      },
    ],
  },
  {
    title: "Water",
    links: [
      {
        title: "Dhow Cruise Marina",
        href: "/tours/dhow-cruise-marina",
        image:
          "https://images.unsplash.com/photo-1778008452928-8da3c5b9b9cd?w=200&h=200&fit=crop",
      },
      {
        title: "Luxury Yacht Charter",
        href: "/tours/yacht-charter",
        image:
          "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=200&h=200&fit=crop",
      },
    ],
  },
  {
    title: "City",
    links: [
      {
        title: "Dubai City Tour",
        href: "/tours/dubai-city-tour",
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200&h=200&fit=crop",
      },
      {
        title: "Abu Dhabi City Tour",
        href: "/tours/abu-dhabi-city-tour",
        image:
          "https://images.unsplash.com/photo-1724158593999-d33724005517?w=200&h=200&fit=crop",
      },
      {
        title: "Hatta Mountain Tour",
        href: "/tours/hatta-tour",
        image:
          "https://images.unsplash.com/photo-1630688394042-5a4b8b5156d9?w=200&h=200&fit=crop",
      },
    ],
  },
  {
    title: "Attractions",
    links: [
      {
        title: "Burj Khalifa Tickets",
        href: "/tickets/burj-khalifa",
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200&h=200&fit=crop",
      },
      {
        title: "Museum of the Future",
        href: "/tickets/museum-of-the-future",
        image:
          "https://images.unsplash.com/photo-1686918269961-507270a5a238?w=200&h=200&fit=crop",
      },
    ],
  },
];

export const primaryNavLinks = [
  { title: "Experiences", href: "/tours" },
  { title: "Packages", href: "/#packages" },
  { title: "About Us", href: "/#why-us" },
  { title: "Reviews", href: "/#testimonials" },
  { title: "Contact", href: "/#faq" },
];
