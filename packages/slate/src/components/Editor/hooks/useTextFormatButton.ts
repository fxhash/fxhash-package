import { useSlate, useSlateWithV } from "slate-react"
import {
  UseTextFormatButtonPayload,
  UseTextFormatButtonProps,
} from "./_interfaces"
import { toggleFormat } from "../utils/toggleFormat"
import { useHotkey } from "./useHotkey"
import { useCallback, useMemo } from "react"
import { isFormatActive } from "../utils/isFormatActive"

export function useTextFormatButton(
  props: UseTextFormatButtonProps
): UseTextFormatButtonPayload {
  const editor = useSlate()
  const { v } = useSlateWithV()

  const isActive = useMemo(
    () => isFormatActive(editor, props.format),
    [v, editor, props.format]
  )

  const handleToggleFormat = useCallback(() => {
    toggleFormat(editor, props.format)
  }, [v, editor, props.format])

  useHotkey(props.hotkey, handleToggleFormat)

  return { onClick: handleToggleFormat, isActive }
}
