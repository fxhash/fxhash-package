import { useSelected, useSlateStatic } from "slate-react"
import { SlateTable } from "../plugins/_index"
import { IUseSlateTableProps, IUseSlateTablePayload } from "./_interfaces"
import { FxTextTableColAlignment } from "./_types"
import { SyntheticEvent } from "react"

export function useSlateTable(
  props: IUseSlateTableProps
): IUseSlateTablePayload {
  const { element } = props
  const editor = useSlateStatic()
  const isSelected = useSelected()
  const selectedPos = isSelected
    ? SlateTable.getSelectedPos(editor, element)
    : null
  function addCol(e: SyntheticEvent) {
    e.preventDefault()
    SlateTable.addCol(editor, element)
  }
  function addRow(e: SyntheticEvent) {
    e.preventDefault()
    SlateTable.addRow(editor, element)
  }

  function setColAlignment(alignment: FxTextTableColAlignment) {
    return (e: SyntheticEvent) => {
      e.preventDefault()
      if (!selectedPos) return
      SlateTable.setColAlignment(editor, element, selectedPos.col, alignment)
    }
  }

  function deleteCol(e: SyntheticEvent) {
    e.preventDefault()
    if (!selectedPos) return
    const { cols } = SlateTable.getTableInfos(element)
    if (cols > 1) {
      SlateTable.deleteCol(editor, element, selectedPos.col)
    }
  }

  function deleteRow(e: SyntheticEvent) {
    e.preventDefault()
    if (!selectedPos) return
    const { rows } = SlateTable.getTableInfos(element)
    if (rows > 1) {
      SlateTable.deleteRow(editor, element, selectedPos.row)
    }
  }

  return {
    addCol,
    addRow,
    setColAlignment,
    deleteCol,
    deleteRow,
    selectedPos,
    info: SlateTable.getTableInfos(element),
  }
}
