import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/cn"
import { VariantProps, cva } from "class-variance-authority"

const separatorVariants = cva("", {
  variants: {
    orientation: {
      horizontal: "h-px w-full self-center",
      vertical: "h-full w-px",
    },
    inset: {
      none: "",
      "1": "w-[calc(100%-1.5rem)]",
      "2": "w-[calc(100%-2rem)]",
      "3": "w-[calc(100%-3rem)]",
      "4": "w-[calc(100%-4rem)]",
    },
  },
  compoundVariants: [
    {
      orientation: "vertical",
      inset: "2",
      class: "h-[calc(100%-2rem)] w-px",
    },
    {
      orientation: "vertical",
      inset: "4",
      class: "h-[calc(100%-4rem)] w-px",
    },
  ],
  defaultVariants: {
    inset: "none",
    orientation: "horizontal",
  },
})

type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root> &
  VariantProps<typeof separatorVariants>

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      orientation = "horizontal",
      inset = "none",
      decorative = true,
      ...props
    },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        separatorVariants({ orientation, inset }),
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
