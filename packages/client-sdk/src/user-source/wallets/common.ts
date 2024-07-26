import { BlockchainNetwork, PromiseResult, invariant } from "@fxhash/shared"
import { type Signer } from "@taquito/taquito"
import { type BeaconWallet } from "@taquito/beacon-wallet"
import {
  IEvmWalletConnectorClients,
  IRequirements,
  IWalletInfo,
  IWalletsSource,
  MapNetworkToWalletManager,
} from "./_interfaces.js"
import { EthereumWalletManager, clientToSigner } from "@fxhash/eth"
import { config as fxConfig } from "@fxhash/config"
import { TezosWalletManager } from "@fxhash/tez"
import { WalletManagersMap, UserSourceEventEmitter } from "../_interfaces.js"
import { AtLeastOne, intialization } from "@fxhash/utils"
import { WalletError } from "../_errors.js"

interface IWalletManagerCreateParams<Net extends BlockchainNetwork> {
  info: IWalletInfo<Net>
  source: MapNetworkToWalletManagerCreateSourceInput<Net>
}

type FnCreateWalletManager<Net extends BlockchainNetwork> = (
  params: IWalletManagerCreateParams<Net>
) => MapNetworkToWalletManager<Net>

/**
 * Given an EVM wallet interface, returns an Ethereum Wallet Manager instance
 * ready to rock.
 */
export const createEvmWalletManager: FnCreateWalletManager<
  BlockchainNetwork.ETHEREUM
> = ({ info, source }) => {
  return new EthereumWalletManager({
    walletClient: source.wallet,
    publicClient: source.public,
    rpcNodes: fxConfig.eth.apis.rpcs,
    address: info.address,
    signer: source.signer || clientToSigner(source.wallet),
    ethersAdapterForSafe: source.ethersAdapterForSafe,
  })
}

/**
 * Given a tezos wallet interface, returns a Tezos Wallet Manager instance
 * ready to rock.
 */
export const createTezosWalletManager: FnCreateWalletManager<
  BlockchainNetwork.TEZOS
> = ({ info, source }) => {
  const anySource = source.beaconWallet || source.signer
  // todo: what to do with error ?
  if (!info || !anySource) throw new Error("todo")
  return new TezosWalletManager({
    wallet: anySource,
    address: info.address,
  })
}

const createWalletManagerMap: {
  [Net in BlockchainNetwork]: FnCreateWalletManager<Net>
} = {
  [BlockchainNetwork.ETHEREUM]: createEvmWalletManager,
  [BlockchainNetwork.TEZOS]: createTezosWalletManager,
}

/**
 * Given a network and a wallet interface implementing the network-specific
 * interface, creates the associated Wallet Manager instance ready to rock.
 */
export function createWalletManager<Net extends BlockchainNetwork>(
  network: Net,
  params: IWalletManagerCreateParams<Net>
) {
  return createWalletManagerMap[network](params)
}

// todo: move elsewhere
export const BlockchainNetworks = Object.keys(
  BlockchainNetwork
) as BlockchainNetwork[]

type WalletsMap = {
  [Net in BlockchainNetwork]?: IWalletsSource | null
}

interface IMultichainWalletsSource extends IWalletsSource {
  getWallet: (network: BlockchainNetwork) => IWalletsSource | null
}

/**
 * Given a map of network->wallet, abstracts event-handling & wallet manager
 * management based on events received from the wallet implementations.
 * @param wallets A map of network -> wallet interface
 * @returns A wallet source-compatible interface
 */
export function multichainWallets(
  wallets: WalletsMap
): IMultichainWalletsSource {
  const init = intialization()
  const { networks, supports } = walletsNetworks(wallets)
  const emitter = new UserSourceEventEmitter()
  const managers: WalletManagersMap = Object.fromEntries(
    networks.map(net => [net, null])
  )

  // listen to events emitted by all provided wallets
  for (const net of networks) {
    const wallet = wallets[net]
    wallet?.emitter.on("wallets-changed", async payload => {
      console.log("wallet emitter emitted")

      try {
        const updated = payload.find(p => p.network === net)
        if (!updated)
          throw new Error(
            "a wallet source emitted a wallet changed event without providing a proper payload"
          )
        // @ts-expect-error
        managers[net] = updated.manager
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

  const getWallet: IMultichainWalletsSource["getWallet"] = net =>
    wallets[net] || null
  const disconnect: IWalletsSource["disconnectWallet"] = async net => {
    const wallet = getWallet(net)
    if (wallet) await wallet.disconnectWallet(net)
  }

  return {
    emitter,
    getWallet,
    getInfo: network => getWallet(network)?.getInfo(network) || null,
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
    disconnectWallet: disconnect,
    disconnectAllWallets: async () => {
      await Promise.all(networks.map(net => disconnect(net)))
    },
    getAccount: () => null,
    logoutAccount: async () => {},
    requirements: () => ({
      userInput: networks
        // get requirements of the available wallets
        .map(net => wallets[net])
        .filter(wal => !!wal)
        .map(wal => wal!.requirements())
        // if any user input is `true`, union of wallets will require user input
        .some(req => req.userInput),
    }),
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

interface IWalletSourceParams<N extends BlockchainNetwork> {
  network: N
  init: () => Promise<void>
  disconnect: () => Promise<void>
  requirements: () => IRequirements
  // todo: more specific error
  createManager: (
    info: IWalletInfo<N> | null
  ) => PromiseResult<MapNetworkToWalletManager<N>, WalletError>
}

type TWalletSource<N extends BlockchainNetwork> = {
  source: IWalletsSource
  utils: {
    update: (info: IWalletInfo<N> | null) => Promise<void>
    init: ReturnType<typeof intialization>
  }
}

export type MapNetworkToWalletManagerCreateSourceInput<
  Net extends BlockchainNetwork,
> = {
  [N in BlockchainNetwork]: {
    [BlockchainNetwork.ETHEREUM]: IEvmWalletConnectorClients
    [BlockchainNetwork.TEZOS]: AtLeastOne<{
      beaconWallet: BeaconWallet
      signer: Signer
    }>
  }[N]
}[Net]

export function walletSource<Net extends BlockchainNetwork>({
  network,
  init,
  disconnect,
  createManager,
  requirements,
}: IWalletSourceParams<Net>): TWalletSource<Net> {
  // derived types
  type _Info = IWalletInfo<Net> | null

  let _info: _Info = null
  let _manager: MapNetworkToWalletManager<Net> | null = null

  const _init = intialization()
  const emitter = new UserSourceEventEmitter().only("wallets-changed", "error")

  return {
    source: {
      emitter,
      init: async () => {
        _init.start()
        await init()
        _init.finish()
      },
      initialized: () => _init.finished,
      getAccount: () => null,
      logoutAccount: async () => {},
      getWalletManagers: () => ({
        [network]: _manager,
      }),
      // @ts-expect-error
      getInfo: n => {
        // @ts-expect-error
        invariant(n === network, "cannot only get network info")
        return _info
      },
      supports: n => n === network,
      disconnectWallet: n => {
        invariant(n === network, "can only disconnect on same network")
        return disconnect()
      },
      disconnectAllWallets: disconnect,
      requirements,
    },
    utils: {
      init: _init,
      update: async info => {
        const prev = _info
        // todo: should we update _info if couldn't create manager ?
        _info = info
        if (prev?.address !== info?.address) {
          const res = await createManager(info)
          if (res.isSuccess()) {
            _manager = res.value
            await emitter.emit("wallets-changed", [
              { network, manager: _manager as any },
            ])
          } else {
            emitter.emit("error", res.error)
          }
        }
      },
    },
  }
}
