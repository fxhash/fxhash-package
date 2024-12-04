import { IArticleElementProcessor } from "./_interfaces"

export const listItemProcessor: IArticleElementProcessor = {
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
