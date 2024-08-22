import { walletSource } from "@/user-source/wallets/common/source.js"
import { expectValidWalletSourceInterface } from "./common.js"
import { BlockchainNetwork, WalletManager } from "@fxhash/shared"
import { TezosWalletManager } from "@fxhash/tez"
import { WALLETS } from "../../../mock/constants.js"
import { success } from "@fxhash/utils"
import { MapNetworkToWalletManager } from "@/index.js"

function newWalletSource<Net extends BlockchainNetwork>({
  network,
  walletManager,
}: {
  network: BlockchainNetwork
  walletManager: MapNetworkToWalletManager<Net>
}) {
  return walletSource({
    network: network,
    init: async () => {},
    disconnect: async () => {},
    createManager: async () => {
      return success(walletManager)
    },
    requirements: () => ({
      userInput: true,
    }),
  })
}

describe("walletSource", async () => {
  const mockWalletManagers = {
    [BlockchainNetwork.TEZOS]: await TezosWalletManager.fromPrivateKey(
      WALLETS.TEZ.sk
    ),
  }

  function newTezWalletSource() {
    return newWalletSource({
      network: BlockchainNetwork.TEZOS,
      walletManager: mockWalletManagers[BlockchainNetwork.TEZOS],
    })
  }

  it("implements IWalletsSource interface", () => {
    expectValidWalletSourceInterface(newTezWalletSource().source)
  })

  test("supports interface", () => {
    const source = newTezWalletSource().source
    expect(source.supports(BlockchainNetwork.TEZOS)).toBe(true)
    expect(source.supports(BlockchainNetwork.ETHEREUM)).toBe(false)
  })

  it("throws when wrong network is requested", () => {
    expect(() =>
      newTezWalletSource().source.getWallet(BlockchainNetwork.ETHEREUM)
    ).toThrow("invalid network")
  })

  it("returns proper initial values", () => {
    const source = newTezWalletSource().source
    expect(source.initialized()).toBe(false)
    expect(source.getWallet(BlockchainNetwork.TEZOS)).toEqual({
      connected: null,
      source,
    })
    expect(source.getWallets()).toEqual({
      [BlockchainNetwork.TEZOS]: {
        connected: null,
        source,
      },
    })
  })

  it("respects void initialization flow", async () => {
    const source = newTezWalletSource().source
    expect(source.initialized()).toBe(false)
    await source.init()
    expect(source.initialized()).toBe(true)
  })

  it("updates connected wallet and creates wallet manager properly", async () => {
    const source = walletSource({
      network: BlockchainNetwork.TEZOS,
      init: async () => {},
      disconnect,
      createManager: async () => {
        return success(mockWalletManagers[BlockchainNetwork.TEZOS])
      },
      requirements: () => ({
        userInput: true,
      }), // doesn't matter
    })
    await source.source.init()

    // disconnect functions are supposed, through side-effects, to eventually
    // update with null (usually using onChange listeners on wallets)
    async function disconnect() {
      source.utils.update(null)
    }

    const updateInfo = {
      address: mockWalletManagers[BlockchainNetwork.TEZOS].address,
    }

    function updateAndResolveEmitted() {
      return new Promise(res => {
        source.source.emitter.on("wallets-changed", res)
        source.utils.update(updateInfo)
      })
    }

    const emitted = await updateAndResolveEmitted()
    expect(emitted).toEqual([
      {
        network: BlockchainNetwork.TEZOS,
        wallet: {
          connected: {
            manager: mockWalletManagers[BlockchainNetwork.TEZOS],
            info: updateInfo,
          },
          source: source.source,
        },
      },
    ])
    expect(source.source.getWallet(BlockchainNetwork.TEZOS)).toEqual({
      connected: {
        manager: mockWalletManagers[BlockchainNetwork.TEZOS],
        info: updateInfo,
      },
      source: source.source,
    })
    expect(source.source.getWallets()).toEqual({
      [BlockchainNetwork.TEZOS]: {
        connected: {
          manager: mockWalletManagers[BlockchainNetwork.TEZOS],
          info: updateInfo,
        },
        source: source.source,
      },
    })

    function disconnectAndResolveEmitted() {
      return new Promise(res => {
        source.source.emitter.on("wallets-changed", res)
        source.source.disconnectAllWallets()
      })
    }

    const emitted2 = await disconnectAndResolveEmitted()
    expect(emitted2).toEqual([
      {
        network: BlockchainNetwork.TEZOS,
        wallet: {
          connected: null,
          source: source.source,
        },
      },
    ])
  })
})
