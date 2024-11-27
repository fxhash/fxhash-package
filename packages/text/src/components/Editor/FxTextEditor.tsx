import { Editable, Slate } from "slate-react"
import { useFxTextEditor } from "./useFxTextEditor.js"
import { IFxTextEditorProps } from "./_interfaces.js"
import { useEffect } from "react"

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
    onInit,
  } = props
  const { editor, editableProps: defaultEditableProps } = useFxTextEditor({
    onMediasUpdate,
    blockDefinitions,
    nodeMenu,
  })
  useEffect(() => {
    onInit?.(editor)
  }, [editor])
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
