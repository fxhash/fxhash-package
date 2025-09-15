import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"
import {
  ButtonBase,
  type ButtonBaseProps,
  type ButtonBaseElement,
} from "./ButtonBase"

const iconButtonVariants = cva(
  "bg-transparent focus:text-current disabled:bg-transparent disabled:text-grey-400 dark:bg-transparent dark:disabled:bg-transparent dark:disabled:text-grey-500",
  {
    variants: {
      variant: {
        ghost:
          "hover:bg-transparent hover:text-grey-700 dark:hover:bg-transparent dark:hover:text-white",
        solid:
          "relative before:absolute before:bottom-0 before:left-1/2 before:h-px before:w-0 before:-translate-x-1/2 before:bg-current before:content-['_'] hover:bg-transparent hover:text-black active:before:w-2 dark:hover:bg-transparent data-open:before:w-2",
        outline: "border",
      },
      color: {
        black: "border-black text-black dark:border-white dark:text-white",
        grey: "bg-grey-100 text-black hover:bg-grey-200 disabled:bg-grey-100 dark:bg-grey-800 dark:text-white dark:hover:bg-grey-700",
        violet: "text-violet-900",
      },
      size: {
        regular: "size-5 p-[2px] leading-1",
        md: "size-9",
      },
    },
    defaultVariants: {
      size: "regular",
      variant: "ghost",
      color: "black",
    },
  }
)

type IconButtonProps = Omit<ButtonBaseProps, "radius" | "color"> &
  VariantProps<typeof iconButtonVariants> & {
    active?: boolean
  }

const IconButton = React.forwardRef<ButtonBaseElement, IconButtonProps>(
  (
    { className, size, color = "black", variant = "ghost", active, ...props },
    ref
  ) => {
    return (
      <ButtonBase
        className={cn(iconButtonVariants({ size, variant, color }), className)}
        ref={ref}
        variant={variant}
        data-state={active ? "open" : undefined}
        {...props}
      />
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton }
