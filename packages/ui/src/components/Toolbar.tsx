import { cn } from "@/lib/cn"
import { PropsWithChildren } from "react"
import { Separator } from "./Separator.js"

type ToolbarProps = PropsWithChildren<{
  className?: string
}>

export const Toolbar = ({ className, children }: ToolbarProps) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center gap-2",
        "h-[56px] px-4",
        "rounded-lg bg-white shadow-[0_4px_34px_0_rgba(0,0,0,0.1)] dark:bg-black",
        className
      )}
    >
      {children}
    </div>
  )
}
Toolbar.Separator = function ToolbarSeparator() {
  return <Separator className="h-[24px]" orientation="vertical" />
}
