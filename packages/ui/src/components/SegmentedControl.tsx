"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { cn } from "@/lib/cn"
import { ComponentPropsWithout, RemovedProps } from "./helpers"

type SegmentedControlRootOwnProps = {}

interface SegmentedControlRootProps
  extends ComponentPropsWithout<"div", RemovedProps | "dir">,
    SegmentedControlRootOwnProps {
  value?: string
  defaultValue?: string
  onValueChange?(value: string): void
}

export const SegmentedControlRoot = React.forwardRef<
  HTMLDivElement,
  SegmentedControlRootProps
>(
  (
    {
      className,
      children,
      value: valueProp,
      defaultValue: defaultValueProp,
      onValueChange: onValueChangeProp,
      ...rootProps
    },
    forwardedRef
  ) => {
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChangeProp,
      defaultProp: defaultValueProp ?? "",
    })

    return (
      <ToggleGroupPrimitive.Root
        ref={forwardedRef}
        className={cn(
          "relative isolate inline-grid h-8 min-w-max auto-cols-fr grid-flow-col items-stretch rounded-full border border-grey-300 align-top",
          "dark:border-grey-600",
          className
        )}
        onValueChange={value => {
          if (value) {
            setValue(value)
          }
        }}
        {...rootProps}
        type="single"
        value={value}
        asChild={false}
        disabled={false}
      >
        {children}
      </ToggleGroupPrimitive.Root>
    )
  }
)

SegmentedControlRoot.displayName = "SegmentedControl.Root"

interface SegmentedControlItemOwnProps {
  value: string
}

interface SegmentedControlItemProps
  extends ComponentPropsWithout<
      typeof ToggleGroupPrimitive.Item,
      RemovedProps | "disabled" | "type" | "value"
    >,
    SegmentedControlItemOwnProps {}

export const SegmentedControlItem = React.forwardRef<
  HTMLButtonElement,
  SegmentedControlItemProps
>(({ children, className, ...props }, forwardedRef) => (
  <ToggleGroupPrimitive.Item
    ref={forwardedRef}
    className={cn(
      "flex items-center justify-center rounded-[100px] px-3 text-2 leading-2 text-grey-500 transition-colors",
      "dark:text-grey-400",
      "data-[state=on]:-m-px data-[state=on]:border data-[state=on]:border-grey-900 data-[state=on]:bg-grey-900 data-[state=on]:text-white",
      "dark:data-[state=on]:border-white dark:data-[state=on]:bg-white dark:data-[state=on]:text-grey-900",
      className
    )}
    {...props}
    disabled={false}
    asChild={false}
  >
    {children}
  </ToggleGroupPrimitive.Item>
))

SegmentedControlItem.displayName = "SegmentedControl.Item"
