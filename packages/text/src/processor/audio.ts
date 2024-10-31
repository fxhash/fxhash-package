import { IArticleElementProcessor } from "./_interfaces"

export const audioProcessor: IArticleElementProcessor = {
  transformMdhastToComponent: (node, properties) => {
    return {
      src: properties.src || "",
    }
  },
  transformMarkdownMdhastToSlate: node => {
    return {
      type: "figure",
      children: [
        {
          type: "audio",
          src: node.src || "",
          children: [
            {
              text: "",
            },
          ],
        },
        {
          type: "figcaption",
          children: node.children,
        },
      ],
    }
  },
}
