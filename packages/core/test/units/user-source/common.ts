import { IUserSource, UserSourceEventEmitter } from "@/index.js"
import { expect } from "vitest"

export function expectValidUserSourceInterface(target: IUserSource) {
  expect(target).toBeTypeOf("object")
  expect(target.emitter).toBeInstanceOf(UserSourceEventEmitter)

  const functions: (keyof IUserSource)[] = [
    "init",
    "initialized",
    "getAccount",
    "logoutAccount",
    "getWallets",
    "getWallet",
    "disconnectWallet",
    "disconnectAllWallets",
  ]
  for (const fn of functions) {
    expect(target[fn]).toBeTypeOf("function")
  }
}
