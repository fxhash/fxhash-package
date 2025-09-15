import { Editor } from "slate"

export function isMarkActive(editor: Editor, format: string): boolean {
  const marks = Editor.marks(editor) as { [key: string]: boolean }
  return marks ? marks[format] === true : false
}
