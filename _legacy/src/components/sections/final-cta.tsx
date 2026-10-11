"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WhatsappIcon } from "@/components/common/whatsapp-icon";
import { fadeUp, staggerContainer, viewportOnce } from "@/components/common/motion";
import { siteConfig } from "@/data/site";

export function FinalCta() {
  return (
    <section className="scroll-mt-32 relative overflow-hidden px-4 pt-32 pb-28 sm:px-6 lg:px-8">
      <Image
        src="https://images.unsplash.com/photo-1784749464954-3603b21a7a0d?w=1920&h=1080&fit=crop&q=80"
        alt="Luxury desert camp lounge overlooking the dunes at dusk"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink-950/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/60" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer(0.12)}
        className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 text-center"
      >
        <motion.span variants={fadeUp} className="eyebrow">
          Ready When You Are
        </motion.span>
        <motion.h2
          variants={fadeUp}
          className="text-balance-pretty font-display text-4xl font-medium leading-[1.02] tracking-tight text-sand-50 sm:text-5xl lg:text-6xl"
        >
          Let&apos;s get you into the <span className="text-red-400">dunes</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="max-w-lg text-lg text-sand-300">
          Message us your date and guest count, or reach out directly — we
          confirm most bookings within minutes.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
          <Button
            render={<a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" />}
            size="lg"
            className="bg-red-500 text-sand-50 shadow-lg shadow-ink-950/40 hover:bg-red-600"
          >
            <WhatsappIcon className="size-4" />
            WhatsApp Us
          </Button>
          <Button
            render={<a href={siteConfig.phoneHref} />}
            size="lg"
            variant="outline"
            className="border-sand-100/30 bg-transparent text-sand-50 hover:bg-sand-50/10 hover:text-sand-50"
          >
            <Phone className="size-4" />
            {siteConfig.phone}
          </Button>
        </motion.div>

        <motion.form
          variants={fadeUp}
          onSubmit={(e) => e.preventDefault()}
          className="mt-4 flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:flex-row sm:items-end"
        >
          <div className="flex flex-1 flex-col gap-1.5 text-left">
            <label htmlFor="cta-date" className="text-xs font-medium text-sand-300">
              Tour date
            </label>
            <Input
              id="cta-date"
              type="date"
              className="border-white/15 bg-ink-950/60 text-sand-50 placeholder:text-sand-500"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1.5 text-left">
            <label htmlFor="cta-guests" className="text-xs font-medium text-sand-300">
              Guests
            </label>
            <Input
              id="cta-guests"
              type="number"
              min={1}
              placeholder="2"
              className="border-white/15 bg-ink-950/60 text-sand-50 placeholder:text-sand-500"
            />
          </div>
          <Button type="submit" className="bg-red-500 text-sand-50 hover:bg-red-600 sm:w-auto">
            <Send className="size-4" />
            Send
          </Button>
        </motion.form>
      </motion.div>
    </section>
  );
}
