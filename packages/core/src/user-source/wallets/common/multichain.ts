import {
  type IWalletsSource,
  UserSourceEventEmitter,
  IWallet,
} from "../../_interfaces.js"
import { intialization } from "@fxhash/utils"
import { type WalletsSourceMap } from "../../_types.js"
import { walletsNetworks } from "./utils.js"
import { BlockchainNetwork } from "@fxhash/shared"

interface IMultichainWalletsSource<Source extends WalletsSourceMap>
  extends IWalletsSource {
  getWallet: <N extends BlockchainNetwork>(
    network: N
  ) => IWallet<N, NonNullable<Source[N]>> | null
  getWallets: () => {
    [N in BlockchainNetwork]?: IWallet<N, NonNullable<Source[N]>>
  }
}

/**
 * Given a map of network->wallet, abstracts event-handling & wallet manager
 * management based on events received from the wallet implementations.
 * @param wallets A map of network -> wallet interface
 * @returns A wallet source-compatible interface
 */
export function multichainWallets<Source extends WalletsSourceMap>(
  wallets: Source
): IMultichainWalletsSource<Source> {
  type TWalletsSource = IMultichainWalletsSource<Source>

  const init = intialization()
  const { networks, supports } = walletsNetworks(wallets)
  const emitter = new UserSourceEventEmitter()

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
        emitter.emit("wallets-changed", [updated])
      } catch (err) {
        console.log(err)
        throw err
      }
    })
  }

  const getWallet: TWalletsSource["getWallet"] = net =>
    wallets[net]?.getWallet(net) || null

  const getWallets: TWalletsSource["getWallets"] = () =>
    Object.fromEntries(networks.map(network => [network, getWallet(network)]))

  const disconnect: TWalletsSource["disconnectWallet"] = async net => {
    const wallet = getWallet(net)
    if (wallet) await wallet.source.disconnectWallet(net)
  }

  return {
    emitter,
    getWallet,
    getWallets,
    init: async () => {
      init.start()
      // this module doesn't care whether each wallet has been successfully
      // initialized, it just forwards requests
      await Promise.allSettled(
        networks.map(net => wallets[net]?.init?.()).filter(p => !!p)
      )
      init.finish()
    },
    initialized: () => init.finished,
    supports,
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
