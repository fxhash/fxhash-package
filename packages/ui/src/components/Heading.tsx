import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"
import { PropsWithoutRefOrColor } from "./helpers"

const headingVariants = cva("", {
  variants: {
    size: {
      "1": "text-1 leading-1",
      "2": "text-2 leading-2",
      "3": "text-3 leading-3",
      "4": "text-4 leading-4",
      "5": "text-5 leading-5",
      "6": "text-6 leading-6",
      "7": "text-7 leading-7",
      "8": "text-8 leading-8",
      "9": "text-9 leading-9",
      "10": "text-10 leading-10",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    color: {
      grey: "text-grey-900 dark:text-grey-100",
      "grey-light": "text-grey-500",
    },
  },
  defaultVariants: {
    size: "6",
    weight: "medium",
  },
})

type HeadingElement = React.ElementRef<"h1">
interface HeadingOwnProps extends VariantProps<typeof headingVariants> {}
type HeadingAsChildProps = {
  asChild?: boolean
  as?: never
} & PropsWithoutRefOrColor<"h1">
type HeadingAsProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  asChild?: never
} & PropsWithoutRefOrColor<"h1">
export type HeadingProps = HeadingOwnProps &
  (HeadingAsChildProps | HeadingAsProps)

export const Heading = React.forwardRef<HeadingElement, HeadingProps>(
  (
    {
      children,
      className,
      asChild = false,
      as: Tag = "h1",
      align,
      size,
      weight,
      color,
      ...textProps
    },
    forwardedRef
  ) => {
    return (
      <Slot
        {...textProps}
        ref={forwardedRef}
        className={cn(
          headingVariants({ align, size, weight, color, className })
        )}
      >
        {asChild ? children : <Tag>{children}</Tag>}
      </Slot>
    )
  }
)
Heading.displayName = "Heading"
