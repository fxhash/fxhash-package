import { Editor } from "slate"

export function isFormatActive(
  editor: Editor,
  format: string,
  options = {}
): boolean {
  const [match] = Editor.nodes(editor, {
    match: n => n[format] === true,
    mode: "all",
    ...options,
  })
  return !!match
}
