import { IFxTextBlockDefinition } from "./_interfaces.js"

export const mathDefinition: IFxTextBlockDefinition<any> = {
  name: "Math",
  icon: <i className="fa-solid fa-function" aria-hidden />,
  buttonInstantiable: true,
  render: ({ attributes, element, children }) => <div>{children}</div>,
  hasUtilityWrapper: true,
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
  icon: <i className="fa-solid fa-function" aria-hidden />,
  render: ({ attributes, element, children }) => (
    <span contentEditable={false}>inline math</span>
  ),
  hasUtilityWrapper: false,
}
