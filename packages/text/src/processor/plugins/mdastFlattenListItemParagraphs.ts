import { visit } from "unist-util-visit"
import { Transformer } from "unified"
import { CustomNode } from "./_interfaces.js"

export function mdastFlattenListItemParagraphs(): Transformer<
  CustomNode,
  CustomNode
> {
  return ast => {
    visit<any, any>(ast, "listItem", (listItem: any) => {
      if (
        listItem.children.length === 1 &&
        listItem.children[0].type === "paragraph"
      ) {
        listItem.children = listItem.children[0].children
      }
      return listItem
    })
    return ast
  }
}
