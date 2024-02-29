import {
  mockTransactionHash,
  mockEthereumTransactionHash,
  isEthereumTransactionHashValid,
  isTezosTransactionHashValid,
  mockTezosTransactionHash,
  getBlockchainFromTransactionHash,
  isBaseTransactionHashValid,
  mockBaseTransactionHash,
  isTransactionHashValid,
} from "../src/hash"

const ETH_HASH =
  "0x0e7071c59df3b9454d1d18a15270aa36d54f89606a576dc621757afd44ad1d2e"

const BASE_HASH = ETH_HASH

const TEZ_HASH = "ooVXGhMgdEESnHz3Rn2XMe72TWadBgjpkBZyDssQfUS6fzXo9v6"

describe("hash tests", () => {
  it("validate eth hash", async () => {
    expect(isEthereumTransactionHashValid(ETH_HASH)).toEqual(true)
    expect(getBlockchainFromTransactionHash(ETH_HASH)).toEqual("ETHEREUM")
  })
  it("validate eth hash mock", async () => {
    const mock = mockEthereumTransactionHash()
    expect(isEthereumTransactionHashValid(mock)).toEqual(true)
    expect(getBlockchainFromTransactionHash(mock)).toEqual("ETHEREUM")
    const mock2 = mockTransactionHash("ETHEREUM")
    expect(isBaseTransactionHashValid(mock2)).toEqual(true)
    expect(getBlockchainFromTransactionHash(mock2)).toEqual("ETHEREUM")
  })
  it("validate base hash", async () => {
    expect(isBaseTransactionHashValid(BASE_HASH)).toEqual(true)
    expect(getBlockchainFromTransactionHash(BASE_HASH)).toEqual("ETHEREUM")
  })
  it("validate base hash mock", async () => {
    const mock = mockBaseTransactionHash()
    expect(isBaseTransactionHashValid(mock)).toEqual(true)
    expect(getBlockchainFromTransactionHash(mock)).toEqual("ETHEREUM")
    const mock2 = mockTransactionHash("BASE")
    expect(isBaseTransactionHashValid(mock2)).toEqual(true)
    expect(getBlockchainFromTransactionHash(mock2)).toEqual("ETHEREUM")
  })
  it("validate tez hash", async () => {
    expect(isTezosTransactionHashValid(TEZ_HASH)).toEqual(true)
    expect(getBlockchainFromTransactionHash(TEZ_HASH)).toEqual("TEZOS")
  })
  it("validate tez hash mock", async () => {
    const mock = mockTezosTransactionHash()
    expect(isTezosTransactionHashValid(mock)).toEqual(true)
    expect(getBlockchainFromTransactionHash(mock)).toEqual("TEZOS")
    const mock2 = mockTransactionHash("TEZOS")
    expect(isTezosTransactionHashValid(mock2)).toEqual(true)
    expect(getBlockchainFromTransactionHash(mock2)).toEqual("TEZOS")
  })
  it("validate blockchain transaction hashes", async () => {
    const tezMock = mockTezosTransactionHash()
    const ethMock = mockEthereumTransactionHash()
    const baseMock = mockBaseTransactionHash()
    expect(isTransactionHashValid(tezMock)).toEqual(true)
    expect(isTransactionHashValid(ethMock)).toEqual(true)
    expect(isTransactionHashValid(baseMock)).toEqual(true)
    expect(isTransactionHashValid("xxxyyy123")).toEqual(false)
  })
})
