"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/cn"
import { cva, type VariantProps } from "class-variance-authority"
import { Label } from "."

type SwitchRef = React.ElementRef<typeof SwitchPrimitives.Root>
type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>

export const Switch = React.forwardRef<SwitchRef, SwitchProps>(
  ({ className, ...props }, ref) => (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-grey-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-grey-700",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block size-4 rounded-full bg-grey-900 ring-0 transition-all",
          "data-checked:translate-x-4 dark:data-checked:bg-grey-100",
          "data-unchecked:translate-x-0 data-unchecked:bg-grey-400 dark:data-unchecked:bg-grey-500"
        )}
      />
    </SwitchPrimitives.Root>
  )
)
Switch.displayName = SwitchPrimitives.Root.displayName

const switchWithLabelVariants = cva(
  "flex w-full items-center justify-start gap-3 border border-grey-300 dark:border-grey-600",
  {
    variants: {
      padding: {
        normal: "px-3 py-1",
        lg: "p-4",
      },
    },
    defaultVariants: {
      padding: "normal",
    },
  }
)

type SwitchWithLabelProps = SwitchProps & {
  label: string | React.ReactElement
  id: string
} & VariantProps<typeof switchWithLabelVariants>

export const SwitchWithLabel = React.forwardRef<
  SwitchRef,
  SwitchWithLabelProps
>(({ label, id, className, padding, ...props }, ref) => {
  return (
    <div className={cn(className, switchWithLabelVariants({ padding }))}>
      <Switch {...props} ref={ref} id={id} />
      <Label weight="regular" htmlFor={id}>
        {label}
      </Label>
    </div>
  )
})

SwitchWithLabel.displayName = "SwitchWithLabel"
