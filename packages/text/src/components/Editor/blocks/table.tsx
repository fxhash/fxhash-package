import { SlateTable } from "../plugins/table/plugin"
import { IArticleBlockDefinition } from "./_interfaces"

export const tableDefinition: IArticleBlockDefinition<null> = {
  name: "Table",
  icon: <i className="fa-regular fa-table" aria-hidden />,
  buttonInstantiable: true,
  render: ({ attributes, element, children }) => <table>{children}</table>,
  hasUtilityWrapper: true,
  hasDeleteBehaviorRemoveBlock: true,
  instanciateElement: () => SlateTable.createTable(2, 2),
  preventAutofocusTrigger: true,
}

export const tableRowDefinition: IArticleBlockDefinition<null> = {
  name: "Table row",
  icon: <i className="fa-regular fa-table" aria-hidden />,
  render: ({ attributes, element, children }) => {
    return <tr {...attributes}>{children}</tr>
  },
  hasUtilityWrapper: false,
}

export const tableCellDefinition: IArticleBlockDefinition<null> = {
  name: "Table cell",
  icon: <i className="fa-regular fa-table" aria-hidden />,
  render: ({ attributes, element, children }) => {
    return <td {...attributes}>{children}</td>
  },
  hasUtilityWrapper: false,
  inlineMenu: ["strong", "emphasis"],
}
