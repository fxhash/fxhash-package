import {
  mockEthereumTransactionHash,
  isEthereumTransactionHashValid,
  isTezosTransactionHashValid,
  mockTezosTransactionHash,
  getBlockchainFromTransactionHash,
} from "../src/hash"

const ETH_HASH =
  "0x0e7071c59df3b9454d1d18a15270aa36d54f89606a576dc621757afd44ad1d2e"

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
  })
  it("validate tez hash", async () => {
    expect(isTezosTransactionHashValid(TEZ_HASH)).toEqual(true)
    expect(getBlockchainFromTransactionHash(TEZ_HASH)).toEqual("TEZOS")
  })
  it("validate tez hash mock", async () => {
    const mock = mockTezosTransactionHash()
    expect(isTezosTransactionHashValid(mock)).toEqual(true)
    expect(getBlockchainFromTransactionHash(mock)).toEqual("TEZOS")
  })
})
