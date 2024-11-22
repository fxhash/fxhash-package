import { Editable, Slate } from "slate-react"
import { useFxTextEditor } from "./useFxTextEditor.js"
import { IFxTextEditorProps } from "./_interfaces.js"

export function FxTextEditor(props: IFxTextEditorProps) {
  const {
    value,
    onMediasUpdate,
    onChange,
    placeholder,
    className,
    blockDefinitions,
  } = props
  const { editor, editableProps: defaultEditableProps } = useFxTextEditor({
    onMediasUpdate,
    blockDefinitions,
  })
  return (
    <Slate editor={editor} initialValue={value} onChange={onChange}>
      <Editable
        {...defaultEditableProps}
        placeholder={placeholder}
        className={className}
      />
    </Slate>
  )
}
