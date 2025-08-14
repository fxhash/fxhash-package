import * as React from "react"
import { cn } from "@/lib/cn"
import { Text } from "./Text"

const BreadcrumbsSeparator = () => (
  <Text
    className="mx-1 flex select-none"
    color="grey-light"
    aria-hidden
    asChild
  >
    <li>/</li>
  </Text>
)

type BreadcrumbsElement = React.ElementRef<"nav">
interface BreadcrumbsProps {
  className?: string
  children: React.ReactNode
}

export const Breadcrumbs = React.forwardRef<
  BreadcrumbsElement,
  BreadcrumbsProps
>(({ className, children, ...props }, forwardedRef) => {
  const allItems = React.Children.toArray(children)
    .filter(child => React.isValidElement(child))
    .flatMap((child, index, array) => [
      <li key={`child-${index}`}>{child}</li>,
      index !== array.length - 1 && (
        <BreadcrumbsSeparator key={`separator-${index}`} />
      ),
    ])

  return (
    <nav ref={forwardedRef} aria-label="breadcrumbs" {...props}>
      <ol className={cn("flex flex-wrap items-center", className)}>
        {allItems}
      </ol>
    </nav>
  )
})

Breadcrumbs.displayName = "Breadcrumbs"
