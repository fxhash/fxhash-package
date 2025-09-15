import { IStorageDriver } from "@/index.js"
import { expect, it } from "vitest"

export function expectValidStorageDriverInterface(target: IStorageDriver) {
  expect(target).toBeTypeOf("object")
  expect(target.name).toBeTypeOf("string")
  expect(target.getItem).toBeTypeOf("function")
  expect(target.setItem).toBeTypeOf("function")
  expect(target.removeItem).toBeTypeOf("function")
}

export function expectValidStorageDriver(driver: IStorageDriver) {
  it("instanciates a valid IStorageDriver interface", () => {
    expectValidStorageDriverInterface(driver)
  })

  it("stores & retrieves values", async () => {
    const values = [
      "hello",
      ["cool", 2, "breakdance"],
      { object: "property", other: { object: "nested" } },
    ]
    for (let i = 0; i < values.length; i++) {
      const key = `key:${i}`
      await driver.setItem(key, values[i])
      expect(driver.getItem(key)).resolves.toEqual(values[i])
    }
  })

  it("returns null when value doesn't exist", () => {
    expect(driver.getItem("some-key")).resolves.toBe(null)
  })

  it("can clear values", async () => {
    await driver.setItem("key", "1")
    expect(driver.getItem("key")).resolves.toBe("1")
    await driver.removeItem("key")
    expect(driver.getItem("key")).resolves.toBeNull()
  })
}
