import { IFxTextBlockDefinition } from "./_interfaces"

interface InstanciateImageOpts {
  url?: string
  caption?: string
}
export const imageDefinition: IFxTextBlockDefinition<InstanciateImageOpts> = {
  name: "Image",
  icon: <i className="fa-solid fa-image" aria-hidden />,
  buttonInstantiable: true,
  render: ({ children }) => <div>{children}</div>,
  hasUtilityWrapper: false,
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
