import { type Node } from "slate"
import { type EditableProps } from "slate-react/dist/components/editable"
import {
  type FxTextBlockDefinitions,
  type FxTextEditor,
  type FxTextEditorMediaFile,
  type FxTextSlateEditableProps,
} from "./_types"
import { type FxTextBlockType } from "./blocks/_types"

export interface IUseFxTextEditorProps {
  inlineElements?: FxTextBlockType[]
  voidElements?: FxTextBlockType[]
  blockDefinitions?: Partial<FxTextBlockDefinitions>
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
  blockDefinitions?: Partial<FxTextBlockDefinitions>
}
