import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Text, TextElement, TextProps } from "./Text"
import { cn } from "@/lib/cn"

const textButtonVariants = cva(
  "inline-flex cursor-default items-center justify-center gap-2 rounded-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-violet-900 focus-visible:ring-offset-1 focus-visible:outline-none",
  {
    variants: {
      variant: {
        text: "hover:text-grey-500 dark:hover:text-grey-400",
        link: "hover:underline",
      },
    },
    defaultVariants: {
      variant: "text",
    },
  }
)

type TextButtonProps = VariantProps<typeof textButtonVariants> &
  Omit<TextProps, "asChild" | "as" | "color">

export const TextButton = React.forwardRef<TextElement, TextButtonProps>(
  ({ children, className, variant, ...props }, forwardedRef) => {
    return (
      <Text
        ref={forwardedRef}
        className={cn(textButtonVariants({ variant }), className)}
        asChild
        {...props}
      >
        <button>{children}</button>
      </Text>
    )
  }
)
TextButton.displayName = "TextButton"
