export type StorageValue = null | string | number | boolean | object

/**
 * GET/SET/DEL functions to store values.
 */
export interface IStorageDriver {
  /**
   * A name-identifier to facilitate runtime inspection.
   */
  name: string

  /**
   * Get the value associated with a given key.
   * @param key item key
   * @returns `null` if no value
   */
  getItem(key: string): Promise<StorageValue>

  /**
   * Set a value on a given key. If a value already existed, it is replaced.
   * @param key item key
   * @param value value to store
   */
  setItem(key: string, value: StorageValue): Promise<void>

  /**
   * Removes the value on a given key. If no key is stored, doesn't do anything.
   * @param key item key
   */
  removeItem(key: string): Promise<void>
}
