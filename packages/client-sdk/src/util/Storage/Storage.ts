import { InMemoryStorageDriver } from "./InMemoryDriver.js"
import { LocalStorageDriver } from "./LocalStorageDriver.js"

export type StorageValue = null | string | number | boolean | object

export interface StorageDriver {
  getItem(key: string): Promise<StorageValue>
  setItem(key: string, value: StorageValue): Promise<void>
  removeItem(key: string): Promise<void>
}

// if localStorage is available, use driver, otherwise use InMemory
const newDefaultStorageDriver = () =>
  typeof window !== undefined && window?.localStorage
    ? new LocalStorageDriver()
    : new InMemoryStorageDriver()

export class Storage {
  private driver: StorageDriver

  constructor(driver: StorageDriver = newDefaultStorageDriver()) {
    this.driver = driver
  }

  setDriver(driver: StorageDriver): void {
    this.driver = driver
  }

  async getItem(key: string): Promise<StorageValue> {
    return this.driver.getItem(key)
  }

  async setItem(key: string, value: StorageValue): Promise<void> {
    this.driver.setItem(key, value)
  }

  async removeItem(key: string): Promise<void> {
    this.driver.removeItem(key)
  }
}
