import { IArticleElementProcessor } from "./_interfaces.js"

export const mentionProcessor: IArticleElementProcessor = {
  htmlAttributes: ["tzAddress"],
  transformMdhastToComponent: (node, properties) => {
    return {
      tzAddress: properties.value,
    }
  },
}
