import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"
import type { PropsWithoutRefOrColor } from "./helpers"
import { IconLoader } from "@tabler/icons-react"

const buttonBaseVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 overflow-hidden font-normal whitespace-nowrap transition-colors",
    "focus:outline-none focus-visible:ring-1 focus-visible:ring-violet-900 focus-visible:ring-offset-1 focus-visible:outline-none",
    "disabled:pointer-events-none disabled:border-transparent disabled:bg-grey-100 disabled:text-grey-400 dark:disabled:border-transparent dark:disabled:bg-grey-800 dark:disabled:text-grey-500 data-disabled:pointer-events-none data-disabled:bg-grey-100 data-disabled:text-grey-400 dark:data-disabled:bg-grey-800 dark:data-disabled:text-grey-500"
  ),
  {
    variants: {
      variant: {
        solid:
          "bg-grey-900 text-white hover:bg-violet-900 dark:bg-white dark:text-grey-100 dark:hover:bg-violet-900 dark:hover:text-white",
        // setting the default focus-visible ring color to transparent
        // all outline variants use the border color for focus-visible
        outline:
          "border border-solid border-grey-300 bg-white text-grey-900 hover:bg-grey-900 hover:text-white focus-visible:border-violet-900 focus-visible:ring-transparent active:bg-grey-900 active:text-white dark:border-grey-600 dark:bg-grey-900 dark:text-white dark:hover:bg-white dark:hover:text-grey-900 dark:active:bg-white dark:active:text-grey-900 data-active:bg-grey-900 data-active:text-white dark:data-active:bg-white dark:data-active:text-grey-900",
        ghost:
          "bg-transparent text-grey-900 hover:bg-grey-900 hover:text-white dark:bg-transparent dark:text-white dark:hover:bg-white dark:hover:text-grey-900",
      },
      color: {
        black:
          "bg-grey-900 text-white hover:bg-violet-900 dark:bg-white dark:text-grey-900",
        white:
          "bg-white text-grey-900 hover:bg-grey-900 hover:text-white active:text-white dark:bg-grey-900 dark:text-white dark:hover:bg-white dark:hover:text-grey-900 dark:active:text-grey-900 data-active:text-white dark:data-active:text-grey-900",
        violet:
          "bg-violet-900 text-white hover:bg-grey-900 active:bg-grey-900 data-active:bg-grey-900",
        grey: "bg-grey-200 text-grey-900 hover:bg-grey-900 hover:text-white active:bg-grey-900 active:text-white dark:bg-grey-700 dark:text-white dark:hover:bg-white dark:hover:text-grey-900 dark:active:bg-white dark:active:text-grey-900 data-active:bg-grey-900 data-active:text-white dark:data-active:bg-white dark:data-active:text-grey-900",
        gradient:
          "before:bg-gradient-radial before:absolute before:z-[-1] before:size-full before:from-violet-900 before:to-violet-600 before:opacity-0 before:transition-opacity before:content-['_'] relative z-10 hover:before:opacity-100 active:before:opacity-100 dark:text-black data-active:before:opacity-100",
        opacity:
          "border-white bg-transparent text-white hover:bg-white/20 hover:text-white active:bg-white/20 dark:border-white dark:bg-transparent dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:active:bg-white/20 data-active:bg-white/20 dark:data-active:bg-white/20",
      },
      radius: {
        sm: "rounded-xs",
        full: "rounded-full",
      },
    },
    compoundVariants: [
      {
        color: "violet",
        variant: "solid",
        class: "focus-visible:border-grey-900",
      },
      {
        color: "black",
        variant: "outline",
        class:
          "bg-white text-grey-900 hover:bg-grey-900 dark:bg-grey-900 dark:text-white dark:hover:bg-white",
      },
      {
        color: "violet",
        variant: "outline",
        class:
          "border-grey-500 bg-white text-grey-900 hover:border-grey-900 hover:text-white active:bg-grey-900 dark:bg-grey-900 dark:text-white dark:hover:border-white dark:hover:text-grey-900 dark:active:bg-white data-active:bg-grey-900 dark:data-active:bg-white",
      },
      {
        color: "grey",
        variant: "outline",
        class:
          "border-grey-500 bg-white hover:border-grey-900 active:bg-grey-900 dark:bg-grey-900 dark:hover:border-white dark:active:bg-white data-active:bg-grey-900 dark:data-active:bg-white",
      },
      {
        color: "gradient",
        variant: "outline",
        class:
          "before:bg-gradient-radial before:absolute before:z-[-1] before:size-full before:from-violet-900 before:to-violet-500 before:opacity-0 before:transition-opacity before:content-['_'] relative z-10 border-grey-300 bg-transparent text-grey-900 hover:border-transparent hover:bg-transparent hover:text-white hover:before:opacity-100 active:border-transparent active:bg-transparent active:text-white active:before:opacity-100 dark:bg-transparent dark:text-white dark:hover:bg-transparent dark:hover:text-white dark:active:text-white data-active:border-transparent data-active:bg-transparent data-active:text-white data-active:before:opacity-100 dark:data-active:text-white data-open:text-white",
      },
      {
        color: "grey",
        variant: "ghost",
        class:
          "bg-transparent text-grey-900 hover:bg-grey-200 hover:text-grey-900 dark:bg-transparent dark:text-white dark:hover:bg-grey-800 dark:hover:text-white data-active:bg-grey-200 data-active:text-grey-900",
      },
      {
        color: "white",
        variant: "ghost",
        class:
          "hover:bg-transparent hover:text-grey-900 dark:bg-transparent dark:text-white dark:hover:bg-transparent dark:hover:text-white",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "black",
      radius: "sm",
    },
  }
)

export type ButtonBaseElement = React.ElementRef<"button">
type ButtonBaseOwnProps = {
  loading?: boolean
} & VariantProps<typeof buttonBaseVariants>
type ButtonBaseAsChildProps = {
  asChild?: boolean
} & PropsWithoutRefOrColor<"button">

export type ButtonBaseProps = ButtonBaseOwnProps & ButtonBaseAsChildProps

const ButtonBase = React.forwardRef<ButtonBaseElement, ButtonBaseProps>(
  (
    {
      className,
      radius,
      color,
      variant,
      asChild = false,
      loading,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const disabled = props.disabled || loading
    return (
      <Comp
        {...props}
        ref={ref}
        className={cn(
          buttonBaseVariants({ radius, color, variant }),
          {
            relative: loading,
          },
          className
        )}
        disabled={disabled}
      >
        {loading ? (
          // Keep the button size the same, while the spinner is loading
          // Content is hidden but spinner is visible without button width change
          <>
            <span className="invisible contents">{children}</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <IconLoader className="animate-spin" size={16} />
            </div>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)

ButtonBase.displayName = "ButtonBase"

export { ButtonBase, buttonBaseVariants }
