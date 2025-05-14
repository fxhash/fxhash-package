import { useCallback, useEffect, useRef } from "react"

export function useIsMounted() {
  const isMounted = useRef(true)
  useEffect(() => {
    // this line is for dev, because react calls return fn() on dev
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])
  return useCallback(() => isMounted.current, [])
}
