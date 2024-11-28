import { blockDefinition, DefaultSlateElement } from "./_definition.js"

export const mathDefinition = blockDefinition({
  name: "Math",
  isInstantiable: true,
  hasNodeMenu: true,
  instanciateElement: () => ({
    type: "math",
    math: "",
    children: [
      {
        text: "",
      },
    ],
  }),
})

export const inlineMathDefinition = blockDefinition({
  name: "Math",
  renderElement: DefaultSlateElement("span", () => ({
    contentEditable: false,
  })),
})
