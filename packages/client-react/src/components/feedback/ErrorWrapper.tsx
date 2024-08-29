import { PropsWithChildren } from "react"
import css from "./ErrorWrapper.module.css"

type Props = PropsWithChildren<{
  error?: string | null
  marginTop?: string
  className?: string
}>
export function ErrorWrapper({
  error,
  marginTop = "15px",
  className,
  children,
}: Props) {
  return (
    <div className={className}>
      {children}
      {error && (
        <div className={css.error} style={{ marginTop }}>
          {error}
        </div>
      )}
    </div>
  )
}
