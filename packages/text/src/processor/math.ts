import { IArticleElementProcessor } from "./_interfaces"

export const mathProcessor: IArticleElementProcessor = {
  transformMarkdownMdhastToSlate: (node: any) => {
    return {
      type: node.type,
      children: [{ text: "" }],
      math: node.value,
    }
  },
  transformSlateToMarkdownMdhast: (node: any) => ({
    type: node.type,
    value: node.math,
  }),
}
