import { ISlateElementProcessor } from "./_interfaces"

export const mentionProcessor: ISlateElementProcessor = {
  htmlAttributes: ["tzAddress"],
  transformSlateToMarkdownMdhast: (node: any) => {
    return {
      type: "text",
      value: `@${node.tzAddress}`,
    }
  },
  transformMarkdownMdhastToSlate: (node: any) => ({
    type: node.type,
    children: [{ text: "" }],
    tzAddress: node.value,
  }),
}
