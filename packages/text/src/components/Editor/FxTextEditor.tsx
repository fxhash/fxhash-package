import { Editable, Slate } from "slate-react"
import { useFxTextEditor } from "./useFxTextEditor.js"
import { IFxTextEditorProps } from "./_interfaces.js"

export function FxTextSlate(props: IFxTextEditorProps) {
  const {
    value,
    onMediasUpdate,
    onChange,
    placeholder,
    className,
    blockDefinitions,
    children,
    nodeMenu,
  } = props
  const { editor, editableProps: defaultEditableProps } = useFxTextEditor({
    onMediasUpdate,
    blockDefinitions,
    nodeMenu,
  })
  return (
    <Slate editor={editor} initialValue={value} onChange={onChange}>
      <Editable
        {...defaultEditableProps}
        placeholder={placeholder}
        className={className}
      />
      {children}
    </Slate>
  )
}
