import { type BaseEditor, type BaseElement } from "slate"
import { type HistoryEditor } from "slate-history"
import { type ReactEditor } from "slate-react"
import {
  type IFxTextNodeMenuProps,
  type ITezosStoragePointerProps,
} from "../_index.js"
import { type EditableProps } from "slate-react/dist/components/editable"
import { type IFxTextBlockDefinition } from "./blocks/_interfaces.js"
import {
  FxTextBlockDefinitionOverride,
  type FxTextBlockType,
} from "./blocks/_types.js"

export type FxTextNodeMenuComponentType =
  React.ComponentType<IFxTextNodeMenuProps>

export type FxTextBlockDefinitions = Record<
  FxTextBlockType,
  IFxTextBlockDefinition<any>
>

export type FxTextBlockDefinitionOverrides = Partial<
  Record<
    FxTextBlockType,
    FxTextBlockDefinitionOverride<IFxTextBlockDefinition<any>>
  >
>

export type FxTextSlateEditableProps = Pick<
  EditableProps,
  "renderElement" | "renderLeaf" | "disableDefaultStyles" | "onKeyDown"
>

// elements
export type TypeElement = BaseElement & {
  type: string
  children: any
}

export type HeadlineElement = TypeElement & {
  depth: number
}

export type ImageEditor = TypeElement & {
  title: string
  url: string
  alt?: string
}

type TezosStorageElement = TypeElement & ITezosStoragePointerProps

export type CustomElement = HeadlineElement | TezosStorageElement | ImageEditor

// text

export const ALL_TEXT_FORMATS = ["strong", "emphasis", "inlineCode"] as const
export type TextFormat = (typeof ALL_TEXT_FORMATS)[number]

export type TextFormats = { [key in TextFormat]: boolean }

export type FormattedText = {
  text: string
} & TextFormats

export type CustomText = FormattedText

// editor
export type FxTextEditorMediaType = "image" | "video" | "audio"

export type FxTextEditorMediaFile = {
  uri: string
  type: FxTextEditorMediaType
}

export type FxTextEditorExtension = {
  onKeyDown?: (event: React.KeyboardEvent) => void
  updateMediaUrl: (target: FxTextEditorMediaFile, uri: string) => void
  getUploadedMedias: () => FxTextEditorMediaFile[]
  getBlockDefinition: (type: string) => IFxTextBlockDefinition<unknown>
}

export type FxTextEditor = BaseEditor &
  ReactEditor &
  HistoryEditor &
  FxTextEditorExtension

export type EnhanceEditorWith = (editor: FxTextEditor, ...args: any[]) => any

declare module "slate" {
  interface CustomTypes {
    Editor: FxTextEditor
    Element: CustomElement
    Text: CustomText
  }
}
