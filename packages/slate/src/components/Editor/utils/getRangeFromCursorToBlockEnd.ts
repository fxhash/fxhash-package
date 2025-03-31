import { Editor, type Range } from "slate"

export function getRangeFromCursorToBlockEnd(editor: Editor): Range {
  const { anchor } = editor.selection as Range
  const block = Editor.above(editor, {
    match: n => Editor.isBlock(editor, n),
  })
  const path = block ? block[1] : []
  const end = Editor.end(editor, path)
  const range = { anchor, focus: end }
  return range
}
