import { Element } from "slate"
import { TextFormat } from "../_types"
import { TEditNodeFn } from "../blocks/_types"

export interface UseInlineStyleMenuPayload {
  isHidden: boolean
  menuRef: React.RefObject<HTMLDivElement>
  onMouseDown: (e: React.MouseEvent) => void
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
}
