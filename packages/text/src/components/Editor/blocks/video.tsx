import { IFxTextBlockDefinition } from "./_interfaces.js"

interface InstanciateVideoOpts {
  src?: string
  caption?: string
}
export const videoDefinition: IFxTextBlockDefinition<InstanciateVideoOpts> = {
  name: "Video",
  isInstantiable: true,
  hasNodeMenu: false,
  renderElement: ({ attributes, children }) => {
    return <div {...attributes}>{children}</div>
  },
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
}
