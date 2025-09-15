import { arrayRemove } from ".."

export class HashMap<
  T,
  Multi extends boolean,
  MapValue = Multi extends false ? T : T[],
> {
  private map: Map<string, MapValue> = new Map()
  private getKey: (value: T) => string

  public multi: Multi

  constructor(args: {
    getKey: (value: T) => string
    multi: Multi
    values?: T[]
  }) {
    const { getKey, multi, values } = args
    this.getKey = getKey
    this.multi = multi
    this.reset(values)
  }

  clear(): void {
    this.map.clear()
  }

  has(key: string): boolean {
    return this.map.has(key)
  }

  hasValue(value: T): boolean {
    const key = this.getKey(value)

    if (this.isMulti()) {
      const values = this.get(key)
      if (!values) return false
      return (values as T[]).includes(value)
    }

    if (this.isSingle()) {
      return this.has(key)
    }

    throw "unreachable"
  }

  put(value: T): void {
    const key = this.getKey(value)

    if (this.isMulti()) {
      if (!this.map.has(key)) {
        this.map.set(key, [])
      }
      ;(this.map.get(key) as T[]).push(value)
      return
    }

    if (this.isSingle()) {
      this.map.set(key, value)
      return
    }
  }

  get(key: string): MapValue | undefined {
    return this.map.get(key)
  }

  delete(key: string): boolean {
    return this.map.delete(key)
  }

  deleteValue(value: T): boolean {
    const key = this.getKey(value)
    if (this.isSingle()) {
      return this.delete(key)
    }
    if (this.isMulti()) {
      const values = this.get(key) as T[] | undefined
      if (values) {
        arrayRemove(values, value)
        return true
      }
      return false
    }
    throw "unreachable"
  }

  reset(values: T[] = []): void {
    if (this.isMulti()) {
      this.map = new Map()
      for (const value of values) {
        this.put(value)
      }
      return
    }

    if (this.isSingle()) {
      this.map = new Map(
        values.map(value => [this.getKey(value), value])
      ) as any
      return
    }

    throw "unreachable"
  }

  private isMulti(): this is HashMap<T, true> {
    return this.multi
  }

  private isSingle(): this is HashMap<T, false> {
    return !this.multi
  }
}
