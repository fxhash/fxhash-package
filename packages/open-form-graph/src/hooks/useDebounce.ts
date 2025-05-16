import { useRef, useEffect } from "react"

export const useDebounce = (callback: () => void, delay: number) => {
  const latestCallback = useRef<() => void>()
  const latestTimeout = useRef<any>()

  useEffect(() => {
    latestCallback.current = callback
  }, [callback])

  return () => {
    if (latestTimeout.current) {
      clearTimeout(latestTimeout.current)
    }

    latestTimeout.current = setTimeout(() => {
      latestCallback?.current?.()
    }, delay)
  }
}
