import { TezosToolkit } from "@taquito/taquito"
import { InMemorySigner } from "@taquito/signer"
import { config } from "@fxhash/config"
import { TezosWalletManager } from "../src/services/Wallet"
// get rpc nodes
const rpcNodes = config.tez.apis.rpcs
// init tezostoolkit
const tezosToolkit = new TezosToolkit(rpcNodes[0])
describe("TezosWalletManager", async () => {
  // init signer from private key
  const wallet = await InMemorySigner.fromSecretKey(
    "spsk29SxqYRjnreqGzsYiAUEqxyhDwD8j2J57pJjaGgGtReZVD2UiD"
  )
  // get public key hash
  const pkh = await wallet.publicKeyHash()
  // set provider
  tezosToolkit.setProvider({ signer: wallet })
  // init walletmanger
  const walletManager = new TezosWalletManager({
    address: pkh,
    wallet,
    tezosToolkit,
  })

  it("yields public key", async () => {
    const publicKey = await walletManager.getPublicKey()
    expect(publicKey).not.toBeNull()
  })

  it("yields public key hash", async () => {
    const pkh = await walletManager.getPublicKeyHash()
    expect(pkh).not.toBeNull()
  })
})
