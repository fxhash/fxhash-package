import { type Element, type Node } from "slate"
import { type EditableProps } from "slate-react/dist/components/editable"
import {
  type FxTextNodeMenuComponentType,
  type FxTextEditor,
  type FxTextEditorMediaFile,
  type FxTextSlateEditableProps,
  type FxTextBlockDefinitionOverrides,
} from "./_types"
import { type FxTextBlockType } from "./blocks/_types"
import { type PropsWithChildren } from "react"
import { IFxTextBlockDefinition } from "./blocks/_interfaces"
import { defaultInstantiableBlockTypes } from "./blockDefinitions"

export interface IUseInstantiableBlocksPayload {
  instantiableBlocks: IFxTextBlockDefinition<
    typeof defaultInstantiableBlockTypes
  >[]
}

export interface IFxTextNodeMenuProps extends PropsWithChildren {
  element: Element
}

export interface IRenderFxTextElementProps {
  nodeMenu: FxTextNodeMenuComponentType
}

export interface IUseFxTextEditorProps {
  inlineElements?: FxTextBlockType[]
  voidElements?: FxTextBlockType[]
  blockDefinitions?: FxTextBlockDefinitionOverrides
  onMediasUpdate: (medias: FxTextEditorMediaFile[]) => void
  nodeMenu?: FxTextNodeMenuComponentType
}

export interface IUseFxTextEditorPayload {
  editor: FxTextEditor
  editableProps: FxTextSlateEditableProps
}

export interface IFxTextEditorProps extends PropsWithChildren {
  className?: string
  value: Node[]
  onChange: (value: Node[]) => void
  onMediasUpdate: (medias: FxTextEditorMediaFile[]) => void
  placeholder?: EditableProps["placeholder"]
  blockDefinitions?: FxTextBlockDefinitionOverrides
  nodeMenu?: FxTextNodeMenuComponentType
  onInit?: (editor: FxTextEditor) => void
}
