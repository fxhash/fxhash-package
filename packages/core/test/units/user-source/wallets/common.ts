import { IWalletsSource } from "@/index.js"
import { expectValidUserSourceInterface } from "../common.js"

export function expectValidWalletSourceInterface(target: IWalletsSource) {
  expectValidUserSourceInterface(target)
  expect(target.getAccount()).toBe(null)
  expect(target.supports).toBeTypeOf("function")
  expect(target.requirements).toBeTypeOf("function")
}
