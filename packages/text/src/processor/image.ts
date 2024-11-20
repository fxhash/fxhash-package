import { IArticleElementProcessor } from "./_interfaces"

export const imageProcessor: IArticleElementProcessor = {
  transformMarkdownMdhastToSlate: node => {
    return {
      type: "figure",
      children: [
        {
          type: "image",
          url: node.url,
          children: [
            {
              text: "",
            },
          ],
        },
        {
          type: "figcaption",
          children: [
            {
              text: node.alt,
            },
          ],
        },
      ],
    }
  },
}
