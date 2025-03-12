import { Editor } from "slate"
import { getRangeFromCursorToBlockEnd } from "./getRangeFromCursorToBlockEnd"

export function getTextFromCursorToBlockEnd(editor: Editor): string {
  const range = getRangeFromCursorToBlockEnd(editor)
  return Editor.string(editor, range)
}
