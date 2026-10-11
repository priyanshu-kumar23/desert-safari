export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  tall?: boolean;
};

export const galleryImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1569670380585-19bb0feec807?w=900&h=1200&fit=crop",
    alt: "4x4 parked on red sand dunes at sunset in the Dubai desert",
    caption: "Dune bashing at golden hour",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1761207215128-229b6f8c1174?w=900&h=700&fit=crop",
    alt: "Camel caravan crossing red sand dunes",
    caption: "Camel trekking across the dunes",
  },
  {
    src: "https://images.unsplash.com/photo-1778008452928-8da3c5b9b9cd?w=900&h=700&fit=crop",
    alt: "Traditional dhow cruise on Dubai Marina at night",
    caption: "Dhow cruise, Dubai Marina",
  },
  {
    src: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=900&h=1200&fit=crop",
    alt: "Luxury yacht sailing near Dubai skyline",
    caption: "Yacht charter, Dubai coastline",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&h=700&fit=crop",
    alt: "Burj Khalifa and downtown Dubai skyline",
    caption: "Downtown Dubai city tour",
  },
  {
    src: "https://images.unsplash.com/photo-1695878868496-fcbd6ef47f57?w=900&h=700&fit=crop",
    alt: "Dune buggies kicking up sand in the desert",
    caption: "Dune buggy adventure",
  },
  {
    src: "https://images.unsplash.com/photo-1630688394042-5a4b8b5156d9?w=900&h=700&fit=crop",
    alt: "Hatta mountains and turquoise lake",
    caption: "Hatta mountain escape",
  },
  {
    src: "https://images.unsplash.com/photo-1591373894845-53da22b7c487?w=900&h=1200&fit=crop",
    alt: "Desert camp at night with a bonfire under the stars",
    caption: "Sunset camp & BBQ",
    tall: true,
  },
];
