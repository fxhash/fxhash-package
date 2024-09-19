import { walletSource } from "@/user-source/wallets/common/source.js"
import { expectValidWalletSourceInterface } from "./common.js"
import { BlockchainNetwork, WalletManager } from "@fxhash/shared"
import { TezosWalletManager } from "@fxhash/tez"
import { WALLETS } from "../../../mock/constants.js"
import { success } from "@fxhash/utils"
import { MapNetworkToWalletManager, WalletsMap } from "@/index.js"
import { EthereumWalletManager } from "@fxhash/eth"
import {
  anyActiveManager,
  deriveManagersMap,
  walletsNetworks,
} from "@/user-source/wallets/common/utils.js"

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

describe("wallet source utilities", async () => {
  const mockWalletManagers = {
    [BlockchainNetwork.TEZOS]: await TezosWalletManager.fromPrivateKey(
      WALLETS.TEZ.sk
    ),
    [BlockchainNetwork.ETHEREUM]: await EthereumWalletManager.fromPrivateKey(
      WALLETS.ETH.sk
    ),
  }

  function newTezWalletSource() {
    return newWalletSource({
      network: BlockchainNetwork.TEZOS,
      walletManager: mockWalletManagers[BlockchainNetwork.TEZOS],
    })
  }

  function newEthWalletSource() {
    return newWalletSource({
      network: BlockchainNetwork.ETHEREUM,
      walletManager: mockWalletManagers[BlockchainNetwork.ETHEREUM],
    })
  }

  test("walletNetworks implementation", () => {
    const ethWalletNetworks = walletsNetworks({
      [BlockchainNetwork.ETHEREUM]: newEthWalletSource().source,
    })
    const tezWalletNetworks = walletsNetworks({
      [BlockchainNetwork.TEZOS]: newTezWalletSource().source,
    })
    const multiWalletsNetworks = walletsNetworks({
      [BlockchainNetwork.ETHEREUM]: newEthWalletSource().source,
      [BlockchainNetwork.TEZOS]: newTezWalletSource().source,
    })
    expect(tezWalletNetworks.networks).toEqual([BlockchainNetwork.TEZOS])
    expect(ethWalletNetworks.networks).toEqual([BlockchainNetwork.ETHEREUM])
    expect(multiWalletsNetworks.networks).toEqual([
      BlockchainNetwork.ETHEREUM,
      BlockchainNetwork.TEZOS,
    ])
    expect(tezWalletNetworks.supports(BlockchainNetwork.TEZOS)).toBe(true)
    expect(tezWalletNetworks.supports(BlockchainNetwork.ETHEREUM)).toBe(false)
    expect(ethWalletNetworks.supports(BlockchainNetwork.TEZOS)).toBe(false)
    expect(ethWalletNetworks.supports(BlockchainNetwork.ETHEREUM)).toBe(true)
    expect(multiWalletsNetworks.supports(BlockchainNetwork.TEZOS)).toBe(true)
    expect(multiWalletsNetworks.supports(BlockchainNetwork.ETHEREUM)).toBe(true)
  })

  test("deriveManagersMap implementation", async () => {
    const ethSource = newEthWalletSource().source
    const tezSource = newTezWalletSource().source

    const ethWalletsMap: WalletsMap = {
      [BlockchainNetwork.ETHEREUM]: {
        connected: {
          info: {
            address: "" as any,
          },
          manager: mockWalletManagers.ETHEREUM,
        },
        source: ethSource,
      },
    }
    const tezWalletsMap: WalletsMap = {
      [BlockchainNetwork.TEZOS]: {
        connected: {
          info: {
            address: "" as any,
          },
          manager: mockWalletManagers.TEZOS,
        },
        source: tezSource,
      },
    }
    const multiWalletsMap: WalletsMap = {
      ...ethWalletsMap,
      ...tezWalletsMap,
    }

    expect(deriveManagersMap(ethWalletsMap)).toEqual({
      [BlockchainNetwork.ETHEREUM]:
        mockWalletManagers[BlockchainNetwork.ETHEREUM],
    })
    expect(deriveManagersMap(tezWalletsMap)).toEqual({
      [BlockchainNetwork.TEZOS]: mockWalletManagers[BlockchainNetwork.TEZOS],
    })
    expect(deriveManagersMap(multiWalletsMap)).toEqual({
      [BlockchainNetwork.ETHEREUM]:
        mockWalletManagers[BlockchainNetwork.ETHEREUM],
      [BlockchainNetwork.TEZOS]: mockWalletManagers[BlockchainNetwork.TEZOS],
    })
  })

  test("anyActiveManager implementation", async () => {
    const ethSource = newEthWalletSource().source
    const tezSource = newTezWalletSource().source

    const ethWalletsMap: WalletsMap = {
      [BlockchainNetwork.ETHEREUM]: {
        connected: {
          info: {
            address: "" as any,
          },
          manager: mockWalletManagers.ETHEREUM,
        },
        source: ethSource,
      },
    }
    const tezWalletsMap: WalletsMap = {
      [BlockchainNetwork.TEZOS]: {
        connected: {
          info: {
            address: "" as any,
          },
          manager: mockWalletManagers.TEZOS,
        },
        source: tezSource,
      },
    }

    expect(anyActiveManager({ ...ethWalletsMap })).toEqual(
      mockWalletManagers.ETHEREUM
    )
    expect(anyActiveManager({ ...tezWalletsMap })).toEqual(
      mockWalletManagers.TEZOS
    )
    expect(anyActiveManager({})).toBe(null)
    expect(
      anyActiveManager({
        [BlockchainNetwork.TEZOS]: {
          connected: null,
          source: tezSource,
        },
      })
    ).toBe(null)
    expect(anyActiveManager("" as any)).toBe(null)
  })
})
