export const siteConfig = {
  name: "Red Sand Adventure DXB",
  shortName: "Red Sand Adventure",
  tagline: "Licensed UAE Tour Operator · Since 2016",
  description:
    "Premium desert safaris, dune buggy & quad rides, dhow cruises, yacht charters and city tours in Dubai. Instant confirmation, free cancellation, pay on arrival.",
  url: "https://www.redsandadventuredxb.com",
  phone: "+92 320 6331750",
  phoneHref: "tel:+923206331750",
  whatsapp: "+92 320 6331750",
  whatsappHref: "https://wa.me/923206331750",
  email: "hello@redsandadventuredxb.com",
  addressDisplay: "Sheikh Zayed Road, Dubai, United Arab Emirates",
  address: {
    streetAddress: "Sheikh Zayed Road",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  social: {
    instagram: "https://instagram.com/redsandadventuredxb",
    facebook: "https://facebook.com/redsandadventuredxb",
    tiktok: "https://tiktok.com/@redsandadventuredxb",
    youtube: "https://youtube.com/@redsandadventuredxb",
  },
  stats: {
    bookingsPerMonth: 1200,
    yearsOperating: 9,
    rating: 4.9,
    reviewCount: 3400,
  },
} as const;

export function whatsappLinkWithMessage(message: string) {
  return `${siteConfig.whatsappHref}?text=${encodeURIComponent(message)}`;
}
