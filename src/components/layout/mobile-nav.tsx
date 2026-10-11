"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { WhatsAppIcon } from "@/components/ui/icons";
import { navigation } from "@/data/navigation";
import { whatsappLink, WA_GENERAL } from "@/lib/whatsapp";
import { Logo } from "./logo";

/** Hamburger + full-screen sheet. Visible below 1024px only. */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  // Radix locks native body scroll; also pause Lenis so wheel/touch smoothing can't leak through.
  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-current/10 lg:hidden"
      >
        <Menu aria-hidden className="size-6" />
      </SheetTrigger>

      <SheetContent aria-describedby="mobile-nav-desc">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription id="mobile-nav-desc" className="sr-only">
          Browse tour categories or contact us on WhatsApp.
        </SheetDescription>

        <div className="container-x flex h-[4.5rem] shrink-0 items-center justify-between">
          <Logo />
          <SheetClose
            aria-label="Close menu"
            className="flex size-11 items-center justify-center rounded-full bg-sand-200 text-ink-950 transition-colors hover:bg-red-500 hover:text-sand-50"
          >
            <X aria-hidden className="size-5" />
          </SheetClose>
        </div>

        <nav aria-label="Mobile" className="container-x flex-1 overflow-y-auto overscroll-contain pb-6">
          <Accordion type="single" collapsible>
            {navigation.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                animate={open ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <AccordionItem value={item.id}>
                  <AccordionTrigger>{item.label}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="-mt-2 space-y-0.5 pr-0">
                      {item.links.map((l) => (
                        <li key={l.href}>
                          <SheetClose asChild>
                            <Link
                              href={l.href}
                              className="flex min-h-11 items-center rounded-xl px-3 text-[0.95rem] font-semibold text-ink-800 transition-colors hover:bg-sand-200 hover:text-red-500"
                            >
                              {l.title}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </nav>

        <div className="sticky bottom-0 grid shrink-0 grid-cols-2 gap-3 border-t border-sand-300 bg-sand-100/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur">
          <a
            href={whatsappLink(WA_GENERAL)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-bold uppercase tracking-wider text-ink-950"
          >
            <WhatsAppIcon className="size-5" />
            WhatsApp
          </a>
          <a
            href={whatsappLink("Hi! I'd like to enquire about a tour.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center rounded-full bg-red-500 text-sm font-bold uppercase tracking-wider text-sand-50 shadow-glow"
          >
            Enquire Now
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
