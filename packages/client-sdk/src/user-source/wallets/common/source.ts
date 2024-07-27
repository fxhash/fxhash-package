import {
  type PromiseResult,
  BlockchainNetwork,
  invariant,
} from "@fxhash/shared"
import {
  type IWalletsSource,
  type IWalletRequirements,
  type IWalletInfo,
  type IWalletConnected,
  UserSourceEventEmitter,
} from "../../_interfaces.js"
import { intialization } from "@fxhash/utils"
import { WalletError } from "../../_errors.js"
import { type MapNetworkToWalletManager } from "../../_types.js"

interface IWalletSourceParams<N extends BlockchainNetwork> {
  network: N
  init: () => Promise<void>
  disconnect: () => Promise<void>
  requirements: () => IWalletRequirements
  // todo: more specific error
  createManager: (
    info: IWalletInfo<N> | null
  ) => PromiseResult<MapNetworkToWalletManager<N>, WalletError>
}

type TWalletSourceReturn<N extends BlockchainNetwork> = {
  source: IWalletsSource
  utils: {
    update: (info: IWalletInfo<N> | null) => Promise<void>
    init: ReturnType<typeof intialization>
  }
}

/**
 * General-purpose reusable utility to create a single-network wallet source.
 * Implements the common wallet source interface, as well as some utilities.
 */
export function walletSource<Net extends BlockchainNetwork>({
  network,
  init,
  disconnect,
  createManager,
  requirements,
}: IWalletSourceParams<Net>): TWalletSourceReturn<Net> {
  const _init = intialization()
  const emitter = new UserSourceEventEmitter().only("wallets-changed", "error")

  let connected: IWalletConnected<Net> | null = null

  const source: IWalletsSource = {
    emitter,
    init: async () => {
      _init.start()
      await init()
      _init.finish()
    },
    initialized: () => _init.finished,
    getAccount: () => null,
    logoutAccount: async () => {},
    // @ts-expect-error
    getWallet(net) {
      // @ts-expect-error
      invariant(net !== network, "invalid network")
      return {
        connected: connected,
        source: this,
      }
    },
    getWallets() {
      return {
        [network]: this.getWallet(network),
      }
    },
    supports: n => n === network,
    disconnectWallet: n => {
      invariant(n === network, "can only disconnect on same network")
      return disconnect()
    },
    disconnectAllWallets: disconnect,
    requirements,
  }

  return {
    source,
    utils: {
      init: _init,
      update: async info => {
        // if addresses are different, it's a new connection
        if (connected?.info.address !== info?.address) {
          if (!info) {
            connected = null
          } else {
            const res = await createManager(info)
            if (res.isFailure()) {
              // todo: what to do with error here ?
              // I considered whether info should be updated if createManager
              // fails, but figured it shoudl'nt be the case. But what if
              // we can't make a Wallet Manager, should we try to disconnect ?
              //
              console.log(res.error)
              throw res.error
            }
            connected = {
              manager: res.value,
              info,
            }
          }
          await emitter.emit("wallets-changed", [
            {
              network,
              wallet: source.getWallet(network) as any,
            },
          ])
        }
      },
    },
  }
}
