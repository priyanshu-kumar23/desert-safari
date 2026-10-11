// Central image registry. All remote hosts are whitelisted in next.config.ts.
// TODO: replace with real photography (drop files in /public/images and swap the URLs).
const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&q=75&auto=format&fit=crop`;

export const media = {
  desertDunes: unsplash("photo-1569670380585-19bb0feec807", 1400),
  desertCamp: unsplash("photo-1591373894845-53da22b7c487", 1400),
  desertSunrise: unsplash("photo-1762800639292-5a5af73e85fc", 1400),
  hummer: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/bc/d4/01.jpg",
  buggy: unsplash("photo-1695878868496-fcbd6ef47f57", 1400),
  camels: unsplash("photo-1761207215128-229b6f8c1174", 1400),
  dhow: unsplash("photo-1778008452928-8da3c5b9b9cd", 1400),
  yacht: unsplash("photo-1567899378494-47b22a2ae96a", 1400),
  dubaiCity: unsplash("photo-1512453979798-5ea266f8880c", 1400),
  abuDhabi: unsplash("photo-1724158593999-d33724005517", 1400),
  hatta: unsplash("photo-1630688394042-5a4b8b5156d9", 1400),
  museum: unsplash("photo-1686918269961-507270a5a238", 1400),
} as const;

/** Tiny warm-sand SVG used as a blur placeholder for remote images. */
export const blurDataURL =
  "data:image/svg+xml;base64," +
  "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNlOGQ1YjgiLz48L3N2Zz4=";
