import { blockDefinition } from "./_definition.js"

interface InstanciateAudioOpts {
  src?: string
  caption?: string
}

export const audioDefinition = blockDefinition<InstanciateAudioOpts>({
  name: "Audio",
  isInstantiable: true,
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
})
