"use client";

import { Accordion as AccordionPrimitive } from "radix-ui";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn("border-b border-sand-300", className)} {...props} />;
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex min-h-14 flex-1 items-center justify-between gap-4 py-5 text-left font-display text-xl text-ink-950 transition-colors hover:text-red-500 sm:text-2xl",
          className,
        )}
        {...props}
      >
        {children}
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-sand-400 transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:border-red-500 group-data-[state=open]:bg-red-500 group-data-[state=open]:text-sand-50">
          <Plus aria-hidden className="size-4" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-6 pr-12 text-base leading-relaxed text-ink-600", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
