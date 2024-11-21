import { useMemo } from "react"
import { createEditor } from "slate"
import { withReact } from "slate-react"
import {
  type IUseFxTextEditorProps,
  type IUseFxTextEditorPayload,
} from "./_interfaces"
import { type FxTextSlateEditableProps, type EnhanceEditorWith } from "./_types"
import { withHistory } from "slate-history"
import { renderLeaf } from "./renderLeaf.js"
import { renderElement } from "./renderElement.js"
import { withBreaks } from "./plugins/breaks/plugin"
import { withAutoFormat } from "./plugins/_index"
import { withTables } from "./plugins/table/plugin"

export const DefaultFxTextSlateEditableProps: FxTextSlateEditableProps = {
  renderLeaf,
  renderElement,
  disableDefaultStyles: true,
}

export function useFxTextEditor(
  props: IUseFxTextEditorProps
): IUseFxTextEditorPayload {
  const { onMediasUpdate } = props
  const editor = useMemo(() => {
    const plugins: Array<{ f: EnhanceEditorWith; args?: any }> = [
      { f: withReact },
      { f: withHistory },
      { f: withAutoFormat },
      { f: withBreaks },
      { f: withTables },
    ]
    const enhancedEditor = plugins.reduce((e, plugin) => {
      return plugin.f(e, ...Object.values(plugin.args || {}))
    }, createEditor())
    return enhancedEditor
  }, [onMediasUpdate])
  return { editor, editableProps: { ...DefaultFxTextSlateEditableProps } }
}
