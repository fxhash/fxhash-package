import { h } from "hastscript"
import { visit } from "unist-util-visit"
import { CustomNode } from "./_interfaces"
import { mentionProcessor } from "../mention"
import { Transformer } from "unified"

export function remarkMentions(): Transformer<CustomNode, CustomNode> {
  return (tree: any) => {
    visit(tree, (node: any) => {
      if (node.type === "mention") {
        const component = mentionProcessor
        if (component?.transformMdhastToComponent) {
          const hast: any = h(node.name, { value: node.value })
          const props = component.transformMdhastToComponent(
            node,
            hast.properties
          )
          if (props) {
            const data = node.data || (node.data = {})
            data.hName = component.htmlTagName || hast.tagName
            data.hProperties = props
          }
        }
      }
    })
  }
}
