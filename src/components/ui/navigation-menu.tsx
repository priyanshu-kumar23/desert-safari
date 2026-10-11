"use client";

import { NavigationMenu as NavPrimitive } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavigationMenu({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavPrimitive.Root>) {
  return (
    <NavPrimitive.Root
      className={cn("relative flex min-w-0 flex-1 justify-center", className)}
      delayDuration={80}
      skipDelayDuration={300}
      {...props}
    >
      {children}
      {/* Viewport is shared between all menus so content morphs between items. */}
      <div className="absolute left-1/2 top-full flex w-screen -translate-x-1/2 justify-center pt-2.5">
        <NavPrimitive.Viewport className="relative h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] max-w-[min(64rem,calc(100vw-2rem))] origin-top overflow-hidden rounded-[var(--radius-panel)] border border-sand-300 bg-sand-50 shadow-lift transition-[width,height] duration-300 ease-out-expo data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95" />
      </div>
    </NavPrimitive.Root>
  );
}

export const NavigationMenuList = ({ className, ...props }: React.ComponentProps<typeof NavPrimitive.List>) => (
  <NavPrimitive.List className={cn("flex items-center justify-center gap-0.5", className)} {...props} />
);

export const NavigationMenuItem = NavPrimitive.Item;
export const NavigationMenuLink = NavPrimitive.Link;

export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavPrimitive.Trigger>) {
  return (
    <NavPrimitive.Trigger
      className={cn(
        "group inline-flex min-h-11 items-center gap-1 whitespace-nowrap rounded-full px-2.5 text-[15px] font-medium normal-case tracking-normal transition-colors hover:bg-current/10 data-[state=open]:bg-current/10 min-[1280px]:px-3.5",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        aria-hidden
        className="size-3.5 transition-transform duration-300 group-data-[state=open]:rotate-180"
      />
    </NavPrimitive.Trigger>
  );
}

export const NavigationMenuContent = ({ className, ...props }: React.ComponentProps<typeof NavPrimitive.Content>) => (
  <NavPrimitive.Content
    className={cn(
      "w-full data-[motion=from-end]:animate-in data-[motion=from-start]:animate-in data-[motion=to-end]:animate-out data-[motion=to-start]:animate-out data-[motion=from-end]:fade-in-0 data-[motion=from-start]:fade-in-0 data-[motion=to-end]:fade-out-0 data-[motion=to-start]:fade-out-0 data-[motion=from-end]:slide-in-from-right-12 data-[motion=from-start]:slide-in-from-left-12 data-[motion=to-end]:slide-out-to-right-12 data-[motion=to-start]:slide-out-to-left-12",
      className,
    )}
    {...props}
  />
);

export const NavigationMenuIndicator = () => (
  <NavPrimitive.Indicator className="top-full z-[1] flex h-2 items-end justify-center overflow-hidden transition-[width,transform] duration-300 data-[state=hidden]:animate-out data-[state=hidden]:fade-out-0 data-[state=visible]:animate-in data-[state=visible]:fade-in-0">
    <div className="relative top-[60%] size-3 rotate-45 rounded-tl-sm border-l border-t border-sand-300 bg-sand-50" />
  </NavPrimitive.Indicator>
);
