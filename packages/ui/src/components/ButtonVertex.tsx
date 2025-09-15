import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"

const buttonVertexVariants = cva(
  cn(
    "flex h-9 cursor-pointer items-center justify-center gap-2 border-none px-2 py-0 font-vertex-sans"
  ),
  {
    variants: {
      variant: {
        primary:
          "bg-vertex-light text-vertex-dark! hover:bg-white active:bg-white",
        secondary:
          "bg-vertex-grey-dark text-vertex-light shadow-vertex-secondary hover:bg-vertex-grey active:bg-vertex-grey",
      },
      size: {
        default: "text-[11px] leading-[110%] tracking-[0.55px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)
export interface ButtonVertexProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVertexVariants> {
  asChild?: boolean
}

const ButtonVertex = React.forwardRef<HTMLButtonElement, ButtonVertexProps>(
  ({ className, disabled, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVertexVariants({ variant, size, className }),
          disabled &&
            `cursor-not-allowed opacity-50 ${variant === "secondary" ? "hover:bg-vertex-grey-dark" : "hover:bg-vertex-light"}`
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    )
  }
)
ButtonVertex.displayName = "ButtonVertex"

export { ButtonVertex, buttonVertexVariants }
