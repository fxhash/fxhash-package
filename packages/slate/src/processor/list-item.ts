import { ISlateElementProcessor } from "./_interfaces.js"

export const listItemProcessor: ISlateElementProcessor = {
  transformSlateToMarkdownMdhast: (
    node: any,
    next: (children: any[]) => any
  ) => {
    return {
      type: "listItem",
      spread: node.spread,
      children: [
        {
          type: "paragraph",
          children: next(node.children),
        },
      ],
    }
  },
}
