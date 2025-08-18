"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { ComponentPropsWithout, RemovedProps } from "./helpers"
import { cn } from "@/lib/cn"

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

type TabsTriggerElement = React.ElementRef<typeof TabsPrimitive.Trigger>
interface TabsTriggerProps
  extends ComponentPropsWithout<typeof TabsPrimitive.Trigger, RemovedProps> {}
const TabsTrigger = React.forwardRef<TabsTriggerElement, TabsTriggerProps>(
  ({ className, ...triggerProps }, forwardedRef) => {
    return (
      <TabsPrimitive.Trigger
        {...triggerProps}
        asChild={false}
        ref={forwardedRef}
        className={cn(
          "ring-offset-background relative inline-flex items-center justify-center py-1 text-2 whitespace-nowrap text-grey-500 uppercase transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          "data-[state=active]:text-grey-900 dark:data-[state=active]:text-white",
          className
        )}
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
        className={cn(
          "focus-visible:outline-2 focus-visible:outline-grey-400",
          className
        )}
      />
    )
  }
)
TabsContent.displayName = "Tabs.Content"

export { Tabs, TabsList, TabsTrigger, TabsContent }
