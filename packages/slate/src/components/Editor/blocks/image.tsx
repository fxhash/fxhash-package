import { IFxTextBlockDefinition } from "./_interfaces.js"

interface InstanciateImageOpts {
  url?: string
  caption?: string
}
export const imageDefinition: IFxTextBlockDefinition<InstanciateImageOpts> = {
  name: "Image",
  isInstantiable: true,
  hasNodeMenu: false,
  renderElement: ({ children, attributes }) => (
    <div {...attributes}>{children}</div>
  ),
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
}
