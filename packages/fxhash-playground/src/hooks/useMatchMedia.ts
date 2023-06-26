import { useState, useEffect } from "react"

// pass a query like `(min-width: 768px)`
export function useMatchMedia(query: string) {
  const [matches, setMatches] = useState(() => matchMedia(query).matches)

  useEffect(() => {
    const mediaQueryList = matchMedia(query)
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches)

    mediaQueryList.addListener(onChange)
    return () => mediaQueryList.removeListener(onChange)
  }, [query])

  return matches
}
