import { useState, createContext, useContext, useEffect } from "react"
import { TezosWalletManager, encodeSignInPayload } from "@fxhash/contracts"
import {
  PendingSigningRequestError,
  PromiseResult,
  UserRejectedError,
  failure,
  invariant,
  success,
} from "@fxhash/contracts-shared"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { TezosToolkit, WalletProvider } from "@taquito/taquito"
import { AbortedBeaconError } from "@airgap/beacon-sdk"
import autonomyIRL from "autonomy-irl-js"

const TEZOS_SIGN_IN_MESSAGE = "Tezos Signed Message: sign in to fxhash.xyz"
const FXHASH_TERMS_OF_SERVICE =
  "Agree to terms: https://www.fxhash.xyz/doc/legal/terms.pdf"

/**
 * Formats a sign-in payload for a given Tezos address.
 *
 * @param {string} address - The Tezos address to include in the payload.
 * @return {string} - The formatted payload.
 */
const formatSignInPayload = (address: string): string =>
  `${TEZOS_SIGN_IN_MESSAGE} (${address}). ${FXHASH_TERMS_OF_SERVICE}. Issued At: ${new Date().toISOString()} - valid for 5 mins.`

export interface UserContextType {
  walletManager: TezosWalletManager | null
  beaconWallet: BeaconWallet | null
  tezosToolkit: TezosToolkit | null

  account: string | null
  /**
   * IsReady is used to determine if the context is ready to be used.
   * No Tezos function should be called before it is true. You can use useEffect to wait for it.
   */
  isReady: boolean
  connect: (useAutonomy?: boolean) => PromiseResult<
    {
      address: string
      authorization: {
        payload: string
        signature: string
        publicKey: string
      }
    },
    UserRejectedError | PendingSigningRequestError
  >
  connectAutonomyWallet: () => PromiseResult<string, UserRejectedError>
  connectFromStorage: () => PromiseResult<string | false, UserRejectedError>
  disconnect: () => Promise<void>
}

const defaultCtx: UserContextType = {
  walletManager: null,
  beaconWallet: null,
  tezosToolkit: null,
  account: null,
  isReady: false,
  connect: () => new Promise(r => r(success({} as any))),
  connectAutonomyWallet: () => new Promise(r => r(success(""))),
  connectFromStorage: () => new Promise(r => r(success(false))),
  disconnect: () => new Promise(r => r()),
}

export const TezosUserContext = createContext<UserContextType>(defaultCtx)

export interface TezosUserProviderConfig {
  /**
   * A function that returns a beacon wallet. Called when the Provider is mounted client side.
   * The beacon wallet can't be initialized server side as it requires access to the local storage.
   */
  createBeaconWallet: () => BeaconWallet
  tezosToolkit: TezosToolkit
  rpcNodes: string[]
}

interface TezosUserProviderProps {
  children: React.ReactNode
  config: TezosUserProviderConfig
}

/**
 * Responsible for handling the Tezos connection and initializing the wallet manager.
 * As there is no React integration for Taquito, we handle the logic on behalf of the user.
 *
 * TODO
 * @dev long term we would want to move the logic for everything non-react
 * specific outside of this package.
 */
