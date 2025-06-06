import { Editor, Transforms } from "slate"
import { getRangeFromBlockStartToCursor } from "../../utils/getRangeFromBlockStartToCursor.js"
import { getTextFromBlockStartToCursor } from "../../utils/getTextFromBlockStartToCursor.js"
import { AutoFormatChange, AutoFormatChangeType, ChangeData } from "./_types.js"

export class BlockTypeChange implements AutoFormatChange {
  shortcut: string | string[]
  type: AutoFormatChangeType
  data: ChangeData
  constructor(shortcut: string | string[], data: ChangeData) {
    this.shortcut = shortcut
    this.data = data
    this.type = "BlockTypeChange"
  }

  apply = (editor: Editor): boolean => {
    const textBeforeCursor = `${getTextFromBlockStartToCursor(editor)} `
    const testValues =
      typeof this.shortcut === "string" ? [this.shortcut] : this.shortcut
    const shortcutMatch = testValues.find(shortcut =>
      textBeforeCursor.startsWith(`${shortcut} `)
    )
    if (!shortcutMatch) return false

    Transforms.delete(editor, {
      at: getRangeFromBlockStartToCursor(editor),
    })
    Transforms.setNodes(editor, { ...this.data })
    return true
  }
}
