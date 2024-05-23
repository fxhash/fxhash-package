import { EthereumWalletManager } from "@fxhash/eth"
import { TezosWalletManager } from "@fxhash/tez"
import { BlockchainType } from "@fxhash/shared"
import { generateChallenge, authenticate } from "../src/auth/index.js"

const SIGN_IN_MESSAGE = "Signed Message: sign in to fxhash.xyz"
const FXHASH_TERMS_OF_SERVICE =
  "Agree to terms: https://www.fxhash.xyz/doc/legal/terms.pdf"

describe("make sure that", async () => {
  const wm = await EthereumWalletManager.fromPrivateKey(
    "0x928a9ef9523357b2daf84785ddfc2bb25563b0105825e48fd70f525a135f825f"
  )
  it("invalid challenge id is not found", async () => {
    try {
      await authenticate({
        id: "afe7a262-4bef-4a15-8557-79b74e0fa99c",
        signature: "test",
      })
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
  it("invalid signature is not accepted", async () => {
    const { text, id } = await generateChallenge({
      chain: BlockchainType.ETHEREUM,
      address: wm.address,
    })
    try {
      await authenticate({
        id,
        signature: "test",
      })
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
})

describe("ETHEREUM: authentication user", async () => {
  let _id: string
  let _text: string

  const wm = await EthereumWalletManager.fromPrivateKey(
    "0x928a9ef9523357b2daf84785ddfc2bb25563b0105825e48fd70f525a135f825f"
  )

  it("generate challenge", async () => {
    const { text, id } = await generateChallenge({
      chain: BlockchainType.ETHEREUM,
      address: wm.address,
    })
    expect(text).toBeDefined()
    expect(id).toBeDefined()
    _id = id
    _text = text
  })
  it("valid signature is valid", async () => {
    const sig = await wm.signMessage(_text)
    if (sig.isFailure()) {
      return
    }
    const { accessToken, refreshToken } = await authenticate({
      id: _id,
      signature: sig.value.signature,
    })
    expect(accessToken).toBeDefined()
    expect(refreshToken).toBeDefined()
  })
})
describe("TEZOS: authentication user", async () => {
  let _id: string
  let _text: string

  const wm = await TezosWalletManager.fromPrivateKey(
    "edskRdPsQQjdB6ejSiHQXRffUdLm5E3UqjeKe9z8hkcBTzcEouR8Fsc7wgKTua7cp2es19WaFX5tt8AjjjsCeiADwQoRj6RBoD"
  )

  it("generate challenge", async () => {
    const { text, id } = await generateChallenge({
      chain: BlockchainType.TEZOS,
      address: wm.address,
    })
    expect(text).toBeDefined()
    expect(id).toBeDefined()
    _id = id
    _text = text
  })
  it("valid signature is valid", async () => {
    let message = `Tezos (${wm.address})`
    const sig = await wm.signMessage(_text)
    if (sig.isFailure()) {
      return
    }
    const res = await authenticate({
      id: _id,
      signature: sig.value.signature,
      publicKey: await wm.getPublicKey(),
    })
  })
})
