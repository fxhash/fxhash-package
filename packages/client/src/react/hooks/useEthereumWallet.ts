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

export function useEthereumWallet(): {
  ethereumWalletManager: EthereumWalletManager | null
  connected: boolean
  authenticate: () => PromiseResult<AuthenticationResult, SignMessageError>
  connect: () => PromiseResult<void, Error>
  disconnect: () => PromiseResult<void, Error>
} {
  const { client, ethereumWalletManager, config } = useClient()
  const { disconnect: _disconnect } = useDisconnect()

  function authenticate(): PromiseResult<
    AuthenticationResult,
    SignMessageError
  > {
    return new Promise((resolve, reject) => {
      async function auth() {
        try {
          invariant(
            ethereumWalletManager,
            "Ethereum wallet manager is not connected"
          )
          const { text, id } = await client.generateChallenge(
            BlockchainType.ETHEREUM,
            ethereumWalletManager.address
          )
          const sig = await ethereumWalletManager.signMessage(text)
          if (sig.isFailure()) throw new SignMessageError()
          const res = await client.authenticate(id, sig.value.signature)

          resolve(success(res))
        } catch (e) {
          reject(e)
        }
      }
      auth()
    })
  }
  function connect(): PromiseResult<void, Error> {
    return new Promise(resolve => {
      // TODO: Should this resolve in a success or throw?
      console.log("use connectkit modal")
      return resolve(success())
      invariant(config.wallets.ETHEREUM, "Ethereum config not provided")
    })
  }
  function disconnect(): PromiseResult<void, Error> {
    return new Promise(resolve => {
      invariant(config.wallets.ETHEREUM, "Ethereum config not provided")
      invariant(
        ethereumWalletManager,
        "Ethereum wallet manager is not connected"
      )
      _disconnect()
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
