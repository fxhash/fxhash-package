import { Editor, type NodeEntry, type Location } from "slate"

export function lookupElementAtSelection(
  editor: Editor,
  selection: Location | null
): NodeEntry | null {
  if (!selection) return null
  const [, nodePath] = Editor.last(editor, selection)
  return Editor.parent(editor, nodePath)
}
