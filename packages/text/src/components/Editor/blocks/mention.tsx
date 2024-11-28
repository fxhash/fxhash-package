import { blockDefinition, DefaultSlateElement } from "./_definition.js"

interface InstanciateMentionOpts {
  tzAddress?: string
}
export const mentionDefinition = blockDefinition<InstanciateMentionOpts>({
  name: "Mention",
  hasNodeMenu: false,
  renderElement: DefaultSlateElement("span", () => ({
    contentEditable: false,
  })),
  inlineMenu: null,
  instanciateElement: ({ tzAddress } = { tzAddress: "" }) => ({
    type: "mention",
    tzAddress,
    children: [{ text: "" }],
  }),
})
