import { visit } from "unist-util-visit"
import { u } from "unist-builder"
import { Transformer } from "unified"
import { CustomNode } from "./_interfaces.js"

export function mdastNestListItemWithParagraphs(): Transformer<
  CustomNode,
  CustomNode
> {
  return ast => {
    visit<any, any>(ast, "listItem", (listItem: any) => {
      if (
        !(
          listItem.children.length === 1 &&
          listItem.children[0].type === "paragraph"
        )
      ) {
        const t = u("paragraph", listItem.children)
        listItem = u("listItem", [t])
        //listItem.children = u("paragraph", listItem.children)
      }
      return listItem
    })
    return ast
  }
}
