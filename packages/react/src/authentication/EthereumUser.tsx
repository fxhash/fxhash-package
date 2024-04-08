import "viem/window"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import {
  useAccount,
  useDisconnect,
  usePublicClient,
  useWalletClient,
} from "wagmi"
import { EthereumWalletManager } from "@fxhash/eth"
import {
  BlockchainType,
  PendingSigningRequestError,
  PromiseResult,
  UserRejectedError,
  invariant,
  success,
} from "@fxhash/shared"
import { useModal } from "connectkit"
import { Subject } from "rxjs"
import { first } from "rxjs/operators"
import { formatSignInPayload } from "./useSignMessage"
import {
  IConnexionPayload,
  TUserWalletContext,
} from "../types/UserWalletContext"
import { useEthersSigner } from "./SignerWagmi"

export interface TUserEthereumWalletContext extends TUserWalletContext {
  walletManager: EthereumWalletManager | null
  address: `0x${string}` | null
  signConnectionMessage: () => ReturnType<TUserWalletContext["connect"]>
}

const defaultCtx: TUserEthereumWalletContext = {
  walletManager: null,
  initialized: false,
  connected: false,
  address: null,
  signConnectionMessage: () => new Promise(r => r(success({} as any))),
  connect: () => new Promise(r => r(success({} as any))),
  disconnect: () => new Promise(r => {}),
}

const EthereumUserContext =
  createContext<TUserEthereumWalletContext>(defaultCtx)

export interface EthereumUserProviderConfig {
  rpcNodes: string[]
}

interface EthereumUserProviderProps {
  children: React.ReactNode
  config: EthereumUserProviderConfig
}

interface SyncEvent {
  address: string
  walletManager: EthereumWalletManager
}

/**
 * Responsible for handling the Ethereum connection and initializing the wallet
 * manager
 */
export function EthereumUserProvider({
  config,
  children,
}: EthereumUserProviderProps) {
  const [context, setContext] = useState<TUserEthereumWalletContext>(defaultCtx)
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()
  const signer = useEthersSigner()
  const accountState = useAccount()
  const { setOpen: setConnectkitOpen } = useModal()
  const { disconnectAsync } = useDisconnect()

  const [syncObservable] = useState(new Subject<SyncEvent>())

  // whenever a local sync event occurs, event is pushed to the observable so
  // that other parts of the app can react to it in a synchronous-like manner
  useEffect(() => {
    if (accountState.address && context.walletManager) {
      syncObservable.next({
        address: accountState.address,
        walletManager: context.walletManager,
      })
    }
  }, [accountState.address])

  useEffect(() => {
    if (walletClient && signer) {
      const account = walletClient.account
      if (!account) return

      invariant(publicClient, "Public client not available")

      const walletManager = new EthereumWalletManager({
        walletClient,
        publicClient,
        rpcNodes: config.rpcNodes,
        address: account.address,
        signer,
      })
      setContext(context => ({
        ...context,
        walletManager,
        initialized: true,
      }))
      syncObservable.next({
        address: account.address,
        walletManager,
      })
    } else {
      setContext(context => ({
        ...context,
        walletManager: null,
        initialized: !!(context.initialized || walletClient),
      }))
    }
  }, [walletClient, signer])

  const signConnectionMessage = async (): PromiseResult<
    IConnexionPayload,
    UserRejectedError | PendingSigningRequestError
  > => {
    invariant(context.walletManager, "ETH wallet manager not available")
    let message = formatSignInPayload(accountState.address!)
    const result = await context.walletManager.signMessage(message, {
      type: "authentication-payload",
      policy: "cache-first",
    })
    if (result.isFailure()) {
      await disconnectAsync()
      return result
    }
    return success({
      address: accountState.address!,
      walletManager: context.walletManager,
      authorization: {
        network: BlockchainType.ETHEREUM,
        payload: result.value.message,
        signature: result.value.signature,
      },
    })
  }

  const connect = (): PromiseResult<
    IConnexionPayload,
    UserRejectedError | PendingSigningRequestError
  > => {
    return new Promise(resolve => {
      if (!accountState.address) {
        syncObservable
          .pipe(first())
          .subscribe(async ({ address, walletManager }) => {
            invariant(walletManager, "ETH wallet manager not available")
            let message = formatSignInPayload(address)
            const result = await walletManager.signMessage(message, {
              type: "authentication-payload",
              policy: "cache-first",
            })
            if (result.isFailure()) {
              await disconnectAsync()
              return resolve(result)
            }
            resolve(
              success({
                address: address,
                walletManager: walletManager,
                authorization: {
                  network: BlockchainType.ETHEREUM,
                  payload: result.value.message,
                  signature: result.value.signature,
                },
              })
            )
          })
        setConnectkitOpen(true)
      }
    })
  }

  const contextValue = useMemo<TUserEthereumWalletContext>(
    () => ({
      ...context,
      connect,
      signConnectionMessage,
      disconnect: disconnectAsync,
      get address() {
        return accountState.address || null
      },
      get connected() {
        return accountState.isConnected
      },
    }),
    [context, accountState]
  )

  // todo: expose errors & UI interactions here

  return (
    <EthereumUserContext.Provider value={contextValue}>
      {children}
    </EthereumUserContext.Provider>
  )
}

export function useEthereumUserContext(): TUserEthereumWalletContext {
  const context = useContext(EthereumUserContext)

  invariant(
    context,
    "Could not find the Fxhash context, ensure your code is wrapped in <EthereumUserProvider>"
  )

  return context
}
