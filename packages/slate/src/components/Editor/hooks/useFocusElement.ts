import React from "react"
import { Transforms } from "slate"
import { ReactEditor, useSlateStatic } from "slate-react"
import { IUseFocusElementPayload, IUseFocusElementProps } from "./_interfaces"

export function useFocusElement({
  element,
}: IUseFocusElementProps): IUseFocusElementPayload {
  const editor = useSlateStatic()
  const focusElement = React.useCallback(() => {
    ReactEditor.focus(editor)
    Transforms.select(editor, ReactEditor.findPath(editor, element))
  }, [element])
  return { focusElement }
}
