"use client"

import * as React from "react"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import type { ComponentPropsWithout, RemovedProps } from "./helpers"
import { cn } from "@/lib/cn"
import { getSubtree } from "./helpers/get-subtree"

type TabNavRootElement = React.ElementRef<typeof NavigationMenu.Root>
type TabNavRootElementProps = ComponentPropsWithout<"nav", RemovedProps>
type TabNavOwnProps = {}
interface TabNavRootProps
  extends Omit<TabNavRootElementProps, "defaultValue" | "dir" | "color">,
    TabNavOwnProps {}
const TabNavRoot = React.forwardRef<TabNavRootElement, TabNavRootProps>(
  ({ children, className, ...rootProps }, forwardedRef) => {
    return (
      <NavigationMenu.Root {...rootProps} asChild={false} ref={forwardedRef}>
        <NavigationMenu.List
          className={cn("relative inline-flex items-center gap-7", className)}
        >
          {children}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    )
  }
)
TabNavRoot.displayName = "TabNav.Root"

type TabNavLinkElement = React.ElementRef<typeof NavigationMenu.Link>
type TabNavLinkOwnProps = {
  asChild?: boolean
}
interface TabNavLinkProps
  extends ComponentPropsWithout<
      typeof NavigationMenu.Link,
      RemovedProps | "onSelect"
    >,
    TabNavLinkOwnProps {}
export const TabNavLink = React.forwardRef<TabNavLinkElement, TabNavLinkProps>(
  ({ asChild, children, className, ...linkProps }, forwardedRef) => {
    return (
      <NavigationMenu.Item>
        <NavigationMenu.Link
          {...linkProps}
          ref={forwardedRef}
          data-state={linkProps.active ? "active" : undefined}
          className={cn(
            "ring-offset-background relative inline-flex items-center justify-center py-1 text-2 whitespace-nowrap text-grey-500 uppercase transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
            "data-active:text-grey-900 dark:data-active:text-white",
            className
          )}
          onSelect={undefined}
          asChild={asChild}
        >
          {getSubtree({ asChild, children }, children => (
            <span>{children}</span>
          ))}
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    )
  }
)
TabNavLink.displayName = "TabNav.Link"

export { TabNavRoot as TabNav }
