import "viem/window"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useAccount, useDisconnect, useWalletClient } from "wagmi"
import { PublicClient } from "viem"
import { EthereumWalletManager } from "@fxhash/eth-sdk"
import {
  BlockchainType,
  PendingSigningRequestError,
  PromiseResult,
  UserRejectedError,
  invariant,
  success,
} from "@fxhash/contracts-shared"
import { useModal } from "connectkit"
import { Subject } from "rxjs"
import { first } from "rxjs/operators"
import { formatSignInPayload } from "./useSignMessage"
import {
  IConnexionPayload,
  TUserWalletContext,
} from "../types/UserWalletContext"

interface TUserEthereumWalletContext extends TUserWalletContext {
  walletManager: EthereumWalletManager | null
  address: `0x${string}` | null
}

const defaultCtx: TUserEthereumWalletContext = {
  walletManager: null,
  initialized: false,
  connected: false,
  address: null,
  connect: () => new Promise(r => r(success({} as any))),
  disconnect: () => {},
}

const EthereumUserContext =
  createContext<TUserEthereumWalletContext>(defaultCtx)

export interface EthereumUserProviderConfig {
  publicClient: PublicClient
  rpcNodes: string[]
}

interface EthereumUserProviderProps {
  children: React.ReactNode
  config: EthereumUserProviderConfig
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
  const { data: walletClient, isIdle } = useWalletClient()
  const accountState = useAccount()
  const { setOpen: setConnectkitOpen } = useModal()
  const { disconnectAsync } = useDisconnect()

  const [syncObservable] = useState(
    new Subject<{ address: string; walletManager: EthereumWalletManager }>()
  )

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
    if (window.ethereum && walletClient) {
      const account = walletClient.account
      if (!account) return

      const walletManager = new EthereumWalletManager({
        walletClient: walletClient,
        publicClient: config.publicClient,
        rpcNodes: config.rpcNodes,
        address: account.address,
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
        initialized: !!(context.initialized || walletClient || isIdle),
      }))
    }
  }, [walletClient, isIdle])

  const disconnect = () => {
    disconnectAsync()
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
            const result = await walletManager.signMessage(message)
            if (result.isFailure()) {
              disconnect()
              return resolve(result)
            }
            resolve(
              success({
                address: address,
                authorization: {
                  network: BlockchainType.ETHEREUM,
                  payload: message,
                  signature: result.value,
                },
              })
            )
          })
      }
      setConnectkitOpen(true)
    })
  }

  const contextValue = useMemo<TUserEthereumWalletContext>(
    () => ({
      ...context,
      connect,
      disconnect,
      get address() {
        return accountState.address || null
      },
      get connected() {
        return accountState.isConnected
      },
    }),
    [context, accountState]
  )

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
