import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cn } from "cn"
import { Minus, Plus } from "lucide-react"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={className}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-center justify-between gap-4 rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-expanded:text-red-500",
          className
        )}
        {...props}
      >
        {children}
        <span
          data-slot="accordion-trigger-icon"
          className="flex size-7 shrink-0 items-center justify-center rounded-full border border-current/25 text-current transition-transform duration-300 group-aria-expanded/accordion-trigger:rotate-90"
        >
          <Plus
            data-slot="accordion-trigger-icon"
            className="pointer-events-none size-3.5 shrink-0 group-aria-expanded/accordion-trigger:hidden"
          />
          <Minus
            data-slot="accordion-trigger-icon"
            className="pointer-events-none hidden size-3.5 shrink-0 group-aria-expanded/accordion-trigger:inline"
          />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
