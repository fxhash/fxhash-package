import { ReactNode } from "react"
import { defaultInlineFormats } from "./useInlineStyleMenu"

export type InlineServiceTypes = (typeof defaultInlineFormats)[number]

export type InlineServiceConfig = {
  [key in InlineServiceTypes]: ({
    setOverrideContent,
  }: {
    setOverrideContent: () => void
  }) => ReactNode
}
