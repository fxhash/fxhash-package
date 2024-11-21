import { IArticleBlockDefinition } from "./_interfaces"

export const blockquoteDefinition: IArticleBlockDefinition<any> = {
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
