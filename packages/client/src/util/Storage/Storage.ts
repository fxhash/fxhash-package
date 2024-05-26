import { InMemoryStorageDriver } from "./InMemoryDriver.js"

export type StorageValue = null | string | number | boolean | object

export interface StorageDriver {
  getItem(key: string): StorageValue
  setItem(key: string, value: StorageValue): void
  removeItem(key: string): void
  clear(): void
}

export class Storage {
  private driver: StorageDriver

  constructor(driver: StorageDriver = new InMemoryStorageDriver()) {
    this.driver = driver
  }

  setDriver(driver: StorageDriver): void {
    this.driver = driver
  }

  getItem(key: string) {
    return this.driver.getItem(key)
  }

  setItem(key: string, value: StorageValue): void {
    this.driver.setItem(key, value)
  }

  removeItem(key: string): void {
    this.driver.removeItem(key)
  }

  clear(): void {
    this.driver.clear()
  }
}
