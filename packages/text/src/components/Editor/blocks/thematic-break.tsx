import { IFxTextBlockDefinition } from "./_interfaces.js"

export const thematicBreakDefinition: IFxTextBlockDefinition<any> = {
  name: "Horizontal break",
  isInstantiable: true,
  hasNodeMenu: true,
  renderElement: ({ attributes }) => <hr {...attributes} />,
  instanciateElement: () => ({
    type: "thematicBreak",
    children: [
      {
        text: "",
      },
    ],
  }),
}
