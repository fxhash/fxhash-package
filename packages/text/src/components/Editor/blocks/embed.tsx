import { blockDefinition } from "./_definition.js"

export const embedDefinition = blockDefinition<null>({
  name: "Embed media",
  isInstantiable: true,
  hasNodeMenu: true,
  instanciateElement: () => ({
    type: "embed-media",
    href: "",
    children: [
      {
        text: "",
      },
    ],
  }),
  preventAutofocusTrigger: true,
})
