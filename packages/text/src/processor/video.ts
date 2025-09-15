import { IArticleElementProcessor } from "./_interfaces.js"

export const videoProcessor: IArticleElementProcessor = {
  transformMdhastToComponent: (node, properties) => {
    return {
      src: properties.src || "",
      controls: true,
    }
  },
}
