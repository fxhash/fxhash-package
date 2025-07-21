/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 *
 * Config-related utilities, with some default environment-scoped values as well
 * as some factory function to generate configs for various providers.
 */

import { chains } from "./Wallet.js"
import { createConfig, fallback, http } from "@wagmi/core"
import { transports } from "./_unstable.js"
import { config } from "@fxhash/config"
import { Chain } from "viem"

export const getTransportWithFallback = (chain: Chain) => {
  return fallback([
    http(),
    http(
      chain.id === chains.ETHEREUM.id
        ? config.eth.apis.alchemy.rpc
        : config.base.apis.alchemy.rpc
    ),
  ])
}

export const supportedEvmChains = [chains.ETHEREUM, chains.BASE] as const
export const viemTransports = [transports.ETHEREUM, transports.BASE] as const
export const viemSimpleTransports = Object.fromEntries(
  supportedEvmChains.map(chain => [chain.id, getTransportWithFallback(chain)])
)

export const fxCreateWagmiConfig = () => {
  return createConfig({
    chains: supportedEvmChains,
    transports: viemTransports,
  })
}
