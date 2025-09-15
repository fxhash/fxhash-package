import { Editor } from "slate"
import { isMarkActive } from "./isMarkActive"

export function toggleMark(editor: Editor, format: string): void {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}
