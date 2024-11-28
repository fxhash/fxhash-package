import { blockDefinition } from "./_definition.js"

interface InstanciateCodeOpts {
  lang?: string
}
export const codeDefinition = blockDefinition<InstanciateCodeOpts>({
  name: "Code",
  isInstantiable: true,
  hasNodeMenu: true,
  instanciateElement: (opts = { lang: "js" }) => ({
    type: "code",
    lang: opts.lang,
    children: [
      {
        text: "",
      },
    ],
  }),
})
