import * as React from "react"
import type { PropsWithoutRefOrColor } from "./helpers"
import { Text, type TextProps } from "./Text"
import { cn } from "@/lib/cn"

type LinkElement = React.ElementRef<"a">
type LinkOwnProps = {
  asChild?: boolean
  active?: boolean
} & Pick<TextProps, "color">
interface LinkProps extends PropsWithoutRefOrColor<"a">, LinkOwnProps {}

export const Link = React.forwardRef<LinkElement, LinkProps>(
  ({ children, className, asChild, active, ...props }, forwardedRef) => {
    return (
      <Text
        ref={forwardedRef}
        asChild
        className={cn("hover:underline data-active:underline", className)}
        data-state={active ? "active" : undefined}
        {...props}
      >
        {asChild ? children : <a>{children}</a>}
      </Text>
    )
  }
)
Link.displayName = "Link"
