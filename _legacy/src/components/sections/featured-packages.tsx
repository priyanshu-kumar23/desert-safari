"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/common/section-heading";
import { fadeUp, staggerContainer, viewportOnce } from "@/components/common/motion";
import { packages, type PackageBadge } from "@/data/packages";
import { whatsappLinkWithMessage } from "@/data/site";

const badgeStyles: Record<PackageBadge, string> = {
  "Best Seller": "bg-red-500 text-sand-50",
  Luxury: "bg-ink-950 text-sand-50",
  Private: "bg-sand-600 text-sand-50",
  New: "bg-sand-300 text-ink-950",
};

export function FeaturedPackages() {
  return (
    <section id="packages" className="scroll-mt-32 bg-sand-300 px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <SectionHeading
            eyebrow="Signature Experiences"
            title="Our most-booked experiences"
            highlight="most-booked"
            description="Transparent pricing, real inclusions, no hidden fees — reserve now, pay when you arrive."
            className="mb-12"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.slug}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="group h-full"
            >
              <Card className="h-full gap-0 rounded-3xl border-none bg-card py-0 ring-0 shadow-card transition-shadow duration-500 group-hover:shadow-card-hover">
                <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-2xl p-3">
                  <div className="relative h-full w-full overflow-hidden rounded-2xl">
                    <Image
                      src={pkg.image}
                      alt={pkg.imageAlt ?? pkg.title}
                      fill
                      sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 92vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                  <Badge className={`absolute left-5 top-5 border-none ${badgeStyles[pkg.badge]}`}>
                    {pkg.badge}
                  </Badge>
                </div>

                <CardContent className="flex flex-1 flex-col gap-4 p-5">
                  <h3 className="font-display text-xl font-medium text-ink-950">{pkg.title}</h3>

                  <div className="flex flex-wrap gap-2">
                    {pkg.inclusions.map(({ icon: Icon, label }) => (
                      <span
                        key={label}
                        className="flex items-center gap-1.5 rounded-full bg-sand-200 px-2.5 py-1 text-xs text-ink-600"
                      >
                        <Icon className="size-3.5 text-red-500" />
                        {label}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-ink-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-4" />
                      {pkg.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Star className="size-4 fill-red-500 text-red-500" />
                      {pkg.rating.toFixed(1)} ({pkg.reviewCount})
                    </span>
                  </div>

                  <div className="mt-auto flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs text-ink-400">From</p>
                      <p className="font-display text-2xl font-medium text-ink-950">
                        AED {pkg.priceAed}
                      </p>
                      <p className="text-xs whitespace-nowrap text-ink-400">{pkg.priceUnit}</p>
                    </div>
                    <Button
                      render={
                        <a
                          href={whatsappLinkWithMessage(
                            `Hi! I'd like to book the ${pkg.title}.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                      className="w-full border border-primary bg-transparent text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground sm:w-auto"
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
