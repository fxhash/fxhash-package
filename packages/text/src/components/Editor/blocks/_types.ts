import { type FunctionComponent, type PropsWithChildren } from "react"
import { Element, type Editor, type Path } from "slate"
import {
  type IEditAttributeProps,
  type IAttributesEditorWrapperProps,
  IFxTextBlockDefinition,
} from "./_interfaces.js"
import { T } from "vitest/dist/reporters-5f784f42.js"

export type EditAttributeComp = FunctionComponent<
  PropsWithChildren<IEditAttributeProps>
>

export type AttributesEditorWrapper = FunctionComponent<
  PropsWithChildren<IAttributesEditorWrapperProps>
>

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
export type TEditNodeFn = (update: Element) => void

// a function which outputs a TEditNodeFn based on some construction properties
export type TEditNodeFnFactory = (
  editor: Editor,
  element: Element,
  path: Path
) => TEditNodeFn

export type FxTextBlockDefinitionOverride<
  T extends IFxTextBlockDefinition<any>,
> = Pick<T, "renderElement" | "renderEditElementButton" | "onEditNodeFactory">

export type FxTextFigureDefinition = IFxTextBlockDefinition<null>
export type FxTextFigureDefinitionOverride =
  FxTextBlockDefinitionOverride<FxTextFigureDefinition>
