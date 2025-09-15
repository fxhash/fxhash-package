"use client"
import * as React from "react"
import { cn } from "@/lib/cn"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { IconPlus, IconMinus } from "@tabler/icons-react"

interface CollapsibleTriggerProps
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger> {}

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  CollapsibleTriggerProps
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex w-full items-center justify-between font-normal whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:ring-violet-900 focus-visible:outline-none",
      "h-9",
      "group",
      className
    )}
    {...props}
  >
    {children} <IconPlus className="group-data-[state=open]:hidden" size={14} />
    <IconMinus className="group-data-[state=closed]:hidden" size={14} />
  </CollapsiblePrimitive.Trigger>
))
CollapsibleTrigger.displayName = CollapsiblePrimitive.Trigger.displayName

interface CollapsibleContentProps
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content> {
  animate?: boolean
}

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  CollapsibleContentProps
>(({ className, animate = true, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      className={cn(className, {
        "overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down":
          animate,
      })}
      {...props}
      ref={ref}
    />
  )
})
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName

const Collapsible = CollapsiblePrimitive.Root

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
