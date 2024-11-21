import { useMemo } from "react"
import { createEditor } from "slate"
import { withReact } from "slate-react"
import {
  type IUseFxTextEditorProps,
  type IUseFxTextEditorPayload,
} from "./_interfaces"
import {
  type FxTextSlateEditableProps,
  type EnhanceEditorWith,
  FxTextBlockDefinitions,
} from "./_types"
import { withHistory } from "slate-history"
import { renderLeaf } from "./renderLeaf.js"
import { renderElement } from "./renderElement.js"
import { withBreaks } from "./plugins/breaks/plugin"
import { withAutoFormat } from "./plugins/_index"
import { withTables } from "./plugins/table/plugin"
import { withConstraints } from "./plugins/constraints/plugin"
import { withCustomBlockDefinitions } from "./plugins/block-defintions/plugin"
import { defaultFxTextEditorBlockDefinition } from "./blockDefinitions"
import mergeWith from "lodash.mergewith"
import { FxTextBlockType } from "./blocks/_types"

export const DEFAULT_INLINE_ELEMENTS: readonly FxTextBlockType[] =
  Object.freeze(["inlineMath", "link", "mention"])

export const DEFAULT_VOID_ELEMENTS: readonly FxTextBlockType[] = Object.freeze([
  "inlineMath",
  "math",
  "mention",
])

export const DefaultFxTextSlateEditableProps: FxTextSlateEditableProps = {
  renderLeaf,
  renderElement,
  disableDefaultStyles: true,
}

export function useFxTextEditor(
  props: IUseFxTextEditorProps
): IUseFxTextEditorPayload {
  const { onMediasUpdate } = props

  const inlineElements = useMemo(
    () => [...DEFAULT_INLINE_ELEMENTS, ...(props?.inlineElements || [])],
    [props.inlineElements]
  )
  const voidElements = useMemo(
    () => [...DEFAULT_VOID_ELEMENTS, ...(props?.voidElements || [])],
    [props.voidElements]
  )
  const definitions = useMemo<FxTextBlockDefinitions>(() => {
    const _definitions = mergeWith(
      defaultFxTextEditorBlockDefinition,
      props.blockDefinitions || {}
    )
    return _definitions
  }, [props.blockDefinitions])

  const editor = useMemo(() => {
    const plugins: Array<{ f: EnhanceEditorWith; args?: any }> = [
      { f: withReact },
      { f: withHistory },
      { f: withCustomBlockDefinitions, args: { definitions } },
      { f: withAutoFormat },
      { f: withTables },
      { f: withConstraints },
      { f: withBreaks },
    ]
    const enhancedEditor = plugins.reduce((e, plugin) => {
      return plugin.f(e, ...Object.values(plugin.args || {}))
    }, createEditor())

    const { isInline, isVoid } = enhancedEditor
    enhancedEditor.isInline = element =>
      inlineElements.includes(element.type) || isInline(element)
    enhancedEditor.isVoid = element =>
      voidElements.includes(element.type) || isVoid(element)
    return enhancedEditor
  }, [onMediasUpdate])

  return { editor, editableProps: { ...DefaultFxTextSlateEditableProps } }
}
