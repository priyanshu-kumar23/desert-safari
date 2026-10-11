"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappLink, WA_GENERAL } from "@/lib/whatsapp";

const R = 22;
const C = 2 * Math.PI * R;
const BTN = 56; // px
const EDGE = 20; // px from the viewport bottom
const GAP = 24; // px between the two buttons

/**
 * Bottom-right stack: back-to-top (with scroll-progress ring) below, WhatsApp above it with a 24px gap.
 * Before the back-to-top button appears, WhatsApp sits at the bottom edge and glides up when it shows.
 */
export function FloatingActions() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const [showTop, setShowTop] = useState(false);
  // Hidden while the hero is on screen so the buttons can never sit on top of hero content.
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- pages without a hero show the buttons immediately
      setHeroInView(false);
      return;
    }
    const io = new IntersectionObserver(([e]) => setHeroInView(e.isIntersecting), { threshold: 0.05 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => setShowTop(y > 600));

  const toTop = () => {
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.a
        href={whatsappLink(WA_GENERAL)}
        initial={false}
        aria-hidden={heroInView}
        tabIndex={heroInView ? -1 : 0}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        animate={{ bottom: showTop ? EDGE + BTN + GAP : EDGE, opacity: heroInView ? 0 : 1, scale: heroInView ? 0.8 : 1, pointerEvents: heroInView ? "none" : "auto" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: BTN, height: BTN, bottom: EDGE }}
        className="fixed right-4 z-40 flex items-center justify-center rounded-full bg-[#25D366] text-ink-950 shadow-card transition-transform hover:scale-105 sm:right-6"
      >
        <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" />
        <WhatsAppIcon className="relative size-7" />
      </motion.a>

      <AnimatePresence>
        {showTop && !heroInView && (
          <motion.button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            style={{ width: BTN, height: BTN, bottom: EDGE }}
            className="fixed right-4 z-40 flex items-center justify-center rounded-full bg-sand-50 text-ink-950 shadow-card sm:right-6"
          >
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56" aria-hidden>
              <circle cx="28" cy="28" r={R} fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="3" />
              <motion.circle
                cx="28"
                cy="28"
                r={R}
                fill="none"
                stroke="#c8361f"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={C}
                style={{ pathLength: progress }}
              />
            </svg>
            <ArrowUp aria-hidden className="relative size-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
