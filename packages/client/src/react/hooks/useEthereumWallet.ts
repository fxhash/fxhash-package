import {
  BlockchainType,
  PromiseResult,
  invariant,
  success,
} from "@fxhash/shared"
import { useClient } from "./useClient.js"
import { EthereumWalletManager } from "@fxhash/eth"
import { AuthenticationResult } from "@fxhash/gql"
import { SignMessageError } from "@/index.js"
import { useDisconnect } from "wagmi"
import { BlockchainEnv } from "@/wallets/connectors/events.js"

export function useEthereumWallet(): {
  ethereumWalletManager: EthereumWalletManager | null
  connected: boolean
  authenticate: () => PromiseResult<AuthenticationResult, SignMessageError>
  connect: () => PromiseResult<void, Error>
  disconnect: () => PromiseResult<void, Error>
} {
  const { client, ethereumWalletManager, config } = useClient()
  // const { disconnect: _disconnect } = useDisconnect()

  function authenticate(): PromiseResult<
    AuthenticationResult,
    SignMessageError
  > {
    return new Promise((resolve, reject) => {
      async function auth() {
        /**
         * TODO
         */
      }
      auth()
    })
  }
  function connect(): PromiseResult<void, Error> {
    return new Promise(() => {
      invariant(config.wallets.ETHEREUM, "Ethereum config not provided")
      throw new Error(
        "@fxhash/client does not provide a generic wallet connection method. Instead it's listening for your wallet connection e.g. using connectkit."
      )
    })
  }
  function disconnect(): PromiseResult<void, Error> {
    return new Promise(resolve => {
      invariant(config.wallets.ETHEREUM, "Ethereum config not provided")
      invariant(
        ethereumWalletManager,
        "Ethereum wallet manager is not connected"
      )
      // _disconnect()
      return resolve(success())
    })
  }

  return {
    ethereumWalletManager,
    connected: ethereumWalletManager !== null,
    authenticate,
    connect,
    disconnect,
  }
}
