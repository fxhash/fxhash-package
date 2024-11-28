import { Path, Editor, Transforms, Range, Element, Node } from "slate"
import { IFxTextBlockDefinition } from "./_interfaces.js"
import { blockDefinition } from "./_definition.js"

export const listDefinition = blockDefinition<null>({
  name: "List",
  isInstantiable: true,
  hasNodeMenu: true,
  renderElement: ({ attributes, element, children }) =>
    element.ordered ? (
      <ol {...attributes}>{children}</ol>
    ) : (
      <ul {...attributes}>{children}</ul>
    ),
  instanciateElement: () => ({
    type: "list",
    ordered: false,
    spread: false,
    children: [
      {
        type: "listItem",
        children: [
          {
            text: "",
          },
        ],
      },
    ],
  }),
})

export const listItemDefinition = blockDefinition<null>({
  name: "List Item",
  renderElement: ({ attributes, element, children }) => (
    <li {...attributes}>
      {element.checked === true ? (
        <input type="checkbox" readOnly checked />
      ) : element.checked === false ? (
        <input type="checkbox" readOnly />
      ) : null}
      {children}
    </li>
  ),
  insertBreakBehavior: (editor, element) => {
    const { selection } = editor
    if (selection && !Range.isCollapsed(selection)) return true
    const [nodeListItem, pathListItem] = element
    const text = Node.string(nodeListItem)
    if (text) return true
    const nextLi = Path.next(pathListItem)
    const hasNextLi = Node.has(editor, nextLi)
    if (hasNextLi) return true
    const parentList = Editor.above(editor, {
      at: pathListItem,
      match: n =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === "list",
      mode: "lowest",
    })
    if (!parentList) return true
    const [, pathParentList] = parentList
    const next = Path.next(pathParentList)
    Transforms.setNodes(
      editor,
      { type: "paragraph" },
      {
        at: pathListItem,
      }
    )
    Transforms.moveNodes(editor, {
      at: pathListItem,
      to: next,
    })
    return
  },
})
