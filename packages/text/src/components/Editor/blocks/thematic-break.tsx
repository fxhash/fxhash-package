import { blockDefinition, DefaultSlateElement } from "./_definition.js"

export const thematicBreakDefinition = blockDefinition<null>({
  name: "Horizontal break",
  isInstantiable: true,
  hasNodeMenu: true,
  renderElement: DefaultSlateElement("hr"),
  instanciateElement: () => ({
    type: "thematicBreak",
    children: [
      {
        text: "",
      },
    ],
  }),
})
