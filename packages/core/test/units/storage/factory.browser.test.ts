/**
 * @vitest-environment jsdom
 */

import { defaultStorageDriver } from "@/index.js"

describe("storage driver factory in node", () => {
  it("instanciates in-memory storage driver", () => {
    expect(defaultStorageDriver().name).toBe("LocalStorageDriver")
  })
})
