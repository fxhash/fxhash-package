import { useLazyQuery } from "@apollo/client"
import { PropsWithChildren, useState, useRef, createContext } from "react"
import { Qu_user } from "@fxhash/gql/queries/user"
import { WalletManager } from "../services/Wallet"
import { ConnectedUser } from "types/entities/User"
import { useClientEffect } from "hooks/useClientEffect"
import { Address, createWalletClient, custom } from "viem"
import { mainnet, hardhat } from "viem/chains"

export interface UserContextType {
  autoConnectChecked: boolean
  user: ConnectedUser | null
  userFetched: boolean
  walletManager: WalletManager | null
  isLiveMinting: boolean
  connect: (useAutonomy?: boolean) => Promise<void>
  disconnect: () => void
}

const defaultCtx: UserContextType = {
  autoConnectChecked: false,
  user: null,
  userFetched: false,
  isLiveMinting: false,
  walletManager: null,
  connect: () => new Promise((r) => r()),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect: () => {},
}

export const UserContext = createContext<UserContextType>(defaultCtx)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/ban-types
export function UserProvider({ children }: PropsWithChildren<{}>) {
  const [context, setContext] = useState<UserContextType>(defaultCtx)

  // keep a reference to the context to be used in functions
  const ctxRef = useRef<UserContextType>(context)

  // useUserAlerts(context.user)

  const [getUser, { data: userData }] = useLazyQuery(Qu_user, {
    fetchPolicy: "no-cache",
  })

  // keep ctxRef in-sync with the context state
  useClientEffect(() => {
    ctxRef.current = context
  }, [context])

  // keep user in context in-sync with the user data from query
  useClientEffect(() => {
    if (userData && userData.user) {
      setContext({
        ...context,
        user: userData.user,
        userFetched: true,
      })
    }
  }, [userData])

  // asks the manager for a connection
  const connect = () =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise<void>(async (resolve, reject) => {
      const ctx = ctxRef.current

      if (ctx.walletManager) {
        const [account] = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        })
        ctx.walletManager.walletClient.account = account
        const address = await ctx.walletManager.connect()
        console.log("logged in with address:", address)
        if (address) {
          // user is connected, we can update context and request gql api for user data
          //TODO: tbd how to handle that for ethereum
          const nCtx = { ...ctx, isLiveMinting: false }
          nCtx.user = {
            id: address,
            authorizations: [],
          }
          setContext(nCtx)
          getUser({
            variables: {
              id: address,
            },
          })
          resolve()
        } else {
          reject()
        }
      }
    })

  // asks the manager for a disconnect & clears the context
  const disconnect = async () => {
    const ctx = ctxRef.current
    if (ctx.walletManager) {
      await ctx.walletManager.disconnect()
      setContext({ ...ctx, user: null, isLiveMinting: false })
    }
  }

  useClientEffect(() => {
    console.log("🚧 Initializing walletManager in UserProvider...")
    const initCtx: UserContextType = {
      ...defaultCtx,
      connect,
      disconnect,
    }

    // instanciate the manager
    const client = createWalletClient({
      chain: hardhat,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion
      transport: custom((window as any).ethereum!),
    })
    const manager = new WalletManager(client)
    initCtx.walletManager = manager

    // check if user is already connected
    const currentAccount = manager.walletClient.account
    if (currentAccount) {
      initCtx.user = {
        id: currentAccount.address,
        authorizations: [],
      }
      getUser({
        variables: {
          id: currentAccount.address,
        },
      })
    }

    initCtx.autoConnectChecked = true

    // move data to context
    setContext(initCtx)
  }, [])

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}
