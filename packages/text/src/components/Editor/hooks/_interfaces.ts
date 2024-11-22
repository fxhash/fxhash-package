import { TextFormat } from "../_types"

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
