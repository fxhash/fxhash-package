/**
 * @vitest-environment node
 */

import { defaultStorageDriver } from "@/index.js"
import { describe, expect, it } from "vitest"

describe("storage driver factory in node", () => {
  it("instanciates in-memory storage driver", () => {
    const driver = defaultStorageDriver()
    expect(driver.name).toBe("InMemoryStorageDriver")
  })
})
