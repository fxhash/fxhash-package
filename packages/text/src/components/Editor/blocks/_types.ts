import { type FunctionComponent, type PropsWithChildren } from "react"
import { type Editor, type Path } from "slate"
import {
  type IEditAttributeProps,
  type IAttributesEditorWrapperProps,
} from "./_interfaces.js"

export type EditAttributeComp = FunctionComponent<
  PropsWithChildren<IEditAttributeProps>
>

export type AttributesEditorWrapper = FunctionComponent<
  PropsWithChildren<IAttributesEditorWrapperProps>
>

export enum EFxTextBlocks {
  "embed-media" = "embed-media",
  "tezos-storage-pointer" = "tezos-storage-pointer",
  "paragraph" = "paragraph",
  "heading" = "heading",
  "thematicBreak" = "thematicBreak",
  "blockquote" = "blockquote",
  "list" = "list",
  "listItem" = "listItem",
  "table" = "table",
  "tableRow" = "tableRow",
  "tableCell" = "tableCell",
  "html" = "html",
  "inlineMath" = "inlineMath",
  "math" = "math",
  "code" = "code",
  "yaml" = "yaml",
  "toml" = "toml",
  "break" = "break",
  "link" = "link",
  "figure" = "figure",
  "figcaption" = "figcaption",
  "image" = "image",
  "video" = "video",
  "mention" = "mention",
  "audio" = "audio",
}

export type FxTextBlockType =
  | "embed-media"
  | "tezos-storage-pointer"
  | "paragraph"
  | "heading"
  | "thematicBreak"
  | "blockquote"
  | "list"
  | "listItem"
  | "table"
  | "tableRow"
  | "tableCell"
  | "html"
  | "inlineMath"
  | "math"
  | "code"
  | "yaml"
  | "toml"
  | "break"
  | "link"
  | "figure"
  | "figcaption"
  | "image"
  | "video"
  | "mention"
  | "audio"

// a function which updates a node based on some update fields
export type TEditNodeFn = (update: any) => void

// a function which outputs a TEditNodeFn based on some construction properties
export type TEditNodeFnFactory = (
  editor: Editor,
  element: Element,
  path: Path
) => TEditNodeFn
