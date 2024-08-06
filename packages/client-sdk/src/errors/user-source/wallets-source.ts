import type { BlockchainNetwork } from "@fxhash/shared"

export class TezosClientNotAvailableError extends Error {
  name = "TezosClientNotAvailableError" as const
}

export type TezosWalletSourceError = TezosClientNotAvailableError

/**
 * Is thrown when evm clients are requested on a connector, but such clients
 * are unavailable. Instead of returning null, this error was thrown because
 * applications should not directly request clients outside of when they are
 * available.
 */
export class EvmClientsNotAvailableError extends Error {
  name = "EvmClientsNotAvailableError" as const
  message = "the EVM public/wallet clients are currently unavailable."
}

export class EvmViemClientGenerationError extends Error {
  name = "EvmViemClientGenerationError" as const
  message = "an error occured when attempting to generate the viem clients."
}

export type EvmWalletSourceError =
  | EvmClientsNotAvailableError
  | EvmViemClientGenerationError

export type WalletSourceErrorTypemap = {
  [BlockchainNetwork.TEZOS]: TezosWalletSourceError
  [BlockchainNetwork.ETHEREUM]: EvmWalletSourceError
}

export class BlockchainWalletNotAvailableError extends Error {
  name = "BlockchainWalletNotAvailableError" as const
  message = "the requested blockchain network isn't available"
}

export class BlockchainNotSupportedError extends Error {
  name = "BlockchainNotSupportedError" as const
  message = "the requested blockchain isn't supported"
}

export type WalletSourceError =
  | TezosWalletSourceError
  | EvmWalletSourceError
  | BlockchainWalletNotAvailableError
  | BlockchainNotSupportedError
