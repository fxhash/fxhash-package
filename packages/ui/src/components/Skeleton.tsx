import * as React from "react"
import { cn } from "@/lib/cn"
import { PropsWithoutRefOrColor } from "./helpers"
import { Slot } from "@radix-ui/react-slot"

type SkeletonElement = React.ElementRef<"div">
interface SkeletonProps extends PropsWithoutRefOrColor<"div"> {}

/**
 * A skeleton is a placeholder that represents the shape of the content that will be loaded.
 *
 * Option 1 (Basic):
 *
 * @example
 * ```tsx
 * <Skeleton className="w-20 h-20" />
 * ```
 *
 * Option 2 (With children):
 * The skeleton will adapt to the size of the children:
 *
 * @example
 * ```tsx
 * <Skeleton>
 *  <div className="w-10 h-10 bg-red-500" />
 * </Skeleton>
 *
 * Option 3 (With Text):
 * The skeleton will adapt to the size of the text, it needs to be wrapped in a Text component and
 * take the width of the textL
 *
 * @example
 * ```tsx
 * <Text size="2">
 *   <Skeleton>Lorem ipsum</Skeleton>
 * </Text>
 */
export const Skeleton = React.forwardRef<SkeletonElement, SkeletonProps>(
  ({ children, className, ...props }, forwardedRef) => {
    const Tag = React.isValidElement(children) ? Slot : "span"

    return (
      <Tag
        ref={forwardedRef}
        aria-hidden
        className={cn(
          "pointer-events-none animate-pulse rounded-md bg-grey-200 select-none dark:bg-grey-600",
          // Resets used to hide the content of the skeleton
          "border-none! bg-none! text-transparent! shadow-none!",
          "*:invisible empty:block",
          className
        )}
        tabIndex={-1}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)
Skeleton.displayName = "Skeleton"
