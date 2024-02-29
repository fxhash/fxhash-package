import {
  BlockchainType,
  SignMessageOptions,
  invariant,
  success,
} from "@fxhash/shared"
import { useDeferredTask } from "../utils/useDeferredTask"
import { useEthereumUserContext } from "./EthereumUser"
import { useTezosUserContext } from "./TezosUser"
import { TezosWalletManager } from "@fxhash/tez"
import { EthereumWalletManager } from "@fxhash/eth"

const SIGN_IN_MESSAGE = "Signed Message: sign in to fxhash.xyz"
const FXHASH_TERMS_OF_SERVICE =
  "Agree to terms: https://www.fxhash.xyz/doc/legal/terms.pdf"

/**
 * Formats a sign-in payload for a given Tezos address.
 *
 * @param {string} address - The Tezos address to include in the payload.
 * @return {string} - The formatted payload.
 */
export const formatSignInPayload = (address: string): string =>
  `${SIGN_IN_MESSAGE} (${address}). ${FXHASH_TERMS_OF_SERVICE}. Issued At: ${new Date().toISOString()} - valid for 5 mins.`

/**
 * `useSignMessage` is a hook that signs a message with the connected user's wallet.
 *
 * @example
 * ```tsx
 * const { execute: signMessage, loading, data, error } = useSignMessage();
 *
 * const result = await signMessage({ network: BlockchainType.TEZOS });
 * ```
 */
export const useSignMessage = () => {
  const { walletManager: tezosWalletManager } = useTezosUserContext()
  const { walletManager: ethereumWalletManager } = useEthereumUserContext()

  return useDeferredTask(
    async ({
      network,
      options,
    }: {
      network: BlockchainType
      options?: SignMessageOptions
    }) => {
      let walletManager: TezosWalletManager | EthereumWalletManager | null

      if (
        network === BlockchainType.ETHEREUM ||
        network === BlockchainType.BASE
      ) {
        walletManager = ethereumWalletManager
      } else if (network === BlockchainType.TEZOS) {
        walletManager = tezosWalletManager
      } else {
        throw new Error(`useSignMessage: ${network} is not supported`)
      }

      invariant(
        walletManager,
        `useSignMessage: ${network} wallet manager is not defined`
      )

      let message = formatSignInPayload(walletManager.address)
      // Some wallets in Tezos show a warning message if not prefixed by
      // "Tezos Signed Message"
      if (network === BlockchainType.TEZOS) {
        message = `Tezos ${message}`
      }
      const result = await walletManager.signMessage(message, options)
      if (result.isFailure()) {
        return result
      }

      return success({
        message,
        signature: result.value.signature,
      })
    }
  )
}
