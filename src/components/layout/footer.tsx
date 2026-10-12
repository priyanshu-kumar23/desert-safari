import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { Logo } from "./logo";
import { NewsletterForm } from "./newsletter-form";
import { InstagramIcon } from "@/components/ui/icons";
import { footerColumns } from "@/data/home";
import { siteConfig } from "@/data/site";
import { whatsappLink, WA_GENERAL } from "@/lib/whatsapp";

const social = [
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "WhatsApp", href: whatsappLink(WA_GENERAL), Icon: MessageCircle },
  { label: "Call us", href: siteConfig.phoneHref, Icon: Phone },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-sand-200/80">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-red-500/15 blur-3xl" />
      <div className="container-x relative pb-28 pt-20 lg:pb-8">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2.2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">{siteConfig.description}</p>
            <ul className="mt-6 flex gap-3">
              {social.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex size-11 items-center justify-center rounded-full border border-sand-50/20 text-sand-50 transition-all hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-500"
                  >
                    <Icon aria-hidden className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
            <NewsletterForm />
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h2 className="font-sans text-base font-semibold text-sand-50">{col.title}</h2>
                <ul className="mt-4 space-y-1">
                  {col.links.map(([title, href]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="inline-flex min-h-9 items-center text-sm transition-colors hover:text-ember-400"
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-sand-50/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
