import { StorageDriver, StorageValue } from "./Storage.js"

export class LocalStorageDriver implements StorageDriver {
  private base: string

  constructor(base = "fxhash.client") {
    this.base = base
  }

  private getKey(key: string): string {
    return `${this.base}:${key}`
  }

  async getItem(key: string): Promise<StorageValue> {
    const value = localStorage.getItem(this.getKey(key))
    return value ? JSON.parse(value) : null
  }

  async setItem(key: string, value: StorageValue): Promise<void> {
    localStorage.setItem(this.getKey(key), JSON.stringify(value))
  }

  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(this.getKey(key))
  }
}
