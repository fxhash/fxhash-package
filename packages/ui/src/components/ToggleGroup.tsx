"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { cn } from "@/lib/cn"
import { cva, type VariantProps } from "class-variance-authority"
import { PropsWithoutRefOrColor } from "./helpers"

const toggleGroupItemVariants = cva(
  cn(
    "inline-flex items-center justify-center border border-grey-300 px-3 text-2 leading-2 whitespace-nowrap text-grey-500 transition-colors hover:text-grey-900",
    "dark:border-grey-600 dark:text-grey-400 dark:hover:text-white"
  ),
  {
    variants: {
      radius: {
        sm: "rounded-xs",
        full: "rounded-full",
      },
      variant: {
        buttons: cn(
          "h-8 gap-2",
          "data-[state=on]:border-grey-900 data-[state=on]:bg-grey-900 data-[state=on]:text-white dark:data-[state=on]:border-grey-900 dark:data-[state=on]:bg-white dark:data-[state=on]:text-grey-900"
        ),
        row: cn(
          "h-9 grow",
          "data-[state=on]:border-grey-900 data-[state=on]:bg-grey-900 data-[state=on]:text-white dark:data-[state=on]:border-grey-900 dark:data-[state=on]:bg-white dark:data-[state=on]:text-grey-900"
        ),
        col: "justify-start gap-4 px-5 py-4",
      },
    },
    compoundVariants: [
      {
        variant: "row",
        class: "rounded-none border-x-0 first:border-l last:border-r",
      },
      {
        variant: "row",
        radius: "sm",
        class: "first:rounded-l-sm last:rounded-r-sm",
      },
      {
        variant: "row",
        radius: "full",
        class: "first:rounded-l-full last:rounded-r-full",
      },
    ],
    defaultVariants: {
      radius: "full",
      variant: "buttons",
    },
  }
)

export type ToggleGroupItemVariants = VariantProps<
  typeof toggleGroupItemVariants
>

const ToggleGroupContext = React.createContext<ToggleGroupItemVariants>({
  radius: "full",
  variant: "buttons",
})

type ToggleGroupItemProps = PropsWithoutRefOrColor<
  typeof ToggleGroupPrimitive.Item
> &
  ToggleGroupItemVariants

export const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, children, radius, variant, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)
  const isColVariant = context.variant === "col"
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        "group",
        toggleGroupItemVariants({
          radius: context.radius || radius,
          variant: context.variant || variant,
        }),
        className
      )}
      {...props}
    >
      <>
        {isColVariant && (
          <div
            className={cn(
              "size-4 shrink-0 rounded-xs border border-grey-300",
              "group-data-[state=on]:border-black group-data-[state=on]:bg-black dark:group-data-[state=on]:border-white dark:group-data-[state=on]:bg-white"
            )}
          />
        )}
        {children}
      </>
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

const toggleGroupVariants = cva("flex", {
  variants: {
    variant: {
      buttons: "flex-wrap items-center justify-center gap-2",
      row: "justify-between",
      col: "flex-col gap-2",
    },
  },
  defaultVariants: {
    variant: "buttons",
  },
})

export type ToggleGroupVariants = VariantProps<typeof toggleGroupVariants>

type ToggleGroupProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Root
> &
  ToggleGroupItemVariants &
  ToggleGroupVariants

export const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(({ className, children, radius, variant, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(toggleGroupVariants({ variant }), className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ radius, variant }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName
