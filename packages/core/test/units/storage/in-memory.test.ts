import { inMemoryStorageDriver } from "@/index.js"
import { expectValidStorageDriver } from "./common.js"

describe("InMemoryDriver", () => {
  expectValidStorageDriver(inMemoryStorageDriver())
})
