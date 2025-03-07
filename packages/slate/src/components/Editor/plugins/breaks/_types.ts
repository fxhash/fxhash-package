import { NodeEntry } from "slate"
import { FxTextEditor } from "../../_types"

export type ShouldDefaultInsertBreak = boolean
export enum EBreakBehavior {
  "default" = "default",
  "insertParagraph" = "insertParagraph",
  "insertParagraphIfEmpty" = "insertParagraphIfEmpty",
  "nothing" = "nothing",
}

export type InsertBreakFunction = (
  editor: FxTextEditor,
  element: NodeEntry
) => ShouldDefaultInsertBreak | void
