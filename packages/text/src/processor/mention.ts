import { IArticleElementProcessor } from "./_interfaces"

export const mentionProcessor: IArticleElementProcessor = {
  htmlAttributes: ["tzAddress"],
  transformSlateToMarkdownMdhast: (node: any) => {
    return {
      type: "text",
      value: `@${node.tzAddress}`,
    }
  },
  transformMarkdownMdhastToSlate: (node: any) => ({
    type: node.type,
    children: [{ text: "" }],
    tzAddress: node.value,
  }),
  transformMdhastToComponent: (node, properties) => {
    return {
      tzAddress: properties.value,
    }
  },
}
