import { Fragment, useCallback, useMemo, useRef } from "react"
import {
  type IUseFxTextEditorProps,
  type IUseFxTextEditorPayload,
} from "./_interfaces"
import {
  type FxTextSlateEditableProps,
  FxTextBlockDefinitions,
  FxTextEditor,
} from "./_types"
import { renderLeaf } from "./renderLeaf.js"
import { renderFxTextElement } from "./renderElement.js"
import { defaultFxTextEditorBlockDefinition } from "./blockDefinitions.js"
import mergeWith from "lodash.mergewith"
import { createFxEditor } from "./createFxTextEditor.js"

export const DefaultFxTextSlateEditableProps: FxTextSlateEditableProps = {
  renderLeaf,
  disableDefaultStyles: false,
}

export function useFxTextEditor(
  props: IUseFxTextEditorProps
): IUseFxTextEditorPayload {
  const {
    onMediasUpdate,
    nodeMenu = Fragment,
    inlineElements,
    voidElements,
  } = props

  const blockDefinitions = useMemo<FxTextBlockDefinitions>(() => {
    const _definitions = mergeWith(
      defaultFxTextEditorBlockDefinition,
      props.blockDefinitions || {}
    )
    return _definitions
  }, [props.blockDefinitions])

  const editorRef = useRef<FxTextEditor>()
  if (!editorRef.current) {
    editorRef.current = createFxEditor({
      blockDefinitions,
      onMediasUpdate,
      inlineElements,
      voidElements,
    })
  }
  const editor = editorRef.current

  const renderElement = useCallback(renderFxTextElement({ nodeMenu }), [
    nodeMenu,
  ])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      editor?.onKeyDown?.(event)
    },
    [editor]
  )

  return {
    editor,
    editableProps: {
      ...DefaultFxTextSlateEditableProps,
      renderElement,
      onKeyDown,
    },
  }
}
