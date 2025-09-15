"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { ComponentPropsWithout, RemovedProps } from "./helpers"
import { cn } from "@/lib"

const Tabs = TabsPrimitive.Root

type TabsListElement = React.ElementRef<typeof TabsPrimitive.List>
type TabsListOwnProps = {}
interface TabsListProps
  extends ComponentPropsWithout<typeof TabsPrimitive.List, RemovedProps>,
    TabsListOwnProps {}
const TabsList = React.forwardRef<TabsListElement, TabsListProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <TabsPrimitive.List
        {...props}
        asChild={false}
        ref={forwardedRef}
        className={cn("relative inline-flex items-center gap-7", className)}
      />
    )
  }
)
TabsList.displayName = "Tabs.List"

const tabsTriggerVariants = cva(
  cn(
    "ring-offset-background relative inline-flex items-center justify-center py-1 text-2 whitespace-nowrap text-grey-500 transition-all focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
    "data-[state=active]:text-grey-900 dark:data-[state=active]:text-white"
  ),
  {
    variants: {
      variant: {
        default: "",
        underlined:
          "border-b border-b-border data-[state=active]:border-b-grey-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type TabsTriggerElement = React.ElementRef<typeof TabsPrimitive.Trigger>
interface TabsTriggerProps
  extends ComponentPropsWithout<typeof TabsPrimitive.Trigger, RemovedProps>,
    VariantProps<typeof tabsTriggerVariants> {}
const TabsTrigger = React.forwardRef<TabsTriggerElement, TabsTriggerProps>(
  ({ className, variant, ...triggerProps }, forwardedRef) => {
    return (
      <TabsPrimitive.Trigger
        {...triggerProps}
        asChild={false}
        ref={forwardedRef}
        className={cn(tabsTriggerVariants({ variant }), className)}
      />
    )
  }
)
TabsTrigger.displayName = "Tabs.Trigger"

type TabsContentElement = React.ElementRef<typeof TabsPrimitive.Content>
type TabsContentOwnProps = {}
interface TabsContentProps
  extends ComponentPropsWithout<typeof TabsPrimitive.Content, RemovedProps>,
    TabsContentOwnProps {}
const TabsContent = React.forwardRef<TabsContentElement, TabsContentProps>(
  ({ className, ...contentProps }, forwardedRef) => {
    return (
      <TabsPrimitive.Content
        {...contentProps}
        ref={forwardedRef}
        className={cn("", className)}
      />
    )
  }
)
TabsContent.displayName = "Tabs.Content"

export { Tabs, TabsList, TabsTrigger, TabsContent }
