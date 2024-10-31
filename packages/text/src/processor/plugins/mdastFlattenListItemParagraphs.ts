import { visit } from "unist-util-visit"
import { CustomNode } from "./_interfaces"
import { Transformer } from "unified"

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
