import { invariant } from "@fxhash/utils"
import { IStorageDriver } from "./_interfaces.js"

/**
 * A storage driver which uses `window.localStorage`.
 *
 * @param baseKey A prefix which will be prepended to all the key in the store.
 * Can be used as a namespace to avoid collisions with other modules which may
 * be using the same underlying store.
 *
 * @throws if `localStorage` is undefined
 */
export function localStorageDriver(baseKey = "fxhash.client"): IStorageDriver {
  invariant(
    typeof localStorage !== "undefined",
    "localStorage API is undefined"
  )

  const _base = baseKey
  const _getKey = (key: string) => `${_base}:${key}`

  return {
    name: "LocalStorageDriver",
    getItem: async key => {
      const value = localStorage.getItem(_getKey(key))
      return value ? JSON.parse(value) : null
    },
    setItem: async (key, value) =>
      localStorage.setItem(_getKey(key), JSON.stringify(value)),
    removeItem: async key => localStorage.removeItem(_getKey(key)),
  }
}
