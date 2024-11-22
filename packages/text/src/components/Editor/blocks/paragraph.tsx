import { IFxTextBlockDefinition } from "./_interfaces.js"

export const paragraphDefinition: IFxTextBlockDefinition<any> = {
  name: "Paragraph",
  icon: <i className="fa-solid fa-paragraph" aria-hidden />,
  buttonInstantiable: true,
  render: ({ attributes, element, children }) => (
    <p {...attributes}>{children}</p>
  ),
  hasUtilityWrapper: true,
  instanciateElement: (text?: string) => ({
    type: "paragraph",
    children: [
      {
        text: text || "",
      },
    ],
  }),
}
