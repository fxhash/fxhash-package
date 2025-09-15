import { IFxTextBlockDefinition } from "./_interfaces.js"

interface InstanciateAudioOpts {
  src?: string
  caption?: string
}
export const audioDefinition: IFxTextBlockDefinition<InstanciateAudioOpts> = {
  name: "Audio",
  isInstantiable: true,
  hasNodeMenu: false,
  renderElement: ({ children, attributes }) => {
    return <div {...attributes}>{children}</div>
  },
  instanciateElement: (opts = { src: "", caption: "" }) => ({
    type: "figure",
    children: [
      {
        type: "audio",
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
