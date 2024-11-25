import { IFxTextBlockDefinition } from "./_interfaces.js"

export const blockquoteDefinition: IFxTextBlockDefinition<any> = {
  name: "Quote",
  isInstantiable: true,
  hasNodeMenu: true,
  renderElement: ({ children, attributes }) => (
    <blockquote {...attributes}>{children}</blockquote>
  ),
  instanciateElement: () => ({
    type: "blockquote",
    children: [
      {
        text: "",
      },
    ],
  }),
}
