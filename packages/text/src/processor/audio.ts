import { IArticleElementProcessor } from "./_interfaces"

export const audioProcessor: IArticleElementProcessor = {
  htmlTagName: "audio",
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
