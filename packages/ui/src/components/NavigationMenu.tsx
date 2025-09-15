"use client"

import * as React from "react"
import * as NavigationMenuPrimitive from "./NavigationMenuPrimitive"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/cn"

export const navigationButtonVariants = cva(
  "inline-flex items-center justify-center gap-3 rounded-xs font-normal whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:ring-violet-900 focus-visible:outline-none disabled:pointer-events-none disabled:bg-grey-400 disabled:text-grey-700 dark:disabled:bg-grey-600 dark:disabled:text-grey-300",
  {
    variants: {
      variant: {
        main: "bg-transparent text-grey-700 hover:text-grey-500 dark:text-grey-300 dark:hover:text-grey-100",
        sub: "bg-transparent text-grey-900 hover:bg-grey-200 dark:text-grey-100 dark:hover:bg-grey-700",
      },
      size: {
        regular: "h-9 px-3 py-2",
      },
    },
    defaultVariants: {
      variant: "main",
      size: "regular",
    },
  }
)

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex flex-1 items-center justify-center data-vertical:grow-0 data-vertical:flex-col data-vertical:items-start data-vertical:justify-start data-horizontal:max-w-max",
      className
    )}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1 data-vertical:flex-col data-vertical:items-start data-vertical:gap-10 data-vertical:space-x-0",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    onClick={(e: React.MouseEvent<HTMLElement>) => {
      const isTouch = window.matchMedia("(hover: none)").matches
      if (!isTouch) {
        e.preventDefault()
      }
    }}
    className={cn(
      navigationButtonVariants({ variant: "main" }),
      "group",
      "data-open:text-grey-500",
      className
    )}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "absolute top-full rounded-sm border border-solid border-grey-300 bg-white dark:border-grey-600 dark:bg-grey-900",
      "mt-1 min-w-52 px-3 py-4",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

export type NavigationMenuLinkProps = {
  children: React.ReactNode
  asChild?: boolean
  className?: string
} & React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> &
  VariantProps<typeof navigationButtonVariants>

const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  NavigationMenuLinkProps
>(({ className, variant, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    className={cn(
      navigationButtonVariants({ variant }),
      "w-full",
      "justify-start",
      "cursor-pointer",
      className
    )}
    ref={ref}
    {...props}
  />
))
NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-full overflow-hidden rounded-md border shadow-sm data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 md:w-(--radix-navigation-menu-viewport-width)",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuViewport,
}
