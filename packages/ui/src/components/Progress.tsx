"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-grey-300 dark:bg-grey-700",
  {
    variants: {
      variant: {
        determinate: "",
        indeterminate:
          "bg-linear-to-r from-grey-900 to-grey-400 dark:from-grey-400 dark:to-grey-900",
      },
      size: {
        "1": "h-1",
      },
    },
    defaultVariants: {
      variant: "determinate",
      size: "1",
    },
  }
)

type ProgressElement = React.ElementRef<typeof ProgressPrimitive.Root>
interface ProgressOwnProps extends VariantProps<typeof progressVariants> {
  value2?: number
}
type ProgressProps = ProgressOwnProps &
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>

const Progress = React.forwardRef<ProgressElement, ProgressProps>(
  (
    { className, variant = "determinate", value, value2, size, ...props },
    ref
  ) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(progressVariants({ size, variant, className }))}
      {...props}
    >
      {variant === "determinate" && value2 && value2 > 0 ? (
        <ProgressPrimitive.Indicator
          className={
            "absolute size-full flex-1 bg-grey-700 transition-all dark:bg-grey-300"
          }
          style={{
            transform: `translateX(-${100 - ((value || 0) + value2)}%)`,
          }}
        />
      ) : null}
      {variant === "determinate" && (
        <ProgressPrimitive.Indicator
          className={
            "absolute size-full flex-1 bg-grey-900 transition-all dark:bg-grey-100"
          }
          style={{
            transform: `translateX(-${100 - (value || 0)}%)`,
          }}
        />
      )}
    </ProgressPrimitive.Root>
  )
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
