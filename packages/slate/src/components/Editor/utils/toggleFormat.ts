import { Editor } from "slate"
import { isFormatActive } from "./isFormatActive"

export function toggleFormat(editor: Editor, format: string): void {
  const isActive = isFormatActive(editor, format)
  editor.addMark(format, !isActive)
}
