import { useMemo } from "react"
import { lookupElementAtSelection } from "../utils/lookupElementAtSelection"
import { useSlateSelection, useSlateStatic } from "slate-react"
import { Location } from "slate"
import { IUseElementAtSelectionPayload } from "./_interfaces"

export function useElementAtSelection(): IUseElementAtSelectionPayload | null {
  const editor = useSlateStatic()
  const selection = useSlateSelection()

  const element = useMemo(() => {
    const [elementUnderCursor] =
      lookupElementAtSelection(editor, selection as Location) || []
    return elementUnderCursor
  }, [selection])

  if (!element) return null
  return { element, definition: editor.getBlockDefinition(element.type) }
}
