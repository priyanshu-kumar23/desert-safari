"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "@/components/common/motion";
import { SectionHeading } from "@/components/common/section-heading";
import { categories, type Category } from "@/data/categories";

const sizeClasses: Record<Category["size"], string> = {
  feature: "lg:col-span-2 lg:row-span-3",
  wide: "lg:col-span-2 lg:row-span-1",
  regular: "lg:col-span-1 lg:row-span-1",
};

export function CategoryGrid() {
  return (
    <section id="categories" className="relative z-10 -mt-8 rounded-t-[2.5rem] bg-sand-100 px-4 pt-24 pb-24 sm:-mt-12 sm:rounded-t-[3rem] sm:px-6 sm:pt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <SectionHeading
            eyebrow="Explore by Category"
            title="Find your kind of adventure"
            highlight="adventure"
            description="From red-dune thrills to calm marina sunsets — five ways to experience Dubai."
            className="mb-12"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 lg:h-[720px]"
        >
          {categories.map((category) => (
            <motion.div
              key={category.title}
              variants={fadeUp}
              className={`${sizeClasses[category.size]} h-72 sm:h-80 lg:h-auto`}
            >
              <Link
                href={category.href}
                className="focus-ring group relative block h-full w-full overflow-hidden rounded-3xl shadow-card transition-shadow duration-500 hover:shadow-card-hover"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent transition-colors duration-500 group-hover:from-ink-950/95" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                  <span className="font-display text-xl font-medium text-sand-50 transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:text-2xl">
                    {category.title}
                  </span>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sand-50/10 text-sand-50 backdrop-blur-sm transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-red-500">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
