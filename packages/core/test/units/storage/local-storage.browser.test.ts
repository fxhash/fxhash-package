/**
 * @vitest-environment jsdom
 */

import { localStorageDriver } from "@/index.js"
import { expectValidStorageDriver } from "./common.js"
import { beforeEach, describe, expect, it } from "vitest"

beforeEach(() => {
  localStorage.clear()
})

describe("localStorageDriver in browser context", () => {
  expectValidStorageDriver(localStorageDriver())

  it("supports custom prefixes", async () => {
    const driver1 = localStorageDriver("prefix1")
    const driver2 = localStorageDriver("prefix2")
    await driver1.setItem("key", "1")
    await driver2.setItem("key", "2")
    expect(driver1.getItem("key")).resolves.toBe("1")
    expect(driver2.getItem("key")).resolves.toBe("2")
  })
})
