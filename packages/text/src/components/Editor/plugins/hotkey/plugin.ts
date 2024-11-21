import isHotkey from "is-hotkey"
import { Editor } from "slate"
import { TextFormatKey } from "../../_types"
import { toggleFormat } from "../../utils/toggleFormat"

const HOTKEYS: { [key: string]: TextFormatKey } = {
  "mod+b": "strong",
  "mod+i": "emphasis",
  "mod+`": "inlineCode",
}

export function onKeyDownHotkeyPlugin(
  editor: Editor,
  event: React.KeyboardEvent
): void {
  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey, event as any)) {
      event.preventDefault()
      const mark = HOTKEYS[hotkey]
      toggleFormat(editor, mark)
    }
  }
}
