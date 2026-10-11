"use client";

import { Dialog as SheetPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetTitle = SheetPrimitive.Title;
export const SheetDescription = SheetPrimitive.Description;

/** Full-screen sheet used by the mobile nav. Radix locks body scroll and traps focus while open. */
export function SheetContent({ className, children, ...props }: React.ComponentProps<typeof SheetPrimitive.Content>) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Content
        className={cn(
          "fixed inset-0 z-[70] flex flex-col bg-sand-100 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-8 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-right-8 duration-300",
          className,
        )}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}
