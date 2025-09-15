import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/cn"

const calloutVariants = cva(cn("flex w-full gap-4 rounded-xs p-5 text-1"), {
  variants: {
    color: {
      black: "bg-black text-white",
      error: "bg-red-700 text-white",
      warning: "bg-orange-500 text-black",
      success: "bg-green-700 text-black",
    },
  },
  defaultVariants: {
    color: "black",
  },
})

type CalloutProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof calloutVariants> & {
    icon?: React.ReactNode
  }

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, color, children, icon, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(calloutVariants({ color }), className)}
      {...props}
    >
      {icon && <div>{icon}</div>}
      <div>{children}</div>
    </div>
  )
)
Callout.displayName = "Callout"

const CalloutTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium tracking-tight", className)}
    {...props}
  />
))
CalloutTitle.displayName = "CalloutTitle"

const CalloutDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-1", className)} {...props} />
))
CalloutDescription.displayName = "CalloutDescription"

export { Callout, CalloutTitle, CalloutDescription }
