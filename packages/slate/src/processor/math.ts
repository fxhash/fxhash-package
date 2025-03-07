import { ISlateElementProcessor } from "./_interfaces"

export const mathProcessor: ISlateElementProcessor = {
  transformMarkdownMdhastToSlate: (node: any) => {
    return {
      type: node.type,
      children: [{ text: "" }],
      math: node.value,
    }
  },
  transformSlateToMarkdownMdhast: (node: any) => ({
    type: node.type,
    value: node.math,
  }),
}
