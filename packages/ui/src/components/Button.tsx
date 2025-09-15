import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"
import {
  ButtonBase,
  type ButtonBaseProps,
  type ButtonBaseElement,
} from "./ButtonBase"

const buttonVariants = cva("text-2", {
  variants: {
    size: {
      sm: "",
      regular: "h-9 px-3 py-2",
      full: "w-full p-5",
    },
  },
  defaultVariants: {
    size: "regular",
  },
})

type ButtonProps = ButtonBaseProps &
  VariantProps<typeof buttonVariants> & { active?: boolean }

const Button = React.forwardRef<ButtonBaseElement, ButtonProps>(
  ({ className, size, active, ...props }, ref) => {
    return (
      <ButtonBase
        className={cn(buttonVariants({ size }), className)}
        ref={ref}
        data-state={active ? "active" : undefined}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
