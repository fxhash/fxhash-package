"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { cn } from "@/lib/cn"
import type { ComponentPropsWithout, RemovedProps } from "./helpers"
import { getSubtree } from "./helpers/get-subtree"

type ScrollAreaElement = React.ElementRef<typeof ScrollAreaPrimitive.Viewport>
type ScrollAreaOwnProps = {
  asChild?: boolean
  scrollbars?: "both" | "horizontal" | "vertical"
}
interface ScrollAreaProps
  extends ComponentPropsWithout<typeof ScrollAreaPrimitive.Root, RemovedProps>,
    ComponentPropsWithout<
      typeof ScrollAreaPrimitive.Viewport,
      RemovedProps | "dir"
    >,
    ScrollAreaOwnProps {}
const ScrollArea = React.forwardRef<ScrollAreaElement, ScrollAreaProps>(
  (props, forwardedRef) => {
    const {
      asChild,
      children,
      className,
      style,
      type,
      scrollHideDelay = type !== "scroll" ? 0 : undefined,
      dir,
      scrollbars = "both",
      ...viewportProps
    } = props

    return (
      <ScrollAreaPrimitive.Root
        type={type}
        scrollHideDelay={scrollHideDelay}
        className={cn("flex size-full flex-col overflow-hidden", className)}
        asChild={asChild}
      >
        {getSubtree({ asChild, children }, children => (
          <>
            <ScrollAreaPrimitive.Viewport
              {...viewportProps}
              ref={forwardedRef}
              className="flex size-full flex-col *:block *:w-fit *:grow"
            >
              {children}
            </ScrollAreaPrimitive.Viewport>

            {scrollbars !== "vertical" ? (
              <ScrollAreaPrimitive.Scrollbar
                orientation="horizontal"
                className="flex h-2 touch-none flex-row bg-grey-300 select-none dark:bg-grey-700"
              >
                <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-md bg-grey-500 before:absolute before:top-1/2 before:left-1/2 before:size-full before:min-h-[44px] before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
              </ScrollAreaPrimitive.Scrollbar>
            ) : null}

            {scrollbars !== "horizontal" ? (
              <ScrollAreaPrimitive.Scrollbar
                orientation="vertical"
                className="flex w-2 touch-none flex-col bg-grey-300 select-none dark:bg-grey-700"
              >
                <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-md bg-grey-500 before:absolute before:top-1/2 before:left-1/2 before:size-full before:min-h-[44px] before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
              </ScrollAreaPrimitive.Scrollbar>
            ) : null}

            {scrollbars === "both" ? (
              <ScrollAreaPrimitive.Corner className="bg-grey-500" />
            ) : null}
          </>
        ))}
      </ScrollAreaPrimitive.Root>
    )
  }
)
ScrollArea.displayName = "ScrollArea"

export { ScrollArea }
