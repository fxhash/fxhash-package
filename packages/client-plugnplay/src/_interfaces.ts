import { IUserSource, UserSourceEventEmitter } from "@fxhash/client-sdk"
import { BlockchainNetwork } from "@fxhash/shared"
import { Config as WagmiConfig } from "@wagmi/core"
import { config as fxConfig } from "@fxhash/config"

export interface IClientPlugnPlay {
  config: {
    wagmi?: WagmiConfig
    fxhash: typeof fxConfig
  }
  source: IUserSource
  emitter: UserSourceEventEmitter
  connectWallet: (network: BlockchainNetwork) => void
  init: () => Promise<void>
  disconnectWallet: (network: BlockchainNetwork) => Promise<void>
  disconnectAllWallets: () => Promise<void>
  logoutAccount: () => Promise<void>
  release: () => void
}
