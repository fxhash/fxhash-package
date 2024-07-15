import { BlockchainNetwork, invariant } from "@fxhash/shared"
import {
  IEvmWallet,
  ITezosWallet,
  IWalletsSource,
  MapNetworkToWalletInterface,
} from "./_interfaces.js"
import { EthereumWalletManager, clientToSigner } from "@fxhash/eth"
import { config as fxConfig } from "@fxhash/config"
import { TezosWalletManager } from "@fxhash/tez"
import { WalletManagersMap, UserSourceEventEmitter } from "../_interfaces.js"
import { intialization } from "@fxhash/utils"

/**
 * Given an EVM wallet interface, returns an Ethereum Wallet Manager instance
 * ready to rock.
 */
export async function createEvmWalletManager(evmWallet: IEvmWallet) {
  invariant(evmWallet, "should not be null")
  const info = evmWallet.getInfo()
  if (!info) return null
  const _clients = await evmWallet.getClients()
  if (_clients.isSuccess()) {
    const clients = _clients.unwrap()
    return new EthereumWalletManager({
      walletClient: clients.wallet,
      publicClient: clients.public,
      rpcNodes: fxConfig.eth.apis.rpcs,
      address: info.address,
      signer: clientToSigner(clients.wallet),
    })
  } else {
    throw _clients.error
  }
}

/**
 * Given a tezos wallet interface, returns a Tezos Wallet Manager instance
 * ready to rock.
 */
export async function createTezosWalletManager(tezWallet: ITezosWallet) {
  invariant(tezWallet, "should not be null")
  const info = tezWallet.getInfo()
  return info
    ? new TezosWalletManager({
        wallet: tezWallet.getWallet(),
        address: info.address,
      })
    : null
}

const createWalletManagerMap = {
  [BlockchainNetwork.ETHEREUM]: createEvmWalletManager,
  [BlockchainNetwork.TEZOS]: createTezosWalletManager,
}

/**
 * Given a network and a wallet interface implementing the network-specific
 * interface, creates the associated Wallet Manager instance ready to rock.
 */
export function createWalletManager<Net extends BlockchainNetwork>(
  network: Net,
  wallet: MapNetworkToWalletInterface<Net>
) {
  return createWalletManagerMap[network](wallet as any)
}

// todo: move elsewhere
export const BlockchainNetworks = Object.keys(
  BlockchainNetwork
) as BlockchainNetwork[]

type WalletsMap = {
  [Net in BlockchainNetwork]?: MapNetworkToWalletInterface<Net> | null
}

/**
 * Given a map of network->wallet, abstracts event-handling & wallet manager
 * management based on events received from the wallet implementations.
 * @param wallets A map of network -> wallet interface
 * @returns A wallet source-compatible interface
 */
export function multichainWallets(wallets: WalletsMap): IWalletsSource {
  const init = intialization()
  const { networks, supports } = walletsNetworks(wallets)
  const emitter = new UserSourceEventEmitter()
  const managers: WalletManagersMap = Object.fromEntries(
    networks.map(net => [net, null])
  )

  // listen to events emitted by all provided wallets
  for (const net of networks) {
    const wallet = wallets[net]
    wallet?.emitter.on("wallet-changed", async () => {
      console.log("wallet emitter emitted")

      try {
        // @ts-expect-error
        managers[net] = await createWalletManager(net, wallet)
      } catch (err) {
        console.log(err)
        throw err
      }
      console.log("emit wallets-changed")
      console.log({ net, manager: managers[net] })
      emitter.emit("wallets-changed", [
        // @ts-expect-error
        {
          network: net,
          manager: managers[net] || null,
        },
      ])
    })
  }

  const getWallet: IWalletsSource["getWallet"] = net => wallets[net] || null
  const disconnect: IWalletsSource["disconnectWallet"] = async net => {
    const wallet = getWallet(net)
    if (wallet) await wallet.disconnect()
  }

  return {
    emitter,
    init: async () => {
      init.start()
      await Promise.all(
        networks.map(net => wallets[net]?.init?.()).filter(p => !!p)
      )
      init.finish()
    },
    initialized: () => init.finished,
    supports,
    getWalletManagers: () => managers,
    getWallet,
    disconnectWallet: disconnect,
    disconnectAllWallets: async () => {
      await Promise.all(networks.map(net => disconnect(net)))
    },
    getAccount: () => null,
    logoutAccount: async () => {},
  }
}

export function walletsNetworks(wallets: WalletsMap) {
  const networks = (Object.keys(wallets) as BlockchainNetwork[]).filter(
    net => !!wallets[net]
  )
  return {
    networks,
    supports: (network: BlockchainNetwork) => networks.includes(network),
  }
}

/**
 * @param managers A map of Wallet Managers
 * @returns Any active manager available in the given map (a manager is
 * considered active if not null)
 */
export function anyActiveManager(
  managers: WalletManagersMap
): EthereumWalletManager | TezosWalletManager | null {
  const mapped = BlockchainNetworks.map(net => managers[net])
  console.log({
    BlockchainNetworks,
    map: mapped,
    managers: { ...managers },
  })
  return BlockchainNetworks.map(net => managers[net])
    .map(man => man || null)
    .reduce((prev, curr) => prev || curr, null)
}
