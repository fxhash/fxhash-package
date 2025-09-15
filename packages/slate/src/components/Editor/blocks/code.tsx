import { IFxTextBlockDefinition } from "./_interfaces.js"

interface InstanciateCodeOpts {
  lang?: string
}
export const codeDefinition: IFxTextBlockDefinition<InstanciateCodeOpts> = {
  name: "Code",
  isInstantiable: true,
  hasNodeMenu: true,
  renderElement: ({ children, attributes }) => {
    return <div {...attributes}>{children}</div>
  },
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
