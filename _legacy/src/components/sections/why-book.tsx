"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView } from "motion/react";
import { SectionHeading } from "@/components/common/section-heading";
import { fadeUp, staggerContainer, viewportOnce } from "@/components/common/motion";
import { counterStats, features } from "@/data/features";

function Counter({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function WhyBook() {
  return (
    <section id="why-us" className="scroll-mt-32 bg-sand-100 px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="relative h-[420px] overflow-hidden rounded-3xl shadow-card lg:sticky lg:top-28 lg:h-[560px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1588129584478-0808674274be?w=900&h=1100&fit=crop"
              alt="Local desert guide walking toward a 4x4 on the red dunes"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          <div className="flex flex-col gap-10">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
            >
              <SectionHeading
                eyebrow="Why Book With Us"
                title="Local expertise, zero-risk booking"
                highlight="zero-risk"
                description="We've hosted thousands of guests from over 60 countries. Here's what makes booking with us different."
              />
            </motion.div>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={staggerContainer(0.12)}
              className="flex flex-col gap-6"
            >
              {features.map(({ icon: Icon, title, description }) => (
                <motion.li key={title} variants={fadeUp} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sand-200 text-red-500">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-medium text-ink-950">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-600">{description}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="grid grid-cols-3 divide-x divide-border rounded-3xl bg-card py-6 shadow-card"
            >
              {counterStats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1 px-2 text-center">
                  <span className="font-display text-3xl font-medium text-red-500 sm:text-4xl">
                    <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                  </span>
                  <span className="text-xs text-ink-600 sm:text-sm">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
