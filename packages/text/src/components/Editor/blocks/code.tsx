import { IFxTextBlockDefinition } from "./_interfaces"

interface InstanciateCodeOpts {
  lang?: string
}
export const codeDefinition: IFxTextBlockDefinition<InstanciateCodeOpts> = {
  name: "Code",
  icon: <i className="fa-solid fa-code" aria-hidden />,
  buttonInstantiable: true,
  render: ({ children }) => {
    return <div>{children}</div>
  },
  hasUtilityWrapper: true,
  instanciateElement: (opts = { lang: "js" }) => ({
    type: "code",
    lang: opts.lang,
    children: [
      {
        text: "",
      },
    ],
  }),
}
