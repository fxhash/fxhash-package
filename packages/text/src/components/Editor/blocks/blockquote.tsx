import { IFxTextBlockDefinition } from "./_interfaces.js"

export const blockquoteDefinition: IFxTextBlockDefinition<any> = {
  name: "Quote",
  icon: <i className="fa-solid fa-quotes" aria-hidden />,
  buttonInstantiable: true,
  render: ({ children }) => <blockquote>{children}</blockquote>,
  hasUtilityWrapper: true,
  instanciateElement: () => ({
    type: "blockquote",
    children: [
      {
        text: "",
      },
    ],
  }),
}
