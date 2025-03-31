import { isHotkey } from "is-hotkey"
import { useEffect } from "react"

export function useHotkey(
  hotkey: string | undefined,
  handler: () => void,
  skip?: boolean | null
) {
  useEffect(() => {
    if (!hotkey || skip) return
    const handleHotKey = (event: KeyboardEvent) => {
      if (isHotkey(hotkey, event)) {
        event.preventDefault()
        handler()
      }
    }

    document.addEventListener("keydown", handleHotKey)
    return () => {
      document.removeEventListener("keydown", handleHotKey)
    }
  }, [hotkey, handler, skip])
}
