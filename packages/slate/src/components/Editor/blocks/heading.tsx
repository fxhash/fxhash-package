import { EBreakBehavior } from "../plugins/_index.js"
import { IFxTextBlockDefinition } from "./_interfaces.js"

export const headingDefinition: IFxTextBlockDefinition<any> = {
  name: "Heading",
  isInstantiable: true,
  hasNodeMenu: true,
  renderElement: ({ attributes, element, children }) => {
    switch (element.depth) {
      case 1:
        return <h1 {...attributes}>{children}</h1>
      case 2:
        return <h2 {...attributes}>{children}</h2>
      case 3:
        return <h3 {...attributes}>{children}</h3>
      case 4:
        return <h4 {...attributes}>{children}</h4>
      case 5:
        return <h5 {...attributes}>{children}</h5>
      case 6:
        return <h6 {...attributes}>{children}</h6>
      default:
        return <div {...attributes}>unhandled headline type</div>
    }
  },
  insertBreakBehavior: EBreakBehavior.insertParagraph,
  instanciateElement: () => ({
    type: "heading",
    depth: 1,
    children: [
      {
        text: "",
      },
    ],
  }),
  // editAttributeComp: HeadingAttributeSettings,
}
