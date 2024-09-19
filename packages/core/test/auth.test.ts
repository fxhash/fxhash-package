import { localConfig } from "@fxhash/config"
import { BlockchainNetwork } from "@fxhash/shared"
import { vi } from "vitest"
import {
  GraphqlWrapper,
  authWallets,
  evmPrivateKeyWallet,
  inMemoryStorageDriver,
  jwtCredentials,
} from "@/index.js"
import { multichainWallets } from "@/user-source/wallets/common/multichain.js"

describe("EVM: private key wallets", async () => {
  const gql = new GraphqlWrapper({
    url: localConfig.apis.hasuraGql,
  })

  const accountSourceOptions = {
    gqlWrapper: gql,
    storage: inMemoryStorageDriver(),
    credentialsDriver: jwtCredentials(gql),
  }

  const privateKey =
    "0x928a9ef9523357b2daf84785ddfc2bb25563b0105825e48fd70f525a135f825f"

  const evmWallet = evmPrivateKeyWallet({ privateKey })

  const privateKeyWallet = multichainWallets({
    [BlockchainNetwork.ETHEREUM]: evmWallet,
  })

  const source = authWallets({
    wallets: privateKeyWallet,
    ...accountSourceOptions,
  })

  it("can retrieve wallet manager", async () => {
    expect(source.getWallets()).toBeDefined()
  })

  it("will be authenticated after init", async () => {
    await source.init()
    expect(source.authenticated()).toBe(true)
  })

  it("cannot logout private key wallet", async () => {
    await source.logoutAccount()
    expect(source.authenticated()).toBe(false)
  })

  it("can re authenticate", async () => {
    await evmWallet.updatePrivateKey(BlockchainNetwork.ETHEREUM, privateKey)
    await vi.waitUntil(() => source.authenticated())
    expect(source.authenticated()).toBe(true)
  })
  /*
  const ewm = await EthereumWalletManager.fromPrivateKey(
    "0x928a9ef9523357b2daf84785ddfc2bb25563b0105825e48fd70f525a135f825f"
  )

  /** Use this for testing against localhost
   * const fxhashClient = new FxhashClient({
   *  gqlClient: createGqlClient({ url: localConfig.apis.hasuraGql }),
   * })
   *

  const fxhashClient = new FxhashClient({
    gqlClient: createGqlClient({ url: localConfig.apis.hasuraGql }),
  })

  it("generate challenge for ETHEREUM", async () => {
    const { text, id } = await fxhashClient.generateChallenge(
      BlockchainType.ETHEREUM,
      ewm.address
    )
    expect(text).toBeDefined()
    expect(id).toBeDefined()
    _id = id
    _text = text
  })

  it("invalid challenge id is not found", async () => {
    try {
      await fxhashClient.authenticate(
        "afe7a262-4bef-4a15-8557-79b74e0fa99c",
        "test"
      )
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
  it("invalid signature is not valid", async () => {
    try {
      await fxhashClient.authenticate(_id, "test")
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
  it("Login with valid signature ETHEREUM", async () => {
    const sig = await ewm.signMessage(_text)
    if (sig.isFailure()) {
      return
    }
    const { accessToken, refreshToken } = await fxhashClient.authenticate(
      _id,
      sig.value.signature
    )
    expect(accessToken).toBeDefined()
    expect(refreshToken).toBeDefined()
  })

  const twm = await TezosWalletManager.fromPrivateKey(
    "edskRdPsQQjdB6ejSiHQXRffUdLm5E3UqjeKe9z8hkcBTzcEouR8Fsc7wgKTua7cp2es19WaFX5tt8AjjjsCeiADwQoRj6RBoD"
  )

  it("generate another challenge for TEZOS", async () => {
    const { text, id } = await fxhashClient.generateChallenge(
      BlockchainType.TEZOS,
      twm.address
    )
    expect(text).toBeDefined()
    expect(id).toBeDefined()
    _id = id
    _text = text
  })

  it("Login with valid signature TEZOS", async () => {
    const sig = await twm.signMessage(_text)
    if (sig.isFailure()) {
      return
    }
    const publicKey = await twm.getPublicKey()
    const { accessToken, refreshToken } = await fxhashClient.authenticate(
      _id,
      sig.value.signature,
      publicKey
    )
    expect(accessToken).toBeDefined()
    expect(refreshToken).toBeDefined()
  })
  */
})
