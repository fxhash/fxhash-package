import { blockDefinition } from "./_definition.js"

interface InstanciateImageOpts {
  url?: string
  caption?: string
}
export const imageDefinition = blockDefinition<InstanciateImageOpts>({
  name: "Image",
  isInstantiable: true,
  instanciateElement: (opts = { url: "", caption: "" }) => ({
    type: "figure",
    children: [
      {
        type: "image",
        url: opts.url, // if "", will display the "add image" component
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
