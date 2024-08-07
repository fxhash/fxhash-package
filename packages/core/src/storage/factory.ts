import { IStorageDriver } from "./_interfaces.js"
import { inMemoryStorageDriver } from "./in-memory.js"
import { localStorageDriver } from "./local-storage.js"

/**
 * Factory function which returns a Storage Driver instanciator based on the
 * environment in which the code is executed. Depending on the availability of
 * certain APIs, this module will return the most adequate storage driver
 * between those currently implemented.
 */
export function defaultStorageDriver(): IStorageDriver {
  return typeof window !== undefined && window?.localStorage
    ? localStorageDriver()
    : inMemoryStorageDriver()
}
