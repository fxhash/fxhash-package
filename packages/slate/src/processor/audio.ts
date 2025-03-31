import { ISlateElementProcessor } from "./_interfaces.js"

export const audioProcessor: ISlateElementProcessor = {
  htmlTagName: "audio",
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
