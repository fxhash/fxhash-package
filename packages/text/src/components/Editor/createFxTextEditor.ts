import { createEditor } from "slate"
import { withHistory } from "slate-history"
import { withReact } from "slate-react"
import { EnhanceEditorWith, FxTextEditor } from "./_types"
import {
  withCustomBlockDefinitions,
  withAutoFormat,
  withTables,
  withConstraints,
  withBreaks,
} from "./plugins/_index"
import { withMediaSupport } from "./plugins/media/plugin"
import { IUseFxTextEditorProps } from "./_interfaces"
import { FxTextBlockType } from "./_index"

export const DEFAULT_INLINE_ELEMENTS: readonly FxTextBlockType[] =
  Object.freeze(["inlineMath", "link", "mention"])

export const DEFAULT_VOID_ELEMENTS: readonly FxTextBlockType[] = Object.freeze([
  "inlineMath",
  "math",
  "mention",
])

export function createFxEditor({
  blockDefinitions,
  onMediasUpdate,
  inlineElements,
  voidElements,
}: Pick<
  IUseFxTextEditorProps,
  "blockDefinitions" | "onMediasUpdate" | "inlineElements" | "voidElements"
>): FxTextEditor {
  const _inlineElements = [
    ...DEFAULT_INLINE_ELEMENTS,
    ...(inlineElements || []),
  ]
  const _voidElements = [...DEFAULT_VOID_ELEMENTS, ...(voidElements || [])]

  const plugins: Array<{ f: EnhanceEditorWith; args?: any }> = [
    { f: withReact },
    { f: withHistory },
    { f: withCustomBlockDefinitions, args: { definitions: blockDefinitions } },
    { f: withAutoFormat },
    { f: withMediaSupport, args: { onMediasUpdate } },
    { f: withTables },
    { f: withConstraints },
    { f: withBreaks },
  ]
  const enhancedEditor = plugins.reduce((e, plugin) => {
    return plugin.f(e, ...Object.values(plugin.args || {}))
  }, createEditor())

  const { isInline, isVoid } = enhancedEditor
  enhancedEditor.isInline = element =>
    _inlineElements.includes(element.type) || isInline(element)
  enhancedEditor.isVoid = element =>
    _voidElements.includes(element.type) || isVoid(element)
  return enhancedEditor
}
