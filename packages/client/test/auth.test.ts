import { EthereumWalletManager } from "@fxhash/eth"
import { TezosWalletManager } from "@fxhash/tez"
import { BlockchainType } from "@fxhash/shared"
import { generateChallenge, authenticate } from "../src/auth/index.js"

describe("authentication tezos user", async () => {
  let _id: string
  let _text: string

  const walletManager = await TezosWalletManager.fromPrivateKey(
    "edskRdPsQQjdB6ejSiHQXRffUdLm5E3UqjeKe9z8hkcBTzcEouR8Fsc7wgKTua7cp2es19WaFX5tt8AjjjsCeiADwQoRj6RBoD"
  )

  it("generate challenge", async () => {
    const { text, id } = await generateChallenge({
      chain: BlockchainType.TEZOS,
      address: walletManager.address,
    })
    expect(text).toBeDefined()
    expect(id).toBeDefined()
    _id = id
    _text = text
  })
  it("invalid challenge is not found", async () => {
    try {
      await authenticate({
        id: "afe7a262-4bef-4a15-8557-79b74e0fa99c",
        signature: "test",
      })
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
  it("invalid signature is not valid", async () => {
    try {
      await authenticate({
        id: _id,
        signature: "test",
      })
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
  it("valid signature is valid", async () => {
    const sig = await walletManager.signMessage(_text)
    if (sig.isFailure()) {
      return
    }
    const res = await authenticate({
      id: _id,
      signature: sig.value.signature,
    })
    console.log("res", res)
  })
})

describe("authentication ethereum user", async () => {
  let _id: string
  let _text: string

  const walletManager = await EthereumWalletManager.fromPrivateKey(
    "0x928a9ef9523357b2daf84785ddfc2bb25563b0105825e48fd70f525a135f825f"
  )

  it("generate challenge", async () => {
    const { text, id } = await generateChallenge({
      chain: BlockchainType.ETHEREUM,
      address: walletManager.address,
    })
    expect(text).toBeDefined()
    expect(id).toBeDefined()
    _id = id
    _text = text
  })
  it("invalid challenge is not found", async () => {
    try {
      await authenticate({
        id: "afe7a262-4bef-4a15-8557-79b74e0fa99c",
        signature: "test",
      })
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
  it("invalid signature is not valid", async () => {
    try {
      await authenticate({
        id: _id,
        signature: "test",
      })
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
  it("valid signature is valid", async () => {
    const sig = await walletManager.signMessage(_text)
    if (sig.isFailure()) {
      return
    }
    console.log(sig.value.signature)
    const res = await authenticate({
      id: _id,
      signature: sig.value.signature,
    })
    console.log("res", res)
  })
})
