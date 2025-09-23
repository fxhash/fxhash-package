import { isEthereumWalletManager, isTezosWalletManager } from "@/index.js"
import { EthereumWalletManager } from "@fxhash/eth"
import { TezosWalletManager } from "@fxhash/tez"
import { WALLETS } from "../../mock/constants.js"
import { describe, expect, it } from "vitest"

describe("wallet manager instance type test", () => {
  it("should return true if instance of TezosWalletManager", async () => {
    expect(
      isTezosWalletManager(
        await TezosWalletManager.fromPrivateKey(WALLETS.TEZ.sk)
      )
    ).toBe(true)
  })
  it("should return true if instance of EthereumWalletManager", async () => {
    expect(
      isEthereumWalletManager(
        await EthereumWalletManager.fromPrivateKey(WALLETS.ETH.sk)
      )
    ).toBe(true)
  })
})
