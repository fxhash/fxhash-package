import { MouseEventHandler, ReactNode } from "react"
import { defaultInlineFormats } from "./useInlineStyleMenu"

export type InlineServiceTypes = (typeof defaultInlineFormats)[number]

export type InlineServiceConfig = {
  [key in InlineServiceTypes]: ({
    setOverrideContent,
  }: {
    setOverrideContent: () => void
  }) => ReactNode
}

export type FxTextTableColAlignment = "left" | "center" | "right"
export type ToggleFxTextTableColAlignment = (
  newAlign: FxTextTableColAlignment
) => MouseEventHandler<HTMLButtonElement>
