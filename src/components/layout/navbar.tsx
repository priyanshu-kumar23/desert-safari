"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";
import { SearchDialog } from "./search-dialog";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Logo } from "./logo";
import { whatsappLink, WA_GENERAL } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Sticky nav: transparent over the hero, cream + blur after ~80px of scroll,
 * hides on scroll down and returns on scroll up.
 *
 * Layout is a 3-column grid — logo | centred nav | actions — so the columns can never overlap.
 */
export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 80);
    setHidden(y > 240 && y > prev && !menuOpen);
  });

  const solid = scrolled || menuOpen;

  return (
    <motion.header
      data-site-header
      animate={{ y: hidden ? "-110%" : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
        solid
          ? "bg-sand-100/85 text-ink-950 shadow-soft backdrop-blur-xl"
          : "bg-gradient-to-b from-ink-950/50 to-transparent text-sand-50",
      )}
    >
      <div className="container-x grid h-[4.5rem] grid-cols-[auto_1fr_auto] items-center gap-4 lg:h-20 lg:gap-6">
        <Logo tone={solid ? "dark" : "light"} />

        <div data-header-nav className="hidden min-w-0 justify-self-center lg:block">
          <MegaMenu onOpenChange={setMenuOpen} />
        </div>

        <div data-header-actions className="col-start-3 flex items-center justify-self-end gap-1.5">
          <SearchDialog />
          <a
            href={whatsappLink(WA_GENERAL)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="hidden size-11 items-center justify-center rounded-full transition-colors hover:bg-current/10 min-[1280px]:flex"
          >
            <WhatsAppIcon className="size-5" />
          </a>
          <Link
            href={whatsappLink("Hi! I'd like to enquire about a tour.")}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hidden h-11 items-center gap-1.5 rounded-full bg-red-500 pl-5 pr-4 text-sm font-medium text-sand-50 shadow-glow transition-colors hover:bg-red-600 sm:inline-flex"
          >
            Enquire
            <ArrowUpRight aria-hidden className="size-4" />
          </Link>
          <MobileNav />
        </div>
      </div>
    </motion.header>
  );
}
