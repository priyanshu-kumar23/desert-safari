"use client";

import { useEffect, useRef } from "react";

const N = 25;

/**
 * Phones only: a few grains of blowing sand over the ridge.
 * Everything pauses when the hero is off-screen or the tab is hidden; nothing runs for reduced motion.
 */
export function HeroAtmosphere() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!el || !cv || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const phone = window.matchMedia("(max-width: 767px)");

    let w = 0;
    let h = 0;
    const grains = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: 0.38 + Math.random() * 0.34, // the middle band, over the ridge
      r: 0.6 + Math.random() * 1.3,
      v: 0.012 + Math.random() * 0.03, // fractions of the width per second
      a: 0.12 + Math.random() * 0.33,
      ph: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = el.clientWidth;
      h = el.clientHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let raf = 0;
    let last = 0;
    let visible = true;
    const tick = (t: number) => {
      const dt = Math.min((t - last) / 1000 || 0, 0.05);
      last = t;
      ctx.clearRect(0, 0, w, h);
      for (const g of grains) {
        g.x += g.v * dt;
        if (g.x > 1.02) {
          g.x = -0.02;
          g.y = 0.38 + Math.random() * 0.34;
        }
        const y = (g.y + Math.sin(t / 1400 + g.ph) * 0.012) * h;
        ctx.fillStyle = `rgba(255, 224, 186, ${g.a})`;
        ctx.beginPath();
        ctx.arc(g.x * w, y, g.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    const sync = () => {
      const run = visible && !document.hidden && phone.matches && !reduce.matches;
      el.dataset.active = String(run);
      cancelAnimationFrame(raf);
      if (run) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(el);
    const ro = new ResizeObserver(() => {
      resize();
      sync();
    });
    ro.observe(el);
    document.addEventListener("visibilitychange", sync);
    phone.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    sync();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      phone.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div ref={wrap} data-active="false" aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden md:hidden">
      <canvas ref={canvas} className="absolute inset-0 size-full" />
    </div>
  );
}
