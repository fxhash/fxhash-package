import { IFxTextBlockDefinition } from "./_interfaces.js"

export const mathDefinition: IFxTextBlockDefinition<any> = {
  name: "Math",
  isInstantiable: true,
  hasNodeMenu: true,
  renderElement: ({ attributes, children }) => (
    <div {...attributes}>{children}</div>
  ),
  instanciateElement: () => ({
    type: "math",
    math: "",
    children: [
      {
        text: "",
      },
    ],
  }),
}

export const inlineMathDefinition: IFxTextBlockDefinition<any> = {
  name: "Math",
  hasNodeMenu: false,
  renderElement: ({ attributes }) => (
    <span {...attributes} contentEditable={false}>
      inline math
    </span>
  ),
}
