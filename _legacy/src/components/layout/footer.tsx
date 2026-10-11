import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { WhatsappIcon } from "@/components/common/whatsapp-icon";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/common/social-icons";
import { experienceGroups } from "@/data/nav";
import { siteConfig } from "@/data/site";

const trustBadges = [
  "Licensed Tour Operator",
  "Instant Confirmation",
  "Free Cancellation",
  "Pay on Arrival",
];

export function Footer() {
  return (
    <footer className="bg-ink-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-3 lg:col-span-2">
            <Link href="/" className="font-display text-xl font-bold text-sand-50">
              Red Sand<span className="text-red-400"> Adventure</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-sand-500">
              Licensed Dubai tour operator crafting premium desert safaris, water
              adventures and city tours since 2016.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.instagram}
                aria-label="Instagram"
                className="focus-ring flex size-9 items-center justify-center rounded-full border border-ink-800 text-sand-300 transition-colors hover:border-red-400 hover:text-red-400"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                aria-label="Facebook"
                className="focus-ring flex size-9 items-center justify-center rounded-full border border-ink-800 text-sand-300 transition-colors hover:border-red-400 hover:text-red-400"
              >
                <FacebookIcon className="size-4" />
              </a>
              <a
                href={siteConfig.social.youtube}
                aria-label="YouTube"
                className="focus-ring flex size-9 items-center justify-center rounded-full border border-ink-800 text-sand-300 transition-colors hover:border-red-400 hover:text-red-400"
              >
                <YoutubeIcon className="size-4" />
              </a>
            </div>
          </div>

          {experienceGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sand-600">
                {group.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="focus-ring rounded-sm text-sm text-sand-300 transition-colors hover:text-red-400"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 flex flex-col gap-3 sm:col-span-3 lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sand-600">
              Contact
            </p>
            <a
              href={siteConfig.whatsappHref}
              className="focus-ring flex items-center gap-2 rounded-sm text-sm text-sand-300 hover:text-red-400"
            >
              <WhatsappIcon className="size-4 shrink-0" />
              {siteConfig.whatsapp}
            </a>
            <a
              href={siteConfig.phoneHref}
              className="focus-ring flex items-center gap-2 rounded-sm text-sm text-sand-300 hover:text-red-400"
            >
              <Phone className="size-4 shrink-0" />
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="focus-ring flex items-center gap-2 rounded-sm text-sm text-sand-300 hover:text-red-400"
            >
              <Mail className="size-4 shrink-0" />
              {siteConfig.email}
            </a>
            <p className="flex items-start gap-2 text-sm text-sand-300">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              {siteConfig.addressDisplay}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-ink-800 py-6">
          {trustBadges.map((badge) => (
            <span key={badge} className="text-xs font-medium uppercase tracking-wide text-sand-500">
              {badge}
            </span>
          ))}
        </div>

        <p className="pt-6 text-center text-xs text-sand-600 sm:text-left">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
