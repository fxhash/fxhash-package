import { HashMap } from ".."

/**
 * MappedArray provides an abstraction over a regular array by maintaining a
 * collection of predefined HashMaps alongside the array. This class is designed
 * such that modifications to the array data source can only be done through
 * public accessors which carry mutations to the HashMaps. As the array is
 * altered, so are the various HashMaps.
 *
 * @example
 *
 * ```ts
 * const values = [
 *   { id1: "one", id2: "0xab0b" },
 *   { id1: "two", id2: "0x3f1a" },
 * ]
 *
 * const arrayMapped = new MappedArray(
 *   // define as many maps with different keys as needed
 *   {
 *     id1: {
 *       getKey: (value) => value.id1},
 *       multi: false,
 *     },
 *     id2: {
 *       getKey: (value) => value.id2},
 *       multi: false,
 *     },
 *   },
 *   values
 * )
 *
 * arrayMapped.maps.id1.get("one") // returns { id1: "one", id2: "0xab0b" }
 *
 * arrayMapped.push({ id1: "three", id2: "0x0201" })
 * arrayMapped.maps.id2.get("0x0201") // returns { id1: "three", id2: "0x0201" }
 * ```
 */
export class MappedArray<
  T,
  SingleMapKeys extends string | void,
  MultiMapKeys extends string | void = void,
> {
  private _maps: {} & ([SingleMapKeys] extends [string]
    ? {
        [K in SingleMapKeys]: HashMap<T, false>
      }
    : {}) &
    ([MultiMapKeys] extends [string]
      ? {
          [K in MultiMapKeys]: HashMap<T, true>
        }
      : {})
  private _values: T[]

  constructor(
    keyMap: {} & ([SingleMapKeys] extends [string]
      ? {
          [K in SingleMapKeys]: {
            getKey: (value: T) => string
            multi: false
          }
        }
      : {}) &
      ([MultiMapKeys] extends [string]
        ? {
            [K in MultiMapKeys]: {
              getKey: (value: T) => string
              multi: true
            }
          }
        : {}),
    values: T[] = []
  ) {
    this._maps = Object.fromEntries(
      Object.entries(keyMap).map(([key, def]) => [
        key,
        new HashMap({
          getKey: (def as any).getKey,
          multi: (def as any).multi,
          values,
        }),
      ])
    ) as any

    this._values = values ? [...values] : []
  }

  private forEachMap(cb: (map: HashMap<T, any>) => void) {
    for (const key in this._maps) {
      cb(this._maps[key] as any)
    }
  }

  /**
   * A read-only js array of values currently stored.
   */
  public get values(): Readonly<T[]> {
    return this._values
  }

  /**
   * Accessor to the record of hashmaps with strict typing to avoid mutating the
   * hashmap by accident, as it could de-synchronize the maps with the array of
   * source data.
   */
  public get maps(): {} & ([SingleMapKeys] extends [string]
    ? {
        [K in SingleMapKeys]: Pick<HashMap<T, false>, "get" | "has">
      }
    : {}) &
    ([MultiMapKeys] extends [string]
      ? {
          [K in MultiMapKeys]: Pick<HashMap<T, true>, "get" | "has">
        }
      : {}) {
    return this._maps
  }

  /**
   * Push a value to the array. Also puts the value in all the HashMaps.
   * @param value
   */
  public push(value: T): void {
    this._values.push(value)
    this.forEachMap(map => map.put(value))
  }

  /**
   * A wrapper arround the classic `array.splice()` method, carrying changes
   * made to the array to the hashmaps.
   */
  public splice(start: number, deleteCount?: number | undefined): T[]
  public splice(start: number, deleteCount: number, ...items: T[]): T[]
  public splice(start: number, deleteCount?: number, ...items: T[]): T[] {
    for (const item of items) {
      this.forEachMap(map => map.put(item))
    }
    const deleted =
      typeof deleteCount === "undefined"
        ? this._values.splice(start)
        : this._values.splice(start, deleteCount, ...items)
    for (const item of deleted) {
      this.forEachMap(map => map.deleteValue(item))
    }
    return deleted
  }

  /**
   * Resets the array. Also resets the hashmaps.
   * @param values New values to copy into this array mapped.
   */
  public reset(values: T[] = []): void {
    this._values = [...values]
    this.forEachMap(map => map.reset(this._values))
  }
}
