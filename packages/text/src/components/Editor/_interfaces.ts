import { type Node } from "slate"
import { type EditableProps } from "slate-react/dist/components/editable"
import { FxTextEditor, FxTextEditorMediaFile } from "./_types"

export interface IUseFxTextEditorProps {
  onMediasUpdate: (medias: FxTextEditorMediaFile[]) => void
}

export interface IUseFxTextEditorPayload {
  editor: FxTextEditor
  editableProps: EditableProps
}

export interface IFxTextEditorProps {
  value: Node[]
  onChange: (value: Node[]) => void
  onMediasUpdate: (medias: FxTextEditorMediaFile[]) => void
  placeholder?: EditableProps["placeholder"]
}
