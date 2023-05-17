import { PropsWithChildren } from "react"
import { Header } from "./Header/Header"
import dynamic from "next/dynamic"

const DynamicBreakpoint = dynamic(
  () => import("@/components/Debug/Breakpoint").then((c) => c.Breakpoint),
  {}
)
interface RootProps {}

export function Root(props: PropsWithChildren<RootProps>) {
  const { children } = props
  return (
    <>
      <main>
        {children}
        {process.env.NODE_ENV !== "production" && <DynamicBreakpoint />}
      </main>
    </>
  )
}
