import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"
import type { PropsWithoutRefOrColor } from "./helpers"

const textVariants = cva("", {
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
      "grey-light": "text-grey-500 dark:text-grey-400",
      green: "text-green-900 dark:text-green-700",
      red: "text-red-900 dark:text-red-700",
      orange: "text-orange-900 dark:text-orange-700",
      current: "text-current",
    },
  },
  defaultVariants: {
    size: "2",
    weight: "regular",
    color: "grey",
  },
})

export type TextElement = React.ElementRef<"span">
interface TextOwnProps extends VariantProps<typeof textVariants> {}
type TextAsChildProps = {
  asChild?: boolean
  as?: never
} & PropsWithoutRefOrColor<"span">
type TextSpanProps = {
  as?: "span"
  asChild?: never
} & PropsWithoutRefOrColor<"span">
type TextDivProps = {
  as: "div"
  asChild?: never
} & PropsWithoutRefOrColor<"div">
type TextLabelProps = {
  as: "label"
  asChild?: never
} & PropsWithoutRefOrColor<"label">
type TextPProps = { as: "p"; asChild?: never } & PropsWithoutRefOrColor<"p">
export type TextProps = TextOwnProps &
  (
    | TextAsChildProps
    | TextSpanProps
    | TextDivProps
    | TextLabelProps
    | TextPProps
  )

export const Text = React.forwardRef<TextElement, TextProps>(
  (
    {
      children,
      className,
      asChild = false,
      as: Tag = "span",
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
        className={cn(textVariants({ align, size, weight, color, className }))}
      >
        {asChild ? children : <Tag>{children}</Tag>}
      </Slot>
    )
  }
)
Text.displayName = "Text"
