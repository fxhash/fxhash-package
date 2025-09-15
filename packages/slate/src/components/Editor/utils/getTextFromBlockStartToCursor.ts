import { Editor } from "slate"
import { getRangeFromBlockStartToCursor } from "./getRangeFromBlockStartToCursor"

export function getTextFromBlockStartToCursor(editor: Editor): string {
  const range = getRangeFromBlockStartToCursor(editor)
  return Editor.string(editor, range)
}
