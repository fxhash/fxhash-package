import { Editor, Range } from "slate"
import { AutoFormatChange } from "./_types"
import { BlockTypeChange } from "./BlockTypeChange"
import { CustomDirectiveChange } from "./CustomDirectiveChange"
import { InlineTypeChange } from "./InlineTypeChange"

const changeWithSpaceValidation: AutoFormatChange[] = [
  // Create formats for h1-h6
  ...Array.from(
    { length: 5 },
    (_, i) =>
      new BlockTypeChange(
        Array(i + 1)
          .fill("#")
          .join(""),
        {
          type: "heading",
          depth: i + 1,
        }
      )
  ),
  new BlockTypeChange("p", { type: "paragraph" }),
  new InlineTypeChange(["__", "**"], { strong: true }),
  new InlineTypeChange(["_", "*"], { emphasis: true }),
  new BlockTypeChange(["---", "***", "___"], { type: "thematicBreak" }),
  new CustomDirectiveChange("tezos-storage-pointer"),
]

export const withAutoFormat = (editor: Editor) => {
  const { insertText } = editor
  editor.insertText = text => {
    const { selection } = editor
    let handled = false
    console.log("??")
    if (selection && Range.isCollapsed(selection)) {
      if (text === " ") {
        console.log("space")
        handled = changeWithSpaceValidation.some(change => change.apply(editor))
      }
      if (handled) return true
    }
    insertText(text)
  }

  return editor
}
