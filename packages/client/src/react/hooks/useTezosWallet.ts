import {
  BlockchainType,
  PromiseResult,
  invariant,
  success,
} from "@fxhash/shared"
import { useClient } from "./useClient.js"
import { TezosWalletManager } from "@fxhash/tez"
import { AuthenticationResult } from "@fxhash/gql"
import { SignMessageError } from "@/index.js"

export function useTezosWallet(): {
  tezosWalletManager: TezosWalletManager | null
  connected: boolean
  authenticate: () => PromiseResult<AuthenticationResult, SignMessageError>
  connect: () => PromiseResult<void, Error>
  disconnect: () => PromiseResult<void, Error>
} {
  const { client, tezosWalletManager, config } = useClient()

  function authenticate(): PromiseResult<
    AuthenticationResult,
    SignMessageError
  > {
    return new Promise((resolve, reject) => {
      async function auth() {
        try {
          invariant(tezosWalletManager, "Tezos wallet manager is not connected")
          const { text, id } = await client.generateChallenge(
            BlockchainType.TEZOS,
            tezosWalletManager.address
          )
          const sig = await tezosWalletManager.signMessage(text)
          if (sig.isFailure()) throw new SignMessageError()
          const publicKey = await tezosWalletManager.getPublicKey()
          const res = await client.authenticate(
            id,
            sig.value.signature,
            publicKey
          )
          resolve(success(res))
        } catch (e) {
          reject(e)
        }
      }
      auth()
    })
  }

  function connect(): PromiseResult<void, Error> {
    return new Promise((resolve, reject) => {
      async function connect() {
        try {
          invariant(config.TEZOS, "Tezos config not provided")
          invariant(
            config.TEZOS.beaconWallet,
            "Tezos beacon wallet not provided"
          )
          await config.TEZOS.beaconWallet.requestPermissions()
          resolve(success())
        } catch (e) {
          reject(e)
        }
      }
      connect()
    })
  }

  function disconnect(): PromiseResult<void, Error> {
    return new Promise((resolve, reject) => {
      async function disconnect() {
        try {
          invariant(config.TEZOS, "Tezos config not provided")
          invariant(
            config.TEZOS.beaconWallet,
            "Tezos beacon wallet not provided"
          )
          await config.TEZOS.beaconWallet.clearActiveAccount()
          resolve(success())
        } catch (e) {
          reject(e)
        }
      }
      disconnect()
    })
  }

  return {
    tezosWalletManager,
    connected: tezosWalletManager !== null,
    authenticate,
    connect,
    disconnect,
  }
}
