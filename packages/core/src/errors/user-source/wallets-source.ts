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

export class EvmClientsChainMissmatchError extends Error {
  name = "EvmClientsChainMissmatchError" as const
  message =
    "it appears the connected EVM client is using a different chain than the dapp"
}

export type EvmWalletSourceError =
  | EvmClientsNotAvailableError
  | EvmViemClientGenerationError
  | EvmClientsChainMissmatchError

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

export class NoWalletConnectedError extends Error {
  name = "NoWalletConnectedError" as const
  message =
    "some operation which required any wallet could not be performed due to a lack of any wallet being connected."
}

export class SignMessageError extends Error {
  name = "SignMessageError" as const
  message = "error when signing a message with a wallet"
}

// chain agnostic errors, which can appear on any chain
export type XChainWalletSourceError =
  | BlockchainWalletNotAvailableError
  | BlockchainNotSupportedError
  | NoWalletConnectedError
  | SignMessageError

// union of all the wallet source errors
export type WalletSourceError =
  | TezosWalletSourceError
  | EvmWalletSourceError
  | XChainWalletSourceError
