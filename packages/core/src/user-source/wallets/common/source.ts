import { BlockchainNetwork } from "@fxhash/shared"
import { type PromiseResult, invariant } from "@fxhash/utils"
import {
  type IWalletsSource,
  type IWalletRequirements,
  type IWalletInfo,
  type IWalletConnected,
  UserSourceEventEmitter,
} from "../../_interfaces.js"
import { intialization } from "@fxhash/utils"
import { type MapNetworkToWalletManager } from "../../_types.js"
import { WalletSourceErrorTypemap } from "@/index.js"

interface IWalletSourceParams<N extends BlockchainNetwork> {
  network: N
  init: () => Promise<void>
  disconnect: () => Promise<void>
  requirements: () => IWalletRequirements
  createManager: (
    info: IWalletInfo<N> | null
  ) => PromiseResult<MapNetworkToWalletManager<N>, WalletSourceErrorTypemap[N]>
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
      try {
        await init()
        _init.finish()
      } catch (err) {
        throw _init.fail(err)
      }
    },
    initialized: () => _init.finished,
    getAccount: () => null,
    logoutAccount: async () => {},
    getWallet(net) {
      _init.check()
      invariant(this.supports(net), "invalid network")
      return {
        connected: connected as any,
        source: this,
      }
    },
    getWallets() {
      _init.check()
      return {
        [network]: this.getWallet(network),
      }
    },
    supports: n => n === network,
    disconnectWallet: n => {
      _init.check()
      invariant(n === network, "can only disconnect on same network")
      return disconnect()
    },
    disconnectAllWallets: () => {
      _init.check()
      return disconnect()
    },
    requirements,
  }

  return {
    source,
    utils: {
      init: _init,
      update: async info => {
        _init.check()
        // if addresses are different, it's a new connection
        if (connected?.info.address !== info?.address) {
          if (!info) {
            connected = null
          } else {
            const res = await createManager(info)
            if (res.isFailure()) throw res.error
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
