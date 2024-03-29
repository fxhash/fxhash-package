import { useState, createContext, useContext, useEffect, useMemo } from "react"
import { TezosWalletManager } from "@fxhash/contracts"
import {
  BlockchainType,
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
import {
  IConnexionPayload,
  TUserWalletContext,
} from "../types/UserWalletContext"
import { formatSignInPayload } from "./useSignMessage"

export interface TUserTezosWalletContext extends TUserWalletContext {
  walletManager: TezosWalletManager | null
  beaconWallet: BeaconWallet | null
  tezosToolkit: TezosToolkit | null
  connectAutonomyWallet: () => PromiseResult<string, UserRejectedError>
}

const defaultCtx: TUserTezosWalletContext = {
  walletManager: null,
  beaconWallet: null,
  tezosToolkit: null,
  address: null,
  initialized: false,
  connected: false,
  connect: () => new Promise(r => r(success({} as any))),
  connectAutonomyWallet: () => new Promise(r => r(success(""))),
  disconnect: () => new Promise(r => {}),
}

export const TezosUserContext =
  createContext<TUserTezosWalletContext>(defaultCtx)

export interface TezosUserProviderConfig {
  /**
   * A function that returns a beacon wallet. Called when the Provider
   * is mounted client side. The beacon wallet can't be initialized server side
   * as it requires access to the local storage.
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
 * Responsible for handling the Tezos connection and initializing the wallet
 * manager. As there is no React integration for Taquito, we handle the logic on
 * behalf of the user.
 *
 * TODO
 * @dev long term we would want to move the logic for everything non-react
 * specific outside of this package.
 */
export function TezosUserProvider({
  config,
  children,
}: TezosUserProviderProps) {
  const [context, setContext] = useState<TUserTezosWalletContext>(defaultCtx)

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
      address: pkh,
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
      address: pkh,
      beaconWallet: provider as BeaconWallet,
      walletManager,
    }))

    return success(pkh)
  }

  const connect = async (): PromiseResult<
    IConnexionPayload,
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

    const address = await context.beaconWallet.getPKH()
    context.tezosToolkit.setWalletProvider(context.beaconWallet)
    const walletManager = new TezosWalletManager({
      beaconWallet: context.beaconWallet,
      tezosToolkit: context.tezosToolkit,
      rpcNodes: config.rpcNodes,
      address,
    })

    let message = "Tezos " + formatSignInPayload(walletManager.address)
    const result = await walletManager.signMessage(message, {
      type: "authentication-payload",
      policy: "cache-first",
    })
    if (result.isFailure()) {
      return result
    }

    // wallet successfully connected, propagrating into state
    setContext(context => ({
      ...context,
      address,
      walletManager,
    }))

    // success payload for the connection
    return success({
      address,
      walletManager,
      authorization: {
        network: BlockchainType.TEZOS,
        payload: result.value.message,
        signature: result.value.signature,
        publicKey:
          (await walletManager.beaconWallet.client.getActiveAccount())
            ?.publicKey || "",
      },
    })
  }

  /**
   * If a beacon session can be found in the storage, then we can assume that the user is still connected
   * to the platform and thus register its wallet to the tezos toolkit
   */
  const connectFromStorage = async (
    beaconWallet: BeaconWallet,
    toolkit: TezosToolkit
  ): PromiseResult<string | false, UserRejectedError> => {
    invariant(beaconWallet, "TezosUserProvider: beaconWallet is not set")
    invariant(toolkit, "TezosUserProvider: tezosToolkit is not set")

    try {
      const pkh = await beaconWallet.getPKH()
      if (pkh) {
        toolkit.setWalletProvider(beaconWallet)

        const walletManager = new TezosWalletManager({
          beaconWallet: beaconWallet,
          tezosToolkit: toolkit,
          rpcNodes: config.rpcNodes,
          address: pkh,
        })
        setContext({
          ...context,
          address: pkh,
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
    await context.beaconWallet?.clearActiveAccount()
    context.tezosToolkit?.setWalletProvider(undefined)
    setContext(context => ({
      ...context,
      address: null,
      walletManager: null,
    }))
  }

  /**
   * Initialize the context with the tezos toolkit and the beacon wallet
   * on mount. The beacon wallet can't be initialized server side as it
   * requires access to the local storage.
   */
  useEffect(() => {
    const toolkit = config.tezosToolkit
    const beacon = config.createBeaconWallet()
    connectFromStorage(beacon, toolkit).then(res => {
      if (res.isFailure()) {
        console.log("connect from storage failed", res.error)
      }
      setContext(context => ({
        ...context,
        tezosToolkit: toolkit,
        beaconWallet: beacon,
        initialized: true,
      }))
    })
  }, [])

  const contextValue = useMemo<TUserTezosWalletContext>(
    () => ({
      ...context,
      connected: !!context.address,
      connect,
      connectAutonomyWallet,
      disconnect,
    }),
    [context, connect, connectAutonomyWallet, disconnect]
  )

  return (
    <TezosUserContext.Provider value={contextValue}>
      {children}
    </TezosUserContext.Provider>
  )
}

export function useTezosUserContext(): TUserTezosWalletContext {
  const context = useContext(TezosUserContext)

  invariant(
    context,
    "Could not find the Fxhash context, ensure your code is wrapped in <TezosUserProvider>"
  )

  return context
}
