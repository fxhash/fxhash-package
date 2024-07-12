import { IUserSource, UserSourceEventEmitter } from "@fxhash/client-sdk"
import { BlockchainNetwork } from "@fxhash/shared"
import { Config as WagmiConfig } from "@wagmi/core"
import { config as fxConfig } from "@fxhash/config"

export interface IClientPlugnPlay {
  config: {
    wagmi: WagmiConfig
    fxhash: typeof fxConfig
  }
  source: IUserSource
  emitter: UserSourceEventEmitter
  requestConnection: (network: BlockchainNetwork) => void
  init: () => Promise<void>
  requestDisconnection: (network: BlockchainNetwork) => Promise<void>
  logout: () => Promise<void>
  release: () => void
}
