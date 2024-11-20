import { Editable, Slate } from "slate-react"
import { useFxTextEditor } from "./useFxTextEditor"
import { IFxTextEditorProps } from "./_interfaces"

export function FxTextEditor(props: IFxTextEditorProps) {
  const { value, onMediasUpdate } = props
  const { editor } = useFxTextEditor({ onMediasUpdate })
  return (
    <Slate editor={editor} value={value}>
      <Editable />
    </Slate>
  )
}
