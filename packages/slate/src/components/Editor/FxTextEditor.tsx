import { Editable, Slate } from "slate-react"
import { useFxTextEditor } from "./useFxTextEditor.js"
import { type IFxTextEditorProps } from "./_interfaces.js"
import { forwardRef, useEffect, useImperativeHandle } from "react"
import { FxTextEditor } from "./_types.js"

export const FxTextSlate = forwardRef<FxTextEditor, IFxTextEditorProps>(
  (props: IFxTextEditorProps, ref) => {
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
    const {
      editor,
      editableProps: { onKeyDown, ...defaultEditableProps },
    } = useFxTextEditor({
      onMediasUpdate,
      blockDefinitions,
      nodeMenu,
    })
    useEffect(() => {
      onInit?.(editor)
      onChange?.(value)
    }, [editor])

    useImperativeHandle(ref, () => editor, [editor])

    return (
      <Slate editor={editor} initialValue={value} onChange={onChange}>
        <Editable
          {...defaultEditableProps}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className={className}
        />
        {children}
      </Slate>
    )
  }
)
