/**
 * @vitest-environment jsdom
 */

import { defaultStorageDriver } from "@/index.js"
import { describe, expect, it } from "vitest"

describe("storage driver factory in node", () => {
  it("instanciates in-memory storage driver", () => {
    expect(defaultStorageDriver().name).toBe("LocalStorageDriver")
  })
})
