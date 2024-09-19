import { type ReactNode, type ButtonHTMLAttributes } from "react"
import css from "./AuthButton.module.css"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string
}
export function AuthButton({
  icon,
  type = "button",
  className,
  children,
  ...props
}: Props) {
  return (
    <button {...props} type={type} className={`${css.root} ${className || ""}`}>
      <img src={icon} className={css.icon} />
      <span className={css.content}>{children}</span>
    </button>
  )
}
