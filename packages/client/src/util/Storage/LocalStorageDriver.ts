import { StorageDriver, StorageValue } from "./Storage.js"

export class LocalStorageDriver implements StorageDriver {
  private base: string

  constructor(base = "FXHASH_CLIENT") {
    this.base = base
  }

  private getKey(key: string): string {
    return `${this.base}${key}`
  }

  getItem(key: string): StorageValue {
    const value = localStorage.getItem(this.getKey(key))
    return value ? JSON.parse(value) : null
  }

  setItem(key: string, value: StorageValue): void {
    localStorage.setItem(this.getKey(key), JSON.stringify(value))
  }

  removeItem(key: string): void {
    localStorage.removeItem(this.getKey(key))
  }

  clear(): void {
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(this.base)) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key))
  }
}
