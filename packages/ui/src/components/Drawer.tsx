"use client"

import { cn } from "@/lib"
import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerTitle = DrawerPrimitive.Title

const DrawerDescription = DrawerPrimitive.Description

interface DrawerOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> {
  dim?: boolean
}

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  DrawerOverlayProps
>(({ className, dim, ...props }, ref) => {
  return (
    // If we use the DialogPrimitive.Overlay component here it won't
    // show the overlay when the modal mode is false. We need modal mode false
    // becauuse the mini-app runs in a modal itself and using modal in modal
    // creates unexpected behavior.
    <DrawerClose>
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 backdrop-blur-md",
          { "bg-[rgba(0,0,0,.75)]": dim },
          className
        )}
        {...props}
      />
    </DrawerClose>
  )
})
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {
  container?: HTMLElement | null | undefined
  dim?: boolean
}

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ className, children, container, dim, ...props }, ref) => (
  <DrawerPortal container={container}>
    <DrawerOverlay dim={dim} />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col",
        className
      )}
      {...props}
    >
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 border-b border-b-border bg-grey-100 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left dark:bg-grey-900",
        className
      )}
      {...props}
    />
  )
}

DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mt-auto flex flex-col gap-2 bg-grey-100 p-4 pb-24 dark:bg-grey-900",
      className
    )}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
}
