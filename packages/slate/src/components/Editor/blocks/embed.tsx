import { IFxTextBlockDefinition } from "./_interfaces.js"

export const embedDefinition: IFxTextBlockDefinition<any> = {
  name: "Embed media",
  isInstantiable: true,
  hasNodeMenu: true,
  renderElement: ({ children, attributes }) => (
    <div
      // Embed
      // slateElement={element}
      // slateAttributes={attributes}
      // href={element.href}
      // editable
      {...attributes}
    >
      {children}
    </div>
  ),
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
}
