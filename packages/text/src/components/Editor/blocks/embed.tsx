import { IFxTextBlockDefinition } from "./_interfaces.js"

export const embedDefinition: IFxTextBlockDefinition<any> = {
  name: "Embed media",
  icon: <i className="fa-brands fa-youtube" aria-hidden />,
  buttonInstantiable: true,
  render: ({ attributes, element, children }) => (
    <div
    // Embed
    // slateElement={element}
    // slateAttributes={attributes}
    // href={element.href}
    // editable
    >
      {children}
    </div>
  ),
  hasUtilityWrapper: true,
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
