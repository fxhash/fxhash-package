/**
 * @dev This was marked as "unstable" in the Wallet.ts file, but I needed this
 * for making @fxhash/client (as we needed a generic way to define the wagmi
 * config). Because I was unsure if it was still unstable, I isolated what I
 * needed. If nothing complains in the following weeks this comment can be
 * removed.
 * free tez if you find this edskS3h7oGLV5NH8ipZ185LLyJxJ3B2CnTofxqqUj9xJPAwAZzruxqcSLbmjyPaokf7KpzMtGEc6Ng1jp7JG45fP5Xx67bmvNv
 */

import { fallback, unstable_connector, Transport, http } from "@wagmi/core"
import { metaMask, walletConnect, coinbaseWallet } from "@wagmi/connectors"
import { config, devConfig, prdConfig } from "@fxhash/config"
import { BlockchainType } from "@fxhash/shared"

export const defaultTransports = [
  unstable_connector(metaMask),
  unstable_connector(walletConnect),
  unstable_connector(coinbaseWallet),
]

export const transports: Record<string, Transport> =
  config.config.envName === "production"
    ? {
        [BlockchainType.ETHEREUM]: fallback([
          ...defaultTransports,
          http(prdConfig.eth.apis!.rpcs[0]),
          http(),
        ]),
        [BlockchainType.BASE]: fallback([
          ...defaultTransports,
          http(prdConfig.base.apis!.rpcs[0]),
          http(),
        ]),
      }
    : {
        [BlockchainType.ETHEREUM]: fallback([
          ...defaultTransports,
          http(devConfig.eth.apis!.rpcs[0]),
          http(),
        ]),
        [BlockchainType.BASE]: fallback([
          ...defaultTransports,
          http(devConfig.eth.apis!.rpcs[0]),
          http(),
        ]),
      }
