import { siteConfig } from "@/data/site";

/** Builds a wa.me link with an optional prefilled message. */
export function whatsappLink(message?: string) {
  const base = siteConfig.whatsappHref;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const WA_GENERAL = "Hi Red Sand Adventure! I'd like help planning a trip in Dubai.";
