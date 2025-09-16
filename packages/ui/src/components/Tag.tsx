import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"
import { type TextElement, type TextProps, Text } from "."

const buttonVariants = cva("border border-grey-300 p-1 dark:border-grey-600", {
  variants: {
    variant: {
      dashed: "border-dashed",
      solid: "border-solid",
      filled:
        "border-grey-200 bg-grey-200 dark:border-grey-700 dark:bg-grey-700",
    },
    radius: {
      sm: "rounded-xs",
      full: "rounded-full px-2",
    },
  },
  defaultVariants: {
    variant: "dashed",
    radius: "sm",
  },
})

type TagProps = TextProps & VariantProps<typeof buttonVariants>

export const Tag = React.forwardRef<TextElement, TagProps>(
  ({ className, variant, size = "1", radius, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn(buttonVariants({ variant, radius }), className)}
        size={size}
        {...props}
      />
    )
  }
)
Tag.displayName = "Tag"
