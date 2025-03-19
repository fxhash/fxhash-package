import { IFxTextBlockDefinition } from "./_interfaces.js"

export const paragraphDefinition: IFxTextBlockDefinition<any> = {
  name: "Paragraph",
  isInstantiable: true,
  hasNodeMenu: true,
  renderElement: ({ attributes, children }) => (
    <p {...attributes}>{children}</p>
  ),
  instanciateElement: (text?: string) => ({
    type: "paragraph",
    children: [
      {
        text: text || "",
      },
    ],
  }),
}
