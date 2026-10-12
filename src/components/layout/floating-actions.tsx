"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";
import { ChatButton } from "@/components/ui/chat-button";

const R = 22;
const C = 2 * Math.PI * R;

/**
 * Bottom-right stack: back-to-top (after one viewport of scrolling) directly above the chat FAB, 12px apart,
 * same size and edge. Both stay hidden while the hero is on screen so they never sit on hero content.
 */
export function FloatingActions() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const [showTop, setShowTop] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const [seen, setSeen] = useState(false); // the chat dot starts its two pulses the first time the FAB appears

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- pages without a hero show the buttons immediately
      setHeroInView(false);
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        setHeroInView(e.isIntersecting);
        if (!e.isIntersecting) setSeen(true);
      },
      { threshold: 0.05 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => setShowTop(y > window.innerHeight));

  const toTop = () => {
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      data-floating-actions
      className="pointer-events-none fixed bottom-[max(16px,env(safe-area-inset-bottom))] right-4 z-40 flex flex-col items-end gap-3 lg:bottom-6 lg:right-6"
    >
      <AnimatePresence>
        {showTop && !heroInView && (
          <motion.button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="pointer-events-auto relative flex size-[52px] items-center justify-center rounded-full border border-white/10 bg-[rgb(20_17_15/0.7)] text-white backdrop-blur-xl lg:size-14"
          >
            <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 56 56" aria-hidden>
              <circle cx="28" cy="28" r={R} fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="3" />
              <motion.circle
                cx="28"
                cy="28"
                r={R}
                fill="none"
                stroke="#e0701f"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={C}
                style={{ pathLength: progress }}
              />
            </svg>
            <ArrowUp aria-hidden strokeWidth={1.75} className="relative size-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        aria-hidden={heroInView}
        animate={{ opacity: heroInView ? 0 : 1, scale: heroInView ? 0.8 : 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={heroInView ? "pointer-events-none" : "pointer-events-auto"}
        inert={heroInView}
      >
        <ChatButton variant="solid" tooltip="left" className="size-[52px] lg:size-14">
          {seen && (
            <span
              aria-hidden
              className="absolute right-0.5 top-0.5 size-3 animate-[chat-dot_1.2s_ease-out_2] rounded-full border-2 border-red-500 bg-ember-400"
            />
          )}
        </ChatButton>
      </motion.div>
    </div>
  );
}
