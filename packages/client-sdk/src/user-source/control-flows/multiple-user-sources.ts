import { cleanup, initOnce, intialization } from "@fxhash/utils"
import { IUserSource, UserSourceEventEmitter } from "../_interfaces.js"
import { anyActiveManager } from "../wallets/common/utils.js"

type Options = {
  sources: IUserSource[]
}

export interface IMultipleUserSources extends IUserSource {
  activeSource: () => IUserSource | null
}

/**
 * Takes an array of user sources as an input, and handles how to reconciliate
 * the different sources such that only one source is considered as active.
 * The current implementation watches for the first `user-changed` event emitted
 * by a source to put it as active (if any wallet/user),
 */
export function multipleUserSources({
  sources,
}: Options): IMultipleUserSources {
  const emitter = new UserSourceEventEmitter()
  const init = intialization()
  const clean = cleanup()

  // As soon as a source emits an event, it becomes "active", and blocks other
  // sources from emitting events. Only when the source has no more active
  // account/wallet it becomes inactive and frees the spot.
  // todo: implement more refined strategies, maybe abstract ?
  let _activeSource: IUserSource | null = null

  const _clearActiveIfInactive = () => {
    if (!_activeSource) return
    if (!isSourceActive(_activeSource)) _activeSource = null
  }

  const _hookEvents = () => {
    for (const source of sources) {
      clean.add(
        /**
         * TODO
         * This is a bit of a naive implementation there, as we just ignore if
         * some source emits an event when another source is active. Maybe
         * think of something a little bit more refined.
         */
        source.emitter.on("user-changed", () => {
          if (!_activeSource) _activeSource = source
          if (_activeSource === source) {
            _clearActiveIfInactive()
            emitter.emit("user-changed")
            return
          }
          // do nothing if there is active source and != source who emitted
        }),
        source.emitter.on("error", err => {
          if (!_activeSource || source === _activeSource) {
            emitter.emit("error", err)
          }
        })
      )
    }
  }

  return {
    emitter,
    activeSource: () => _activeSource,
    initialized: () => init.finished,

    getAccount: () => _activeSource?.getAccount() || null,
    logoutAccount: async () => {
      if (!_activeSource) return
      return _activeSource.logoutAccount()
    },

    getWallet: net => _activeSource?.getWallet(net) || null,
    getWallets: () => _activeSource?.getWallets() || null,

    disconnectWallet: async network => {
      if (!_activeSource) return
      return _activeSource.disconnectWallet(network)
    },
    disconnectAllWallets: async () => {
      if (!_activeSource) return
      return _activeSource.disconnectAllWallets()
    },

    init: initOnce(init, async () => {
      _hookEvents()
      await Promise.all(sources.map(source => source.init()))
    }),

    release: () => {
      clean.clear()
      sources.forEach(source => source.release?.())
    },
  }
}

function isSourceActive(source: IUserSource): boolean {
  const account = source.getAccount()
  const wallets = source.getWallets()
  return !!(account || (wallets && anyActiveManager(wallets)))
}