export function TezosUserProvider({
  config,
  children,
}: TezosUserProviderProps) {
  const [context, setContext] = useState<UserContextType>(defaultCtx)

  /**
   * FOR LIVE MINTING:
   * construct a fake wallet provider using autonomyIRL to be able to reuse
   * our beacon wallet implementation
   */
  const connectAutonomyWallet = async (): PromiseResult<
    string,
    UserRejectedError
  > => {
    invariant(
      context.tezosToolkit,
      "TezosUserProvider: tezosToolkit is not set"
    )

    const { result: pkh } = await autonomyIRL.getAddress({
      chain: autonomyIRL.chain.tez,
    })

    const provider: Pick<
      WalletProvider,
      "getPKH" | "mapTransferParamsToWalletParams" | "sendOperations"
    > = {
      getPKH: () => pkh,
      mapTransferParamsToWalletParams: params => {
        return params()
      },
      sendOperations: async operations => {
        const { result } = await autonomyIRL.sendTransaction({
          transactions: operations.map(op => ({
            kind: "transaction",
            destination: op.to,
            amount: op.amount.toString(),
            mutez: true,
            entrypoint: op.parameter.entrypoint,
            parameters: op.parameter.value,
            storageLimit: op.storageLimit?.toString(),
          })),
          sourceAddress: pkh,
          metadata: {
            metadata: {
              name: "fxhash",
              description:
                "The open platform for artists and collectors to live out their passion for generative art.",
              url: "https://fxhash.xyz",
              // icons: ["url_icon"],
            },
          },
          chain: autonomyIRL.chain.tez,
        })

        return result
      },
    }

    context.tezosToolkit.setWalletProvider(provider as WalletProvider)
    const walletManager = new TezosWalletManager({
      beaconWallet: provider as BeaconWallet,
      tezosToolkit: context.tezosToolkit,
      rpcNodes: config.rpcNodes,
    })

    // https://github.com/fxhash/monorepo/issues/394
    // const message = encodeSignInPayload(formatSignInPayload(pkh))
    // const result = await autonomyIRL.signMessage(
    //   message,
    //   pkh,
    //   autonomyIRL.chain.tez,
    //   {
    //     name: "fxhash",
    //     description:
    //       "The open platform for artists and collectors to live out their passion for generative art.",
    //     url: "https://fxhash.xyz",
    //   }
    // )
    // alert("result " + JSON.stringify(result))

    setContext(context => ({
      ...context,
      beaconWallet: provider as BeaconWallet,
      walletManager,
    }))

    return success(pkh)
  }

  const connect = async (): PromiseResult<
    {
      address: string
      authorization: {
        payload: string
        signature: string
        publicKey: string
      }
    },
    UserRejectedError | PendingSigningRequestError
  > => {
    invariant(
      context.beaconWallet,
      "TezosUserProvider: beaconWallet is not set"
    )
    invariant(
      context.tezosToolkit,
      "TezosUserProvider: tezosToolkit is not set"
    )

    try {
      await context.beaconWallet.requestPermissions()
    } catch (error) {
      if (error instanceof AbortedBeaconError) {
        return failure(new UserRejectedError())
      }
      throw error
    }

    const userAddress = await context.beaconWallet.getPKH()
    context.tezosToolkit.setWalletProvider(context.beaconWallet)

    const walletManager = new TezosWalletManager({
      beaconWallet: context.beaconWallet,
      tezosToolkit: context.tezosToolkit,
      rpcNodes: config.rpcNodes,
    })

    const message = formatSignInPayload(userAddress)
    const result = await walletManager.signMessage(message)
    if (result.isFailure()) {
      return result
    }

    const activeAccount = await context.beaconWallet.client.getActiveAccount()
    if (!activeAccount) {
      return failure(new UserRejectedError())
    }

    setContext({
      ...context,
      account: userAddress,
      walletManager,
    })

    return success({
      address: userAddress,
      authorization: {
        payload: message,
        signature: result.value,
        publicKey: activeAccount.publicKey,
      },
    })
  }

  /**
   * If a beacon session can be found in the storage, then we can assume that the user is still connected
   * to the platform and thus register its wallet to the tezos toolkit
   */
  const connectFromStorage = async (): PromiseResult<
    string | false,
    UserRejectedError
  > => {
    invariant(
      context.beaconWallet,
      "TezosUserProvider: beaconWallet is not set"
    )
    invariant(
      context.tezosToolkit,
      "TezosUserProvider: tezosToolkit is not set"
    )

    try {
      const pkh = await context.beaconWallet.getPKH()
      if (pkh) {
        context.tezosToolkit.setWalletProvider(context.beaconWallet)

        const walletManager = new TezosWalletManager({
          beaconWallet: context.beaconWallet,
          tezosToolkit: context.tezosToolkit,
          rpcNodes: config.rpcNodes,
        })
        setContext({
          ...context,
          account: pkh,
          walletManager,
        })

        return success(pkh)
      } else {
        return success(false)
      }
    } catch (err) {
      return success(false)
    }
  }

  const disconnect = async () => {
    await context.beaconWallet?.disconnect()
    context.tezosToolkit?.setWalletProvider(undefined)
    setContext({
      ...context,
      account: null,
      walletManager: null,
    })

    // Reload the page to fix issues with the Tezos wallet provider not triggering the modal to open
    location.reload()
  }

  /**
   * Initialize the context with the tezos toolkit and the beacon wallet on mount.
   * The beacon wallet can't be initialized server side as it requires access to the local storage.
   */
  useEffect(() => {
    setContext(context => ({
      ...context,
      isReady: true,
      tezosToolkit: config.tezosToolkit,
      beaconWallet: config.createBeaconWallet(),
    }))
  }, [])

  return (
    <TezosUserContext.Provider
      value={{
        ...context,
        connect,
        connectAutonomyWallet,
        connectFromStorage,
        disconnect,
      }}
    >
      {children}
    </TezosUserContext.Provider>
  )
}

export function useTezosUserContext(): UserContextType {
  const context = useContext(TezosUserContext)

  invariant(
    context,
    "Could not find the Fxhash context, ensure your code is wrapped in <TezosUserProvider>"
  )

  return context
}
