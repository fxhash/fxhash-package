import useAsyncEffect from "use-async-effect"

export const useClientAsyncEffect = (
  effect: (isMounted: () => boolean) => unknown,
  dependencies?: any[]
): void => {
  if (typeof window !== "undefined") {
    useAsyncEffect(effect, dependencies) // eslint-disable-line
  }
}