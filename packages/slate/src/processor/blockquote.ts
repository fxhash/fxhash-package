import { ISlateElementProcessor } from "./_interfaces.js"

export const blockquoteProcessor: ISlateElementProcessor = {
  transformMarkdownMdhastToSlate: (node: any, next: any) => {
    let children = next(node.children)

    // If the only child is a paragraph, lift its children
    if (children.length === 1 && children[0].type === "paragraph") {
      return {
        type: "blockquote",
        children: children[0].children,
      }
    }

    if (children.length === 0) {
      children = [{ text: "" }]
    }

    return {
      type: "blockquote",
      children,
    }
  },
  transformSlateToMarkdownMdhast: (node: any, next: any) => {
    // Ensure the blockquote content is wrapped in a paragraph
    // This maintains valid markdown structure
    const children = node.children.map((child: any) => {
      // If the child is already a block-level element, return as is
      if (["paragraph", "heading", "list"].includes(child.type)) {
        return child
      }

      // Otherwise wrap inline content in a paragraph
      return {
        type: "paragraph",
        children: [child],
      }
    })

    return {
      type: "blockquote",
      children: next(children),
    }
  },
}
