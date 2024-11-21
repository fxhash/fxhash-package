import { IFxTextBlockDefinition } from "./_interfaces"

export const thematicBreakDefinition: IFxTextBlockDefinition<any> = {
  name: "Horizontal break",
  icon: <i className="fa-solid fa-horizontal-rule" aria-hidden />,
  render: () => <hr />,
  instanciateElement: () => ({
    type: "thematicBreak",
    children: [
      {
        text: "",
      },
    ],
  }),
  buttonInstantiable: true,
  hasUtilityWrapper: true,
}
