"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { PriceTag } from "@/components/ui/price-tag";
import { blurDataURL } from "@/data/media";
import { navigation, type NavItem } from "@/data/navigation";
import { cn } from "@/lib/utils";

const showClass: Record<NavItem["showFrom"], string> = {
  lg: "",
  wide: "hidden min-[1440px]:block",
};
const hideInMoreClass: Record<NavItem["showFrom"], string> = {
  lg: "",
  wide: "min-[1440px]:hidden",
};

function LinkList({ item, columns }: { item: NavItem; columns: 1 | 2 }) {
  return (
    <ul className={cn("grid gap-x-6 gap-y-0.5", columns === 2 && "grid-cols-2")}>
      {item.links.map((l) => (
        <li key={l.href}>
          <NavigationMenuLink asChild>
            <Link
              href={l.href}
              className="group/link flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 text-[0.92rem] font-semibold text-ink-800 transition-colors hover:bg-sand-200 hover:text-red-500"
            >
              {l.title}
              <ArrowUpRight
                aria-hidden
                className="size-4 -translate-x-1 opacity-0 transition-all group-hover/link:translate-x-0 group-hover/link:opacity-100"
              />
            </Link>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  );
}

function FeatureCard({ item }: { item: NavItem }) {
  const f = item.feature;
  if (!f) return null;
  return (
    <NavigationMenuLink asChild>
      <Link
        href={f.href}
        className="group relative flex min-h-[18rem] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] text-sand-50"
      >
        <Image
          src={f.image}
          alt=""
          fill
          sizes="320px"
          placeholder="blur"
          blurDataURL={blurDataURL}
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
        <div className="relative p-5">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ember-400">Featured</p>
          <p className="mt-1 font-sans text-xl font-semibold leading-tight">{f.title}</p>
          <p className="mt-1 text-sm text-sand-200/80">{f.blurb}</p>
          <PriceTag priceAed={f.fromAed} tone="dark" className="mt-3 [&_span.font-display]:text-2xl" />
        </div>
      </Link>
    </NavigationMenuLink>
  );
}

export function MegaMenu({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const primary = navigation.filter((i) => i.id !== "why-choose-us");
  // "More" always holds Why Choose Us; below 1440px it also holds the categories hidden from the bar.
  const moreItems = navigation.filter((i) => i.showFrom === "wide" || i.id === "why-choose-us");

  return (
    <NavigationMenu onValueChange={(v) => onOpenChange(Boolean(v))} aria-label="Main">
      <NavigationMenuList>
        {primary.map((item) => (
          <NavigationMenuItem key={item.id} className={showClass[item.showFrom]}>
            <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div
                className={cn(
                  "grid gap-5 p-5 text-ink-950",
                  item.feature
                    ? item.links.length > 5
                      ? "w-[min(54rem,calc(100vw-3rem))] grid-cols-[1.6fr_1fr]"
                      : "w-[min(42rem,calc(100vw-3rem))] grid-cols-[1.2fr_1fr]"
                    : "w-[22rem]",
                )}
              >
                <div>
                  <p className="eyebrow mb-3 px-3">{item.label}</p>
                  <LinkList item={item} columns={item.links.length > 5 ? 2 : 1} />
                </div>
                <FeatureCard item={item} />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem>
          <NavigationMenuTrigger>More</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[min(36rem,calc(100vw-3rem))] gap-x-6 gap-y-5 p-5 text-ink-950 sm:grid-cols-2">
              {moreItems.map((item) => (
                <div key={item.id} className={hideInMoreClass[item.showFrom]}>
                  <p className="eyebrow mb-2 px-3">{item.label}</p>
                  <LinkList item={item} columns={1} />
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuIndicator />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
