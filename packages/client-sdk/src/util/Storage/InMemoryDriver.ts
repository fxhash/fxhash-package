import { StorageDriver, StorageValue } from "./Storage.js"

export class InMemoryStorageDriver implements StorageDriver {
  private store: Map<string, StorageValue>

  constructor() {
    this.store = new Map<string, StorageValue>()
  }

  async getItem(key: string): Promise<StorageValue> {
    return this.store.get(key) ?? null
  }

  async setItem(key: string, value: StorageValue): Promise<void> {
    this.store.set(key, value)
  }

  async removeItem(key: string): Promise<void> {
    this.store.delete(key)
  }
}
