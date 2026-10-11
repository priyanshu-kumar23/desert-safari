"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, ChevronDown, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEnquire } from "@/components/common/enquire-modal";
import { staggerContainer, fadeUp } from "@/components/common/motion";
import { pillButtonClass } from "@/components/common/pill-button";
import { cn } from "@/lib/utils";
import { experienceGroups, primaryNavLinks } from "@/data/nav";
import { siteConfig } from "@/data/site";

const sectionIds = primaryNavLinks
  .filter((link) => link.href.startsWith("/#"))
  .map((link) => link.href.replace("/#", ""));

export function Header() {
  const openEnquire = useEnquire();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  useEffect(() => {
    // Handle restored scroll positions and direct anchor loads, too.
    const frame = requestAnimationFrame(() => setScrolled(window.scrollY > 80));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.debug("[Header]", { scrolled, scrollY: window.scrollY, threshold: 80 });
    }
  }, [scrolled]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header data-scrolled={scrolled} className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 sm:px-6 lg:px-12">
      <motion.div
        onMouseLeave={() => setMenuOpen(false)}
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(20, 18, 16, 1)" : "rgba(20, 18, 16, 0)",
          "--nav-scroll": scrolled ? 1 : 0,
          boxShadow: scrolled ? "0px 12px 32px -6px rgba(20, 18, 16, 0.45)" : "0px 0px 0px 0px rgba(20, 18, 16, 0)",
        }}
        transition={{ type: "spring", stiffness: 240, damping: 30 }}
        style={{
          marginTop: "calc(max(var(--nav-top), env(safe-area-inset-top)) - var(--nav-scroll, 0) * var(--nav-travel))",
          paddingRight: "calc(var(--nav-padding) + var(--nav-scroll, 0) * var(--nav-padding-travel))",
          paddingLeft:
            "calc(var(--nav-padding) + var(--nav-scroll, 0) * (var(--nav-padding-travel) + var(--nav-pl-extra)))",
          paddingBlock: "calc(var(--nav-py) - var(--nav-scroll, 0) * var(--nav-py-travel))",
        }}
        className="pointer-events-auto relative mx-auto flex w-full max-w-[1600px] min-h-16 items-center justify-between gap-1 max-[359px]:gap-0 rounded-3xl sm:rounded-full [--nav-top:12px] [--nav-travel:0px] [--nav-padding:8px] [--nav-padding-travel:0px] [--nav-pl-extra:8px] [--nav-py:10px] [--nav-py-travel:2px] sm:min-h-[72px] sm:gap-4 sm:[--nav-top:40px] sm:[--nav-travel:24px] sm:[--nav-padding:0px] sm:[--nav-padding-travel:clamp(8px,1.5vw,24px)] sm:[--nav-pl-extra:0px] sm:[--nav-py:12px] sm:[--nav-py-travel:6px]"
      >
        <Link
          href="/"
          className="focus-ring shrink-0 rounded-sm font-display font-bold tracking-tight text-sand-50"
        >
          <span className="flex flex-col sm:hidden">
            <span className="text-[16px] leading-[0.95] whitespace-nowrap">Red Sand</span>
            <span className="text-[16px] leading-[0.95] whitespace-nowrap text-red-400">Adventure</span>
          </span>
          <span className="hidden text-[22px] leading-none whitespace-nowrap sm:inline xl:text-[26px]">
            Red Sand<span className="text-red-400"> Adventure</span>
          </span>
        </Link>

        <nav className="mx-auto hidden shrink-0 items-center gap-8 xl:flex">
          {primaryNavLinks.map((link) => {
            const linkId = link.href.startsWith("/#") ? link.href.replace("/#", "") : null;
            const isActive = linkId !== null && linkId === activeId;

            return link.title === "Experiences" ? (
              <div key={link.title} className="relative" onMouseEnter={() => setMenuOpen(true)}>
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((v) => !v)}
                  className={`focus-ring group relative flex items-center gap-1 rounded-sm px-3 py-2 text-base font-medium transition-colors after:absolute after:bottom-0.5 after:left-3 after:h-[1.5px] after:bg-red-400 after:transition-all after:duration-300 ${
                    menuOpen
                      ? "text-red-400 after:w-[calc(100%-1.5rem)]"
                      : "text-sand-200 after:w-0 hover:text-red-400 hover:after:w-[calc(100%-1.5rem)]"
                  }`}
                >
                  {link.title}
                  <ChevronDown
                    className={`size-3.5 transition-transform duration-300 ${menuOpen ? "-rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                      role="menu"
                      className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-4"
                    >
                      <div className="grid grid-cols-4 gap-6 rounded-3xl bg-card p-6 shadow-card-hover">
                        {experienceGroups.map((group) => (
                          <div key={group.title} className="flex flex-col gap-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-400">
                              {group.title}
                            </p>
                            <ul className="flex flex-col gap-3">
                              {group.links.map((item) => (
                                <li key={item.title}>
                                  <Link
                                    href={item.href}
                                    role="menuitem"
                                    onClick={() => setMenuOpen(false)}
                                    className="focus-ring group/link flex items-center gap-2.5 rounded-md"
                                  >
                                    <span className="relative size-10 shrink-0 overflow-hidden rounded-lg">
                                      <Image
                                        src={item.image}
                                        alt=""
                                        fill
                                        sizes="40px"
                                        className="object-cover transition-transform duration-500 group-hover/link:scale-110"
                                      />
                                    </span>
                                    <span className="text-sm text-ink-800 transition-colors group-hover/link:text-red-500">
                                      {item.title}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.title}
                href={link.href}
                className={`focus-ring group relative rounded-sm px-3 py-2 text-base font-medium transition-colors after:absolute after:bottom-0.5 after:left-3 after:h-[1.5px] after:bg-red-400 after:transition-all after:duration-300 ${
                  isActive
                    ? "text-red-400 after:w-[calc(100%-1.5rem)]"
                    : "text-sand-200 after:w-0 hover:text-red-400 hover:after:w-[calc(100%-1.5rem)]"
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Search tours"
            onClick={() => setSearchOpen(true)}
            className="focus-ring flex size-10 shrink-0 items-center justify-center rounded-full text-sand-200 transition-colors hover:bg-ink-800 hover:text-sand-50 sm:size-11"
          >
            <Search className="size-4" />
          </button>

          <button
            type="button"
            onClick={openEnquire}
            className={cn(pillButtonClass({ size: "compact", trailing: "badge" }), "hidden sm:inline-flex")}
          >
            ENQUIRE NOW
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-sand-50 sm:size-8 text-red-500">
              <ArrowUpRight className="size-4" />
            </span>
          </button>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger
            render={
              <button
                type="button"
                aria-label="Open menu"
                className="focus-ring flex size-10 shrink-0 items-center justify-center rounded-full text-sand-50 sm:size-11 xl:hidden"
              />
            }
          >
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[85vw] max-w-sm rounded-l-[2rem] border-none bg-sand-100 text-ink-950"
          >
            <SheetHeader>
              <SheetTitle className="font-display text-xl text-ink-950">
                Red Sand<span className="text-red-500"> Adventure</span>
              </SheetTitle>
            </SheetHeader>

            <motion.nav
              variants={staggerContainer(0.06)}
              initial="hidden"
              animate={sheetOpen ? "show" : "hidden"}
              className="flex flex-col gap-1 px-4"
            >
              <motion.div variants={fadeUp} className="pb-4">
                <button
                  type="button"
                  onClick={() => {
                    setSheetOpen(false);
                    setSearchOpen(true);
                  }}
                  className="focus-ring flex w-full items-center gap-2.5 rounded-full border border-border bg-sand-100 px-4 py-3 text-left text-sm text-ink-400"
                >
                  <Search className="size-4 shrink-0" />
                  Search experiences
                </button>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Accordion>
                  <AccordionItem value="experiences" className="border-border">
                    <AccordionTrigger className="text-base font-medium text-ink-950 hover:text-red-500 hover:no-underline">
                      Experiences
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-4 pt-2">
                        {experienceGroups.map((group) => (
                          <div key={group.title}>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-ink-400">
                              {group.title}
                            </p>
                            <ul className="flex flex-col gap-2">
                              {group.links.map((item) => (
                                <li key={item.title}>
                                  <SheetClose
                                    render={
                                      <Link
                                        href={item.href}
                                        className="focus-ring block rounded-sm py-1 text-sm text-ink-600 hover:text-red-500"
                                      />
                                    }
                                  >
                                    {item.title}
                                  </SheetClose>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>

              {primaryNavLinks
                .filter((l) => l.title !== "Experiences")
                .map((link) => (
                  <motion.div key={link.title} variants={fadeUp}>
                    <SheetClose
                      render={
                        <Link
                          href={link.href}
                          className="focus-ring block rounded-sm px-1 py-3 text-base font-medium text-ink-950 hover:text-red-500"
                        />
                      }
                    >
                      {link.title}
                    </SheetClose>
                  </motion.div>
                ))}

              <motion.div variants={fadeUp} className="mt-4 flex flex-col gap-3 border-t border-border pt-6">
                <a
                  href={siteConfig.phoneHref}
                  className="focus-ring text-sm font-medium text-ink-600"
                >
                  {siteConfig.phone}
                </a>
                <p className="text-center text-xs text-ink-400">
                  Free cancellation · Pay on arrival
                </p>
                <motion.button
                  type="button"
                  onClick={() => {
                    setSheetOpen(false);
                    openEnquire();
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0.4 }}
                  className="focus-ring group flex h-14 w-full shrink-0 items-center justify-between rounded-2xl bg-gradient-to-b from-red-400 to-red-500 py-0 pr-2 pl-6 text-sand-50 shadow-glow-red"
                >
                  <span className="text-sm font-semibold tracking-[0.08em] uppercase">
                    ENQUIRE NOW
                  </span>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sand-50/90 text-red-500 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowUpRight className="size-4" />
                  </span>
                </motion.button>
              </motion.div>
            </motion.nav>
          </SheetContent>
        </Sheet>
        </div>
      </motion.div>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-lg rounded-3xl border-none bg-card p-6 shadow-card-hover">
          <DialogTitle className="font-display text-xl text-ink-950">
            Search experiences
          </DialogTitle>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Input
              autoFocus
              placeholder="Try “dune buggy” or “yacht”"
              className="border-border bg-sand-100 text-ink-950 placeholder:text-ink-400"
            />
            <Button type="submit" className="bg-red-500 text-sand-50 hover:bg-red-600 sm:w-auto">
              <Search className="size-4" />
              Search
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}
