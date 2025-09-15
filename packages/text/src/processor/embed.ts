import { IArticleElementProcessor } from "./_interfaces.js"

export const embedProcessor: IArticleElementProcessor = {
  htmlTagName: "embed-media",
  htmlAttributes: ["href", "editable"],
  transformMdhastToComponent: (node, properties) => {
    return {
      href: properties.href || "",
      editable: false,
    }
  },
}
