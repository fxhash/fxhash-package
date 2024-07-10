import { BlockchainNetwork, invariant } from "@fxhash/shared"
import {
  IEvmWallet,
  ITezosWallet,
  IWalletsSource,
  MapNetworkToWalletInterface,
  MapNetworkToWalletManager,
} from "./_interfaces.js"
import { EthereumWalletManager, clientToSigner } from "@fxhash/eth"
import { config as fxConfig } from "@fxhash/config"
import { TezosWalletManager } from "@fxhash/tez"
import { UserSourceEventEmitter } from "../_interfaces.js"

/**
 * Given an EVM wallet interface, returns an Ethereum Wallet Manager instance
 * ready to rock.
 */
export async function createEvmWalletManager(evmWallet: IEvmWallet) {
  invariant(evmWallet, "should not be null")
  const _clients = await evmWallet.getClients()
  const info = evmWallet.getInfo()
  invariant(info, "cannot generate evm wallet manager without wallet info")

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
    throw new Error(_clients.error)
  }
}

/**
 * Given a tezos wallet interface, returns a Tezos Wallet Manager instance
 * ready to rock.
 */
export async function createTezosWalletManager(tezWallet: ITezosWallet) {
  invariant(tezWallet, "should not be null")
  const info = tezWallet.getInfo()
  invariant(info, "cannot generate tezos wallet manager without wallet info")

  return new TezosWalletManager({
    wallet: tezWallet.getWallet(),
    address: info.address,
  })
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
  [Net in BlockchainNetwork]?: MapNetworkToWalletInterface<Net>
}

type ManagersMap = {
  [Net in BlockchainNetwork]?: MapNetworkToWalletManager<Net> | null
}

/**
 * Given a map of network->wallet, abstracts event-handling & wallet manager
 * management based on events received from the wallet implementations.
 * @param wallets A map of network -> wallet interface
 * @returns A wallet source-compatible interface
 */
export function multichainWallets(wallets: WalletsMap): IWalletsSource {
  const networks = Object.keys(wallets) as BlockchainNetwork[]
  const emitter = new UserSourceEventEmitter()
  const managers: ManagersMap = Object.fromEntries(
    networks.map(net => [net, null])
  )

  // listen to events emitted by all provided wallets
  for (const net of networks) {
    const wallet = wallets[net]
    wallet?.emitter.on("wallet-changed", async () => {
      // @ts-expect-error
      managers[net] = await createWalletManager(net, wallet)
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
  const disconnect: IWalletsSource["disconnect"] = async net => {
    const wallet = getWallet(net)
    if (wallet) await wallet.disconnect()
  }

  return {
    emitter,
    init: async () => {
      Object.values(wallets).map(wal => wal.init?.())
    },
    supports: (network: BlockchainNetwork) => networks.includes(network),
    getWalletManagers: () => managers,
    getWallet,
    disconnect,
    disconnectAll: async () => {
      await Promise.all(networks.map(net => disconnect(net)))
    },
    getAccount: () => null,
  }
}
