import {
  mockEthereumAddress,
  isEthereumAddressValid,
  mockTezosAddress,
  isTezosAddressValid,
  getBlockchainFromAddress,
} from "../src/address"

const ETH_ADDRESS = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"

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
  })
  it("validate tez address", async () => {
    expect(isTezosAddressValid(TEZ_ADDRESS)).toEqual(true)
    expect(getBlockchainFromAddress(TEZ_ADDRESS)).toEqual("TEZOS")
  })
  it("validate tez address mock", async () => {
    const mock = mockTezosAddress()
    expect(isTezosAddressValid(mock)).toEqual(true)
    expect(getBlockchainFromAddress(mock)).toEqual("TEZOS")
  })
})
