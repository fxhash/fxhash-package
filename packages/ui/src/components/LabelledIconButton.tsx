import { cn } from "@/lib/cn"
import { ButtonHTMLAttributes, ReactNode } from "react"

type LabelledIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode
  label: string
  layout?: "vertical" | "horizontal"
}

export const LabelledIconButton = ({
  icon,
  label,
  className,
  layout = "vertical",
  ...props
}: LabelledIconButtonProps) => {
  return (
    <button
      className={cn(
        "h-[40px] min-w-[33px] px-2 pt-0.5",
        "flex flex-col items-center justify-center bg-transparent",
        "text-grey-500 hover:text-grey-900 dark:hover:text-white",
        "rounded-md hover:bg-grey-200 dark:hover:bg-grey-800",
        {
          "flex-row gap-1 pt-0": layout === "horizontal",
        },
        className
      )}
      {...props}
    >
      {icon}
      <span className="mt-[-2px] text-[10px]">{label}</span>
    </button>
  )
}
