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

export function useEthereumWallet(): {
  ethereumWalletManager: EthereumWalletManager | null
  connected: boolean
  authenticate: () => PromiseResult<AuthenticationResult, SignMessageError>
  connect: () => PromiseResult<void, Error>
} {
  const { client, ethereumWalletManager, config } = useClient()
  function authenticate(): PromiseResult<
    AuthenticationResult,
    SignMessageError
  > {
    return new Promise(async resolve => {
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
    })
  }
  function connect(): PromiseResult<void, Error> {
    return new Promise(async resolve => {
      invariant(config.ETHEREUM, "Ethereum config not provided")
      console.log("use connectkit modal")
      return resolve(success())
    })
  }
  return {
    ethereumWalletManager,
    connected: ethereumWalletManager !== null,
    authenticate,
    connect,
  }
}
