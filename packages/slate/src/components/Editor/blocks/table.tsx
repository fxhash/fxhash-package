import { SlateTable } from "../plugins/table/plugin.js"
import { IFxTextBlockDefinition } from "./_interfaces.js"

export const tableDefinition: IFxTextBlockDefinition<null> = {
  name: "Table",
  isInstantiable: true,
  hasNodeMenu: true,
  renderElement: ({ children }) => <table>{children}</table>,
  hasDeleteBehaviorRemoveBlock: true,
  instanciateElement: () => SlateTable.createTable(2, 2),
  preventAutofocusTrigger: true,
}

export const tableRowDefinition: IFxTextBlockDefinition<null> = {
  name: "Table row",
  hasNodeMenu: false,
  renderElement: ({ attributes, children }) => {
    return <tr {...attributes}>{children}</tr>
  },
}

export const tableCellDefinition: IFxTextBlockDefinition<null> = {
  name: "Table cell",
  hasNodeMenu: false,
  renderElement: ({ attributes, children }) => {
    return <td {...attributes}>{children}</td>
  },
  inlineMenu: ["strong", "emphasis"],
}
