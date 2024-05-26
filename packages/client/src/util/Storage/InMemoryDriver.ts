import { StorageDriver, StorageValue } from "./Storage.js"

export class InMemoryStorageDriver implements StorageDriver {
  private store: Map<string, StorageValue>

  constructor() {
    this.store = new Map<string, StorageValue>()
  }

  getItem(key: string): StorageValue {
    return this.store.get(key) ?? null
  }

  setItem(key: string, value: StorageValue): void {
    this.store.set(key, value)
  }

  removeItem(key: string): void {
    this.store.delete(key)
  }

  clear(): void {
    this.store.clear()
  }
}
