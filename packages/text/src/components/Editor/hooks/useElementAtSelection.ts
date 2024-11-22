import { useMemo } from "react"
import { lookupElementAtSelection } from "../utils/lookupElementAtSelection"
import { useSlateSelection, useSlateStatic } from "slate-react"
import { Location, Element } from "slate"

export function useElementAtSelection(): Element | null {
  const editor = useSlateStatic()
  const selection = useSlateSelection()

  const element = useMemo(() => {
    const [elementUnderCursor] =
      lookupElementAtSelection(editor, selection as Location) || []
    return elementUnderCursor
  }, [selection])

  return element
}
