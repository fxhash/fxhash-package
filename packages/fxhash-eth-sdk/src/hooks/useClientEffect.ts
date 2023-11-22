import { DependencyList, EffectCallback, useEffect } from "react"

export const useClientEffect = (
  effect: EffectCallback,
  dependencies?: DependencyList
): void => {
  if (typeof window !== "undefined") {
    useEffect(effect, dependencies) // eslint-disable-line
  }
}
