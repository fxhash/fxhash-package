import { SlateTable } from "../plugins/table/plugin.js"
import { blockDefinition, DefaultSlateElement } from "./_definition.js"

export const tableDefinition = blockDefinition({
  name: "Table",
  isInstantiable: true,
  hasNodeMenu: true,
  renderElement: DefaultSlateElement("table"),
  hasDeleteBehaviorRemoveBlock: true,
  instanciateElement: () => SlateTable.createTable(2, 2),
  preventAutofocusTrigger: true,
})

export const tableRowDefinition = blockDefinition<null>({
  name: "Table row",
  hasNodeMenu: false,
  renderElement: DefaultSlateElement("tr"),
})

export const tableCellDefinition = blockDefinition<null>({
  name: "Table cell",
  hasNodeMenu: false,
  renderElement: DefaultSlateElement("td"),
  inlineMenu: ["strong", "emphasis"],
})
