import { describe, it, expect } from "vitest"
import {
  mockBlockchainAddress,
  mockEthereumAddress,
  isEthereumAddressValid,
  mockTezosAddress,
  isTezosAddressValid,
  getBlockchainFromAddress,
  isBaseAddressValid,
  mockBaseAddress,
  isBlockchainAddressValid,
} from "../src/address"

const ETH_ADDRESS = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
const BASE_ADDRESS = ETH_ADDRESS

const TEZ_ADDRESS = "tz1Lc2qBKEWCBeDU8npG6zCeCqpmaegRi6Jg"

describe("address tests", () => {
  it("validate eth address", async () => {
    expect(isEthereumAddressValid(ETH_ADDRESS)).toEqual(true)
    expect(getBlockchainFromAddress(ETH_ADDRESS)).toEqual("ETHEREUM")
  })
  it("validate eth address mock", async () => {
    const mock = mockEthereumAddress()
    expect(isEthereumAddressValid(mock)).toEqual(true)
    expect(getBlockchainFromAddress(mock)).toEqual("ETHEREUM")
    const mock2 = mockBlockchainAddress("ETHEREUM")
    expect(isEthereumAddressValid(mock2)).toEqual(true)
    expect(getBlockchainFromAddress(mock2)).toEqual("ETHEREUM")
  })
  it("validate base address", async () => {
    expect(isBaseAddressValid(BASE_ADDRESS)).toEqual(true)
    expect(getBlockchainFromAddress(BASE_ADDRESS)).toEqual("ETHEREUM")
  })
  it("validate base address mock", async () => {
    const mock = mockBaseAddress()
    expect(isEthereumAddressValid(mock)).toEqual(true)
    expect(getBlockchainFromAddress(mock)).toEqual("ETHEREUM")
    const mock2 = mockBlockchainAddress("BASE")
    expect(isEthereumAddressValid(mock2)).toEqual(true)
    expect(getBlockchainFromAddress(mock2)).toEqual("ETHEREUM")
  })
  it("validate tez address", async () => {
    expect(isTezosAddressValid(TEZ_ADDRESS)).toEqual(true)
    expect(getBlockchainFromAddress(TEZ_ADDRESS)).toEqual("TEZOS")
  })
  it("validate tez address mock", async () => {
    const mock = mockTezosAddress()
    expect(isTezosAddressValid(mock)).toEqual(true)
    expect(getBlockchainFromAddress(mock)).toEqual("TEZOS")
    const mock2 = mockBlockchainAddress("TEZOS")
    expect(isTezosAddressValid(mock2)).toEqual(true)
    expect(getBlockchainFromAddress(mock2)).toEqual("TEZOS")
  })
  it("validate blockchain addresses", async () => {
    const tezMock = mockTezosAddress()
    const ethMock = mockEthereumAddress()
    const baseMock = mockBaseAddress()
    expect(isBlockchainAddressValid(tezMock)).toEqual(true)
    expect(isBlockchainAddressValid(ethMock)).toEqual(true)
    expect(isBlockchainAddressValid(baseMock)).toEqual(true)
    expect(isBlockchainAddressValid("xxxyyy123")).toEqual(false)
  })
})
