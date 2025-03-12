import { useMemo } from "react"
import { Editor, Range } from "slate"
import { useSlateSelection, useSlateStatic } from "slate-react"
import { IUseMentionMatchPayload } from "./_interfaces"

export function useMentionMatch(): IUseMentionMatchPayload | null {
  const selection = useSlateSelection()
  const editor = useSlateStatic()
  const match = useMemo(() => {
    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection)
      const wordBefore = Editor.before(editor, start, { unit: "word" })
      const before = wordBefore && Editor.before(editor, wordBefore)
      const beforeRange = before && Editor.range(editor, before, start)
      const beforeText = beforeRange && Editor.string(editor, beforeRange)
      const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/)
      const after = Editor.after(editor, start)
      const afterRange = Editor.range(editor, start, after)
      const afterText = Editor.string(editor, afterRange)
      const afterMatch = afterText.match(/^(\s|$)/)
      if (beforeMatch && afterMatch) {
        return { range: beforeRange, text: beforeMatch[0] }
      }
    }
    return null
  }, [selection])
  return match
}
