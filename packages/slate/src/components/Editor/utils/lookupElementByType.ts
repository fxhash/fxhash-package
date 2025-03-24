import { Editor, type NodeEntry, Element } from "slate"

const isTypeInArray = (type: string, typesToCheck: string[]) =>
  typesToCheck.indexOf(type) > -1

const isTypeEqual = (type: string, typeToCheck: string) => type === typeToCheck

export function lookupElementByType(
  editor: Editor,
  type: string | string[]
): NodeEntry {
  const checkType = Array.isArray(type) ? isTypeInArray : isTypeEqual

  const [element] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      checkType(n.type, type as any),
  })
  return element
}
