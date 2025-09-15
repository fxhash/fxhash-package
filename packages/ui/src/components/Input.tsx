import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"
import { PropsWithoutRefOrColor } from "./helpers"

const inputVariants = cva(
  cn(
    "flex w-full items-center rounded-xs bg-transparent text-grey-600 transition-colors file:border-0 file:bg-transparent file:text-1 file:font-medium placeholder:text-grey-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-grey-400",
    // hide arrows on input[type=number]
    "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
  ),
  {
    variants: {
      size: {
        sm: "h-5 gap-3 p-1 text-1",
        default: "h-9 gap-3 px-3 py-1 text-1",
      },
      variant: {
        outline:
          "border border-grey-300 focus-visible:ring-1 focus-visible:ring-violet-900 focus-visible:ring-offset-1 dark:border-grey-600",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
)

type InputElement = React.ElementRef<"input">
interface InputOwnProps extends VariantProps<typeof inputVariants> {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}
type InputProps = InputOwnProps & PropsWithoutRefOrColor<"input">

const Input = React.forwardRef<InputElement, InputProps>(
  ({ className, type, variant, size, startIcon, endIcon, ...props }, ref) => {
    const withIcons = startIcon || endIcon

    return (
      <div
        className={cn(
          inputVariants({
            variant: withIcons ? variant : null,
            size: withIcons ? size : null,
          }),
          className
        )}
      >
        {startIcon}
        <input
          type={type}
          className={cn(
            inputVariants({
              variant: !withIcons ? variant : null,
              size: !withIcons ? size : null,
            }),

            className
          )}
          ref={ref}
          {...props}
        />
        {endIcon}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
