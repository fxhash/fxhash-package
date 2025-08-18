import * as React from "react"
import { buttonBaseVariants } from "."
import { Slot } from "@radix-ui/react-slot"
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDots,
} from "@tabler/icons-react"
import { cn } from "@/lib/cn"
import { cva, type VariantProps } from "class-variance-authority"
import { PropsWithoutRefOrColor } from "./helpers"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "flex w-full flex-row items-center justify-center gap-1",
      className
    )}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))

PaginationItem.displayName = "PaginationItem"

const paginationLinkVariants = cva("", {
  variants: {
    size: {
      icon: "size-9",
      button: "h-9 px-3 py-2",
    },
  },
  defaultVariants: {
    size: "icon",
  },
})

export type PaginationLinkElement = React.ElementRef<"a">

interface PaginationLinkOwnProps
  extends VariantProps<typeof paginationLinkVariants> {
  active?: boolean
  asChild?: boolean
  disabled?: boolean
}

type PaginationLinkProps = PaginationLinkOwnProps & PropsWithoutRefOrColor<"a">

const PaginationLink = React.forwardRef<
  PaginationLinkElement,
  PaginationLinkProps
>(
  (
    {
      className,
      active,
      size,
      asChild = false,
      children,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const state = active ? "active" : disabled ? "disabled" : "idle"
    return (
      <Slot
        aria-current={active ? "page" : undefined}
        data-state={state}
        className={cn(
          paginationLinkVariants({ size }),
          buttonBaseVariants({
            variant: "outline",
          }),
          "cursor-pointer",
          className
        )}
        ref={ref}
        {...props}
      >
        {asChild ? children : <a>{children}</a>}
      </Slot>
    )
  }
)

PaginationLink.displayName = "PaginationLink"

interface PaginationQuickLinksProps extends PaginationLinkProps {
  InnerWrapper?: React.ElementType
}

const PaginationPrevious = ({
  className,
  InnerWrapper = React.Fragment,
  ...props
}: PaginationQuickLinksProps) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn("", className)}
    {...props}
  >
    <InnerWrapper>
      <IconChevronLeft size={16} />
    </InnerWrapper>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  InnerWrapper = React.Fragment,
  ...props
}: PaginationQuickLinksProps) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("", className)}
    {...props}
  >
    <InnerWrapper>
      <IconChevronRight size={16} />
    </InnerWrapper>
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationFirst = ({
  className,
  InnerWrapper = React.Fragment,
  ...props
}: PaginationQuickLinksProps) => (
  <PaginationLink
    aria-label="Go to first page"
    size="button"
    className={cn("", className)}
    {...props}
  >
    <InnerWrapper>
      <IconChevronsLeft size={16} />
      <span>first</span>
    </InnerWrapper>
  </PaginationLink>
)
PaginationFirst.displayName = "PaginationFirst"

const PaginationLast = ({
  className,
  InnerWrapper = React.Fragment,
  ...props
}: PaginationQuickLinksProps) => (
  <PaginationLink
    aria-label="Go to last page"
    size="button"
    className={cn("", className)}
    {...props}
  >
    <InnerWrapper>
      <span>last</span>
      <IconChevronsRight size={16} />
    </InnerWrapper>
  </PaginationLink>
)
PaginationLast.displayName = "PaginationLast"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn(
      "flex size-9 cursor-default items-center justify-center",
      className
    )}
    {...props}
  >
    <IconDots size={16} />
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
}
