import { useMemo } from "react"
import { lookupElementAtSelection } from "../utils/lookupElementAtSelection"
import { useSlate } from "slate-react"
import { Location, NodeEntry, Element } from "slate"

export function useElementAtSelection(): Element | null {
  const editor = useSlate()

  const element = useMemo(() => {
    const [elementUnderCursor] =
      lookupElementAtSelection(editor, editor.selection as Location) || []
    return elementUnderCursor
  }, [editor])

  return element
}
