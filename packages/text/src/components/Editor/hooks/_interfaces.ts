import { Element, Node, Range } from "slate"
import { TextFormat } from "../_types"
import { TEditNodeFn } from "../blocks/_types"
import { IFxTextBlockDefinition, InlineServiceTypes } from "../_index"
import { ReactEventHandler, ReactNode } from "react"

export interface IUseInlineStyleMenuPayload {
  isHidden: boolean
  menuRef: React.RefObject<HTMLDivElement>
  overrideContent: ReactNode
  setOverrideContent: (content: ReactNode) => void
  onMouseDown: (e: React.MouseEvent) => void
  validInlineStyles: InlineServiceTypes[]
}

export interface UseTextFormatButtonProps {
  format: TextFormat
  hotkey?: string
}

export interface UseTextFormatButtonPayload {
  isActive: boolean
  onClick: () => void
}

export interface IUseNodeMenuProps {
  element: Element
}

export interface IUseNodeMenuPayload {
  addNode: (element: Element) => void
  deleteNode: () => void
  editNode: TEditNodeFn
  isFocused: boolean
  definition: IFxTextBlockDefinition<any>
}

export interface IUseUpdateElementProps {
  element: Element
}

export interface IUseUpdateElementPayload {
  updateElementProperties: <T extends Node>(props: Partial<T>) => void
}

export interface IUseMediaSourceProps {
  src: string
  type: "audio" | "video"
}

export interface IUseMediaSourcePayload {
  type: "audio" | "video" | undefined
  sourceType: string | undefined
  extension: string | undefined
  url: string
  error: Error | null
  onCanPlay: ReactEventHandler<HTMLVideoElement | HTMLAudioElement>
  onError: ReactEventHandler<HTMLVideoElement | HTMLAudioElement>
}

export interface IUseMentionMatchPayload {
  range: Range
  text: string
}

export interface IUseElementAtSelectionPayload {
  element: Element
  definition: IFxTextBlockDefinition<any>
}
