import { IStorageDriver, StorageValue } from "./_interfaces.js"

/**
 * Uses an in-memory javascript object to store the values. The storage only
 * persists in RAM and will disappear once application stops.
 */
export function inMemoryStorageDriver(): IStorageDriver {
  const _store = new Map<string, StorageValue>()

  return {
    name: "InMemoryStorageDriver",
    getItem: async key => _store.get(key) ?? null,
    setItem: async (key, value): Promise<void> => {
      _store.set(key, value)
    },
    removeItem: async key => {
      _store.delete(key)
    },
  }
}
