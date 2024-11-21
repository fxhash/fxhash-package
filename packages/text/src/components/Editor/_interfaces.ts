import { type Node } from "slate"
import { type EditableProps } from "slate-react/dist/components/editable"
import {
  type FxTextEditor,
  type FxTextEditorMediaFile,
  type FxTextSlateEditableProps,
} from "./_types"

export interface IUseFxTextEditorProps {
  onMediasUpdate: (medias: FxTextEditorMediaFile[]) => void
}

export interface IUseFxTextEditorPayload {
  editor: FxTextEditor
  editableProps: FxTextSlateEditableProps
}

export interface IFxTextEditorProps {
  className?: string
  value: Node[]
  onChange: (value: Node[]) => void
  onMediasUpdate: (medias: FxTextEditorMediaFile[]) => void
  placeholder?: EditableProps["placeholder"]
}
