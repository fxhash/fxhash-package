import { useMemo } from "react"
import { createEditor } from "slate"
import { withReact } from "slate-react"
import {
  IUseFxTextEditorProps,
  type IUseFxTextEditorPayload,
} from "./_interfaces"
import { type EnhanceEditorWith } from "./_types"
import { withHistory } from "slate-history"
import {
  EditableProps,
  RenderLeafProps,
} from "slate-react/dist/components/editable"

export const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.strong) {
    children = <strong>{children}</strong>
  }
  if (leaf.emphasis) {
    children = <em>{children}</em>
  }
  if (leaf.inlineCode) {
    children = <code>{children}</code>
  }
  return <span {...attributes}>{children}</span>
}

export const DefaultFxTextSlateEditableProps: EditableProps = {
  renderLeaf,
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
    ]
    const enhancedEditor = plugins.reduce((e, plugin) => {
      return plugin.f(e, ...Object.values(plugin.args || {}))
    }, createEditor())
    return enhancedEditor
  }, [onMediasUpdate])
  return { editor, editableProps: { ...DefaultFxTextSlateEditableProps } }
}
