import { blockDefinition, DefaultSlateElement } from "./_definition.js"

export const blockquoteDefinition = blockDefinition<null>({
  name: "Quote",
  isInstantiable: true,
  hasNodeMenu: true,
  renderElement: DefaultSlateElement("blockquote"),
  instanciateElement: () => ({
    type: "blockquote",
    children: [
      {
        text: "",
      },
    ],
  }),
})
