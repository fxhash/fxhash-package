import { IArticleBlockDefinition } from "./_interfaces"

export const embedDefinition: IArticleBlockDefinition<any> = {
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
