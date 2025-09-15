import { cn } from "@/lib/cn"
import * as React from "react"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[90px] w-full rounded-xs bg-transparent text-grey-600 transition-colors file:border-0 file:bg-transparent file:text-1 file:font-medium placeholder:text-grey-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-grey-400",
          "h-9 gap-3 px-3 py-1 text-1",
          "border border-grey-300 focus-visible:ring-1 focus-visible:ring-violet-900 focus-visible:ring-offset-1 dark:border-grey-600",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
