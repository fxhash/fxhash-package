import { blockDefinition, DefaultSlateElement } from "./_definition.js"

export const paragraphDefinition = blockDefinition({
  name: "Paragraph",
  isInstantiable: true,
  hasNodeMenu: true,
  renderElement: DefaultSlateElement("p"),
  instanciateElement: (text?: string) => ({
    type: "paragraph",
    children: [
      {
        text: text || "",
      },
    ],
  }),
})
