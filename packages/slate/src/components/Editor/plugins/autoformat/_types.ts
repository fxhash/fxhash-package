import { type Editor } from "slate"

export type AutoFormatChangeType =
  | "BlockTypeChange"
  | "InlineTypeChange"
  | "CustomDirectiveChange"
  | "InlineTypeCreate"
export type ChangeData = { [key: string]: number | string | boolean }

export type AutoFormatChange = {
  shortcut: string | string[]
  type: AutoFormatChangeType
  data?: ChangeData
  apply: (editor: Editor, text?: string) => boolean
}
