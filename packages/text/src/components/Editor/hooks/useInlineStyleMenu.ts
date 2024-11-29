import { useSlate } from "slate-react"
import { Range } from "slate"
import { useElementAtSelection } from "./useElementAtSelection"
import { IUseInlineStyleMenuPayload } from "./_interfaces"
import { ReactNode, useLayoutEffect, useMemo, useRef, useState } from "react"
import { ALL_TEXT_FORMATS } from "../_types"

export const defaultInlineFormats = [...ALL_TEXT_FORMATS, "link"]

export function useInlineStyleMenu(): IUseInlineStyleMenuPayload {
  const [overrideContent, setOverrideContent] = useState<ReactNode | null>(null)
  const editor = useSlate()
  const elementAtSelection = useElementAtSelection()
  const validInlineStyles = elementAtSelection?.definition.inlineMenu

  const noInlineStyleSupport = validInlineStyles === null

  const isHidden = useMemo(() => {
    const { selection } = editor
    if (!noInlineStyleSupport) {
      if (selection && !Range.isCollapsed(selection)) return false
    }
    return true
  }, [editor.selection, noInlineStyleSupport])

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
        window.scrollX -
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
    overrideContent,
    setOverrideContent,
    // Add this handler to your div the ref is applied to to prevent
    // taking the focus away from the editor when interacting with the menu
    onMouseDown: e => {
      e.preventDefault()
    },
    validInlineStyles: noInlineStyleSupport
      ? []
      : validInlineStyles === undefined
        ? defaultInlineFormats
        : validInlineStyles,
  }
}
