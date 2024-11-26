import { Fragment, useCallback, useMemo } from "react"
import {
  type IUseFxTextEditorProps,
  type IUseFxTextEditorPayload,
} from "./_interfaces"
import { type FxTextSlateEditableProps, FxTextBlockDefinitions } from "./_types"
import { renderLeaf } from "./renderLeaf.js"
import { renderFxTextElement } from "./renderElement.js"
import { defaultFxTextEditorBlockDefinition } from "./blockDefinitions.js"
import mergeWith from "lodash.mergewith"
import { createFxEditor } from "./createFxTextEditor"

export const DefaultFxTextSlateEditableProps: FxTextSlateEditableProps = {
  renderLeaf,
  disableDefaultStyles: true,
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

  const editor = useMemo(() => {
    return createFxEditor({
      blockDefinitions,
      onMediasUpdate,
      inlineElements,
      voidElements,
    })
  }, [onMediasUpdate, blockDefinitions, inlineElements, voidElements])

  const renderElement = useCallback(renderFxTextElement({ nodeMenu }), [
    nodeMenu,
  ])

  return {
    editor,
    editableProps: { ...DefaultFxTextSlateEditableProps, renderElement },
  }
}
