"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/common/section-heading";
import { WhatsappIcon } from "@/components/common/whatsapp-icon";
import { fadeUp, viewportOnce } from "@/components/common/motion";
import { faqItems } from "@/data/faq";
import { siteConfig } from "@/data/site";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-32 bg-sand-50 px-4 pt-32 pb-24 text-ink-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="flex flex-col gap-8"
          >
            <SectionHeading
              eyebrow="FAQ"
              title="Questions, answered"
              highlight="answered"
              description="Everything you need to know before booking. Can't find it here? Ask us directly."
            />

            <div className="relative flex flex-col gap-4 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-ink-800 via-ink-950 to-ink-950 p-7 shadow-card">
              <div className="grain-card" />
              <p className="relative font-display text-lg font-medium text-sand-50">
                Still have questions?
              </p>
              <p className="relative text-sm leading-relaxed text-sand-400">
                Message our team on WhatsApp — we typically reply within minutes,
                any time of day.
              </p>
              <Button
                render={<a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" />}
                className="group relative w-full justify-between bg-red-500 text-sand-50 hover:bg-red-600"
              >
                <span className="flex items-center gap-2">
                  <WhatsappIcon className="size-4" />
                  Ask on WhatsApp
                </span>
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <Accordion className="flex flex-col gap-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`item-${index}`}
                  className="group/item relative overflow-hidden rounded-3xl bg-card px-6 shadow-card transition-shadow duration-300 data-open:shadow-card-hover before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-red-500 before:opacity-0 before:transition-opacity before:duration-300 data-open:before:opacity-100"
                >
                  <AccordionTrigger className="py-5 text-base font-medium text-ink-950">
                    <span className="flex items-baseline gap-4">
                      <span className="font-display text-sm font-semibold text-sand-500 tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{item.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-10 text-sm leading-relaxed text-ink-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
