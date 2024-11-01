import { IArticleElementProcessor } from "./_interfaces"

export const videoProcessor: IArticleElementProcessor = {
  transformMdhastToComponent: (node, properties) => {
    return {
      src: properties.src || "",
      controls: true,
    }
  },
  transformMarkdownMdhastToSlate: node => {
    return {
      type: "figure",
      children: [
        {
          type: "video",
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
