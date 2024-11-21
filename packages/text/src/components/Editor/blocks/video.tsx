import { IFxTextBlockDefinition } from "./_interfaces"

interface InstanciateVideoOpts {
  src?: string
  caption?: string
}
export const videoDefinition: IFxTextBlockDefinition<InstanciateVideoOpts> = {
  name: "Video",
  icon: <i className="fa-solid fa-video" aria-hidden />,
  buttonInstantiable: true,
  render: ({ attributes, element, children }) => {
    return <>{children}</>
  },
  hasUtilityWrapper: false,
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
