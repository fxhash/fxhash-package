import { RenderLeafProps } from "slate-react"

export const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.strong) {
    children = <strong>{children}</strong>
  }
  if (leaf.emphasis) {
    children = <em>{children}</em>
  }
  if (leaf.inlineCode) {
    children = <code>{children}</code>
  }
  return <span {...attributes}>{children}</span>
}
