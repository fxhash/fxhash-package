"use client"

import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { IconLoader, IconSearch, IconX } from "@tabler/icons-react"
import { Dialog, DialogContent, IconButton } from "."
import { cn } from "@/lib/cn"
import { cva, VariantProps } from "class-variance-authority"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex size-full flex-col overflow-hidden rounded-xs",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-black [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const commandInputVariants = cva(
  cn(
    "flex items-center rounded-xs px-3 focus-visible:ring-1 focus-visible:ring-violet-900 focus-visible:ring-offset-1"
  ),
  {
    variants: {
      variant: {
        outline: "border border-grey-300 dark:border-grey-600",
        ghost: "",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
)

type CommandInputProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Input
> &
  VariantProps<typeof commandInputVariants> & {
    isLoading?: boolean
    onClickSearchIcon?: () => void
    onClickClearIcon?: () => void
    classNameWrapper?: string
  }

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(
  (
    {
      className,
      classNameWrapper,
      isLoading,
      variant,
      onClickSearchIcon,
      onClickClearIcon,
      ...props
    },
    ref
  ) => {
    const Icon = isLoading ? IconLoader : IconSearch
    return (
      <div
        className={cn(commandInputVariants({ variant }), classNameWrapper)}
        cmdk-input-wrapper=""
      >
        <Icon
          onClick={() => onClickSearchIcon?.()}
          size={16}
          className={cn("mr-2 shrink-0 opacity-50", {
            "animate-spin": isLoading,
          })}
        />
        <CommandPrimitive.Input
          ref={ref}
          className={cn(
            "flex h-9 w-full rounded-xs py-3 outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        {onClickClearIcon && (
          <IconButton onClick={() => onClickClearIcon?.()}>
            <IconX size={16} className={cn("ml-2 shrink-0")} />
          </IconButton>
        )}
      </div>
    )
  }
)

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-x-hidden overflow-y-auto", className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="text-2 text-grey-500"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 [&_[cmdk-group-heading]]:p-1.5 [&_[cmdk-group-heading]]:text-1 [&_[cmdk-group-heading]]:text-grey-500",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer items-center rounded-xs p-1 text-1 outline-none select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-grey-300 data-[selected=true]:text-current dark:data-[selected=true]:bg-grey-700",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-1 tracking-widest", className)}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
