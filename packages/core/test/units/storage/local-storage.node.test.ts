/**
 * @vitest-environment node
 */

import { localStorageDriver } from "@/index.js"
import { describe, expect, it } from "vitest"

describe("localStorageDriver in node context", () => {
  it("cannot be instanciated", () => {
    expect(() => localStorageDriver()).toThrow("localStorage API is undefined")
  })
})
