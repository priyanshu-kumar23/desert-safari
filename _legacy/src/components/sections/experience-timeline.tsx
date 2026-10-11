"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { SectionHeading } from "@/components/common/section-heading";
import { fadeUp, staggerContainer, viewportOnce } from "@/components/common/motion";
import { timelineSteps } from "@/data/timeline";

function TimelineStepCard({
  icon: Icon,
  title,
  time,
  description,
}: (typeof timelineSteps)[number]) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col items-start gap-3">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-red-300 bg-card text-red-500 shadow-card">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-red-500">{time}</p>
        <h3 className="mt-1 font-display text-lg font-medium text-ink-950">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-600">{description}</p>
      </div>
    </motion.div>
  );
}

export function ExperienceTimeline() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileRef,
    offset: ["start 0.8", "end 0.5"],
  });

  return (
    <section className="scroll-mt-32 bg-sand-300 px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-16"
        >
          <SectionHeading
            eyebrow="How Your Safari Runs"
            title="A full evening, mapped out"
            align="center"
            className="mx-auto items-center text-center"
          />
        </motion.div>

        <div ref={desktopRef} className="relative hidden lg:block">
          <svg
            className="pointer-events-none absolute left-0 top-6 w-full"
            height="2"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="1"
              x2="100%"
              y2="1"
              stroke="var(--color-sand-500)"
              strokeWidth="2"
            />
            <motion.line
              x1="0"
              y1="1"
              x2="100%"
              y2="1"
              stroke="var(--color-red-500)"
              strokeWidth="2"
              style={{ pathLength: desktopProgress }}
            />
          </svg>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="grid grid-cols-6 gap-6"
          >
            {timelineSteps.map((step) => (
              <TimelineStepCard key={step.title} {...step} />
            ))}
          </motion.div>
        </div>

        <div ref={mobileRef} className="relative lg:hidden">
          <svg
            className="pointer-events-none absolute left-6 top-0 h-full"
            width="2"
            preserveAspectRatio="none"
          >
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="var(--color-sand-500)"
              strokeWidth="2"
            />
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="var(--color-red-500)"
              strokeWidth="2"
              style={{ pathLength: mobileProgress }}
            />
          </svg>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="flex flex-col gap-10 pl-16"
          >
            {timelineSteps.map((step) => (
              <TimelineStepCard key={step.title} {...step} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
