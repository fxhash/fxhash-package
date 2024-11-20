import { type Node } from "slate"
import { FxTextEditor, FxTextEditorMediaFile } from "./_types"

export interface IUseFxTextEditorProps {
  onMediasUpdate: (medias: FxTextEditorMediaFile[]) => void
}

export interface IUseFxTextEditorPayload {
  editor: FxTextEditor
}

export interface IFxTextEditorProps {
  value: Node[]
  onChange: (value: Node[]) => void
  onMediasUpdate: (medias: FxTextEditorMediaFile[]) => void
}
