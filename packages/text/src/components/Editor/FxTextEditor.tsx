import { Editable, Slate } from "slate-react"
import { useFxTextEditor } from "./useFxTextEditor"
import { IFxTextEditorProps } from "./_interfaces"

export function FxTextEditor(props: IFxTextEditorProps) {
  const { value, onMediasUpdate, onChange } = props
  const { editor } = useFxTextEditor({ onMediasUpdate })
  return (
    <Slate editor={editor} initialValue={value} onChange={onChange}>
      <Editable />
    </Slate>
  )
}
