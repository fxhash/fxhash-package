"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { ComponentPropsWithout } from "./helpers"
import { cn } from "@/lib/cn"
import { cva, VariantProps } from "class-variance-authority"

const checkboxVariants = cva("", {
  variants: {
    size: {
      regular: "before:size-4",
      lg: "before:size-8",
    },
    border: {
      regular: "before:shadow-[inset_0px_0px_0px_1px_var(--border)]",
      dark: "before:shadow-[inset_0px_0px_0px_1px_var(--color-grey-500)]",
    },
  },
  defaultVariants: {
    border: "regular",
    size: "regular",
  },
})

const _checkboxIndicatorVariants = cva("", {
  variants: {
    size: {
      regular: "size-4",
      lg: "size-8",
    },
  },
  defaultVariants: {
    size: "regular",
  },
})

type CheckboxElement = React.ElementRef<typeof CheckboxPrimitive.Root>
type CheckboxOwnProps = VariantProps<typeof checkboxVariants>
interface CheckboxProps
  extends ComponentPropsWithout<
      typeof CheckboxPrimitive.Root,
      "asChild" | "color" | "defaultValue" | "children"
    >,
    CheckboxOwnProps {}
export const Checkbox = React.forwardRef<CheckboxElement, CheckboxProps>(
  ({ className, size, border, ...checkboxProps }, forwardedRef) => {
    return (
      <CheckboxPrimitive.Root
        {...checkboxProps}
        asChild={false}
        ref={forwardedRef}
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center rounded-xs align-top",
          "before:block before:rounded-xs before:shadow-[inset_0px_0px_0px_1px_var(--color-grey-500)] before:content-['']",
          "focus-visible:ring-1 focus-visible:ring-violet-900 focus-visible:outline-none",
          "disabled:before:bg-grey-100",
          checkboxVariants({ size, border }),
          className
        )}
      >
        <CheckboxPrimitive.Indicator
          className={cn(
            "absolute rounded-xs bg-grey-900 dark:bg-grey-300",
            _checkboxIndicatorVariants({ size })
          )}
        />
      </CheckboxPrimitive.Root>
    )
  }
)
Checkbox.displayName = "Checkbox"
