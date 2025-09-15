"use client"

import * as React from "react"
import { createContextScope, type Scope } from "@radix-ui/react-context"

import * as CheckboxGroupPrimitive from "./CheckboxGroupPrimitives"
import { ComponentPropsWithout, RemovedProps } from "./helpers"
import { Text } from "./Text"
import { cn } from "@/lib/cn"
import { createCheckboxGroupScope } from "./CheckboxGroupPrimitives"

const CHECKBOX_GROUP_NAME = "CheckboxGroup"

type ScopedProps<P> = P & { __scopeCheckboxGroup?: Scope }
const [createCheckboxGroupContext] = createContextScope(CHECKBOX_GROUP_NAME, [
  createCheckboxGroupScope,
])
const useCheckboxGroupScope = createCheckboxGroupScope()

type CheckboxGroupRootOwnProps = {}
type CheckboxGroupContextValue = CheckboxGroupRootOwnProps

const [CheckboxGroupProvider, useCheckboxGroupContext] =
  createCheckboxGroupContext<CheckboxGroupContextValue>(CHECKBOX_GROUP_NAME)

type CheckboxGroupRootElement = React.ElementRef<
  typeof CheckboxGroupPrimitive.Root
>
interface CheckboxGroupRootProps
  extends ComponentPropsWithout<
      typeof CheckboxGroupPrimitive.Root,
      "asChild" | "color" | "defaultChecked"
    >,
    CheckboxGroupRootOwnProps {}
const CheckboxGroupRoot = React.forwardRef<
  CheckboxGroupRootElement,
  CheckboxGroupRootProps
>(
  (
    {
      __scopeCheckboxGroup,
      className,
      ...rootProps
    }: ScopedProps<CheckboxGroupRootProps>,
    forwardedRef
  ) => {
    const checkboxGroupScope = useCheckboxGroupScope(__scopeCheckboxGroup)
    return (
      <CheckboxGroupProvider scope={__scopeCheckboxGroup}>
        <CheckboxGroupPrimitive.Root
          {...checkboxGroupScope}
          {...rootProps}
          ref={forwardedRef}
          className={cn(className)}
        />
      </CheckboxGroupProvider>
    )
  }
)
CheckboxGroupRoot.displayName = "CheckboxGroup.Root"

type CheckboxGroupItemElement = React.ElementRef<
  typeof CheckboxGroupPrimitive.Item
>
interface CheckboxGroupItemProps
  extends ComponentPropsWithout<
    typeof CheckboxGroupPrimitive.Item,
    RemovedProps
  > {}
const CheckboxGroupItem = React.forwardRef<
  CheckboxGroupItemElement,
  CheckboxGroupItemProps
>((_props: ScopedProps<CheckboxGroupItemProps>, forwardedRef) => {
  const { __scopeCheckboxGroup, children, className, style, ...props } = _props

  // Render `<Text as="label">` if children are provided, otherwise render
  // the solo checkbox to allow building out your custom layouts with it.
  if (children) {
    return (
      <Text
        as="label"
        className={cn("flex items-center gap-2", className)}
        style={style}
      >
        <CheckboxGroupItemCheckbox
          __scopeCheckboxGroup={__scopeCheckboxGroup}
          {...props}
          ref={forwardedRef}
        />
        {children && <span>{children}</span>}
      </Text>
    )
  }

  return (
    <CheckboxGroupItemCheckbox
      __scopeCheckboxGroup={__scopeCheckboxGroup}
      {...props}
      ref={forwardedRef}
      className={cn("flex items-center gap-2", className)}
      style={style}
    />
  )
})
CheckboxGroupItem.displayName = "CheckboxGroup.Item"

type CheckboxGroupItemCheckboxElement = React.ElementRef<
  typeof CheckboxGroupPrimitive.Item
>
interface CheckboxGroupItemCheckboxProps
  extends ComponentPropsWithout<
    typeof CheckboxGroupPrimitive.Item,
    RemovedProps
  > {}
const CheckboxGroupItemCheckbox = React.forwardRef<
  CheckboxGroupItemCheckboxElement,
  ScopedProps<CheckboxGroupItemCheckboxProps>
>(({ __scopeCheckboxGroup, className, ...props }, forwardedRef) => {
  const context = useCheckboxGroupContext(
    "CheckboxGroupItemCheckbox",
    __scopeCheckboxGroup
  )
  const checkboxGroupScope = useCheckboxGroupScope(__scopeCheckboxGroup)
  return (
    <CheckboxGroupPrimitive.Item
      {...checkboxGroupScope}
      {...props}
      ref={forwardedRef}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-xs align-top",
        "before:block before:size-4 before:rounded-xs before:shadow-[inset_0px_0px_0px_1px_var(--border)] before:content-['']",
        "focus-visible:ring-1 focus-visible:ring-violet-900 focus-visible:outline-none",
        "disabled:before:bg-grey-100",
        className
      )}
    >
      <CheckboxGroupPrimitive.Indicator
        {...checkboxGroupScope}
        className="absolute size-4 rounded-xs bg-grey-900 dark:bg-grey-300"
      />
    </CheckboxGroupPrimitive.Item>
  )
})
CheckboxGroupItemCheckbox.displayName = "CheckboxGroup.ItemCheckbox"

export { CheckboxGroupRoot as CheckboxGroup, CheckboxGroupItem }
export type {
  CheckboxGroupRootProps as RootProps,
  CheckboxGroupItemProps as ItemProps,
}
