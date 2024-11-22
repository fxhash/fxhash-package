import { useSlate } from "slate-react"
import { Range } from "slate"
import { useElementAtSelection } from "./useElementAtSelection"
import { FxTextBlockType } from "../blocks/_types"
import { UseInlineStyleMenuPayload } from "./_interfaces"
import { useLayoutEffect, useMemo, useRef } from "react"
import { ALL_TEXT_FORMATS } from "../_types"

export const defaultInlineFormats = Object.freeze([...ALL_TEXT_FORMATS, "link"])

export function useInlineStyleMenu(): UseInlineStyleMenuPayload {
  const editor = useSlate()
  const elementAtSelection = useElementAtSelection()
  const validInlineStyles = editor.getBlockDefinition(
    elementAtSelection?.type as FxTextBlockType
  )?.inlineMenu

  const blockDoesntSupportInlineStyles = validInlineStyles === null

  const isHidden = useMemo(() => {
    const { selection } = editor
    if (!blockDoesntSupportInlineStyles) {
      if (selection && !Range.isCollapsed(selection)) return false
    }
    return true
  }, [editor.selection, blockDoesntSupportInlineStyles])

  // Position the menu
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (!ref.current) return
    // if (!menuElement || !inFocus || (overrideContent && !activeElement)) return
    try {
      const domSelection = window.getSelection()
      if (!domSelection || domSelection?.rangeCount <= 0) return
      const domRange = domSelection && domSelection.getRangeAt(0)
      const rect = domRange && domRange.getBoundingClientRect()
      if (!rect) return
      const menuElement = ref.current
      menuElement.style.top = `${
        rect.top + window.scrollY - menuElement.offsetHeight
      }px`
      menuElement.style.left = `${
        rect.left +
        window.scrollY -
        menuElement.offsetWidth / 2 +
        rect.width / 2
      }px`
    } catch (e) {
      console.error(e)
    }
  }, [editor.selection, ref])

  return {
    isHidden,
    menuRef: ref,
    // Add this handler to your div the ref is applied to to prevent
    // taking the focus away from the editor when interacting with the menu
    onMouseDown: e => {
      e.preventDefault()
    },
  }
}
