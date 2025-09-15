import { IArticleElementProcessor } from "./_interfaces.js"

export const audioProcessor: IArticleElementProcessor = {
  htmlTagName: "audio",
  transformMdhastToComponent: (node, properties) => {
    return {
      src: properties.src || "",
      controls: true,
    }
  },
}
