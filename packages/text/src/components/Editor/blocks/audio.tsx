import { IFxTextBlockDefinition, IFxTextBlockDefinition } from "./_interfaces"

interface InstanciateAudioOpts {
  src?: string
  caption?: string
}
export const audioDefinition: IFxTextBlockDefinition<InstanciateAudioOpts> = {
  name: "Audio",
  icon: <i className="fa-solid fa-music" aria-hidden />,
  buttonInstantiable: true,
  render: ({ attributes, element, children }) => {
    return <div>{children}</div>
  },
  hasUtilityWrapper: false,
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
