import { inMemoryStorageDriver } from "@/index.js"
import { expectValidStorageDriver } from "./common.js"
import { describe } from "vitest"

describe("InMemoryDriver", () => {
  expectValidStorageDriver(inMemoryStorageDriver())
})
