import { EthereumWalletManager } from "@fxhash/eth"
import { TezosWalletManager } from "@fxhash/tez"
import { BlockchainType } from "@fxhash/shared"
import { localConfig } from "@fxhash/config"
import { createGqlClient } from "@fxhash/gql-client"
import { generateChallenge, authenticate } from "@/index.js"
import {
  CHALLENGE_ID,
  INVALID_CHALLENGE_ID,
  INVALID_SIGNATURE,
} from "./mock/constants.js"

const gqlClient = createGqlClient({ url: localConfig.apis.hasuraGql })

test("invalid challenge id is not found", async () => {
  try {
    await authenticate(
      {
        id: INVALID_CHALLENGE_ID,
        signature: "",
      },
      { gqlClient }
    )
  } catch (e) {
    expect(e).toBeDefined()
  }
})

test("invalid signature is not accepted", async () => {
  try {
    await authenticate(
      {
        id: CHALLENGE_ID,
        signature: INVALID_SIGNATURE,
      },
      { gqlClient }
    )
  } catch (e) {
    expect(e).toBeDefined()
  }
})

describe("ETHEREUM: authentication user", async () => {
  let _id: string
  let _text: string

  const wm = await EthereumWalletManager.fromPrivateKey(
    "0x928a9ef9523357b2daf84785ddfc2bb25563b0105825e48fd70f525a135f825f"
  )

  it("generate challenge", async () => {
    const { text, id } = await generateChallenge(
      {
        chain: BlockchainType.ETHEREUM,
        address: wm.address,
      },
      { gqlClient }
    )
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
    const { accessToken, refreshToken } = await authenticate(
      {
        id: _id,
        signature: sig.value.signature,
      },
      { gqlClient }
    )
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
    const { text, id } = await generateChallenge(
      {
        chain: BlockchainType.TEZOS,
        address: wm.address,
      },
      { gqlClient }
    )
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
    const { accessToken, refreshToken } = await authenticate(
      {
        id: _id,
        signature: sig.value.signature,
        publicKey: await wm.getPublicKey(),
      },
      { gqlClient }
    )
    expect(accessToken).toBeDefined()
    expect(refreshToken).toBeDefined()
  })
})
