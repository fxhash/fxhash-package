import { ISlateElementProcessor } from "./_interfaces.js"

export const videoProcessor: ISlateElementProcessor = {
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
