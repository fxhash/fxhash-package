"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { ComponentPropsWithout, RemovedProps } from "./helpers"
import { cn } from "@/lib/cn"
import { Text } from "./Text"

type TooltipElement = React.ElementRef<typeof TooltipPrimitive.Content>
type TooltipOwnProps = {}
interface TooltipProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>,
    ComponentPropsWithout<
      typeof TooltipPrimitive.Content,
      RemovedProps | "content"
    >,
    TooltipOwnProps {
  content: React.ReactNode
  container?: React.ComponentPropsWithoutRef<
    typeof TooltipPrimitive.Portal
  >["container"]
}
export const Tooltip = React.forwardRef<TooltipElement, TooltipProps>(
  (
    {
      children,
      className,
      open,
      defaultOpen,
      onOpenChange,
      delayDuration,
      disableHoverableContent,
      content,
      container,
      forceMount,
      ...tooltipContentProps
    },
    forwardedRef
  ) => {
    const rootProps = {
      open,
      defaultOpen,
      onOpenChange,
      delayDuration,
      disableHoverableContent,
    }
    return (
      <TooltipPrimitive.Root {...rootProps}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal container={container} forceMount={forceMount}>
          <TooltipPrimitive.Content
            sideOffset={4}
            collisionPadding={10}
            {...tooltipContentProps}
            asChild={false}
            ref={forwardedRef}
            className={cn(
              "z-50 max-w-md animate-in rounded-xs bg-grey-200 p-3 fade-in-0 zoom-in-95 dark:bg-grey-700",
              "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              className
            )}
          >
            <Text as="div" className="select-none" size="1">
              {content}
            </Text>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    )
  }
)
Tooltip.displayName = "Tooltip"
