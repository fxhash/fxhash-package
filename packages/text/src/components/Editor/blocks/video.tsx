import { blockDefinition, DefaultSlateElement } from "./_definition.js"

interface InstanciateVideoOpts {
  src?: string
  caption?: string
}
export const videoDefinition = blockDefinition<InstanciateVideoOpts>({
  name: "Video",
  isInstantiable: true,
  hasNodeMenu: false,
  renderElement: DefaultSlateElement("div"),
  instanciateElement: (opts = { src: "", caption: "" }) => ({
    type: "figure",
    children: [
      {
        type: "video",
        src: opts.src,
        children: [
          {
            text: "",
          },
        ],
      },
      {
        type: "figcaption",
        children: [
          {
            text: opts.caption,
          },
        ],
      },
    ],
  }),
})
