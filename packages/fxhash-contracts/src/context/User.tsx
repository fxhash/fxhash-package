import { useLazyQuery } from "@apollo/client"
import { PropsWithChildren, useState, useRef, createContext } from "react"
import { Qu_user } from "@fxhash/gql/queries/user"
import type { TezosWalletManager } from "@/services/Wallet"
import { ConnectedUser } from "@/types/entities/User"
import { useClientEffect } from "@/hooks/useClientEffect"
import { useClientAsyncEffect } from "@/hooks/useClientAsyncEffect"
// import { useUserAlerts } from "hooks/useUserAlerts"

export interface UserContextType {
  autoConnectChecked: boolean
  user: ConnectedUser | null
  walletManager: TezosWalletManager | null
  isLiveMinting: boolean
  connect: (useAutonomy?: boolean) => Promise<void>
  disconnect: () => void
}

const defaultCtx: UserContextType = {
  autoConnectChecked: false,
  user: null,
  isLiveMinting: false,
  walletManager: null,
  connect: () => new Promise(r => r()),
  disconnect: () => {},
}

export const UserContext = createContext<UserContextType>(defaultCtx)

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
      })
    }
  }, [userData])

  // asks the manager for a connection
  const connect = (useAutonomy = false) =>
    new Promise<void>(async (resolve, reject) => {
      const ctx = ctxRef.current

      if (ctx.walletManager) {
        const pkh = useAutonomy
          ? await ctx.walletManager.connectAutonomyWallet()
          : await ctx.walletManager.connect()
        if (pkh) {
          // user is connected, we can update context and request gql api for user data
          const nCtx = { ...ctx, isLiveMinting: useAutonomy }
          nCtx.user = {
            id: pkh,
            authorizations: [],
          }
          setContext(nCtx)
          getUser({
            variables: {
              id: pkh,
            },
          })
          resolve()
        } else {
          reject()
        }
      } else {
        reject()
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

  useClientAsyncEffect(async isMounted => {
    const initCtx: UserContextType = {
      ...defaultCtx,
      connect,
      disconnect,
    }

    // lazy import of the Wallet manager here
    const { TezosWalletManager } = await import("@/services/Wallet")

    // instanciate the manager
    const manager = new TezosWalletManager()
    initCtx.walletManager = manager

    // check if user is already connected
    const pkh = await manager.connectFromStorage()
    if (pkh) {
      initCtx.user = {
        id: pkh,
        authorizations: [],
      }
      getUser({
        variables: {
          id: pkh,
        },
      })
    }

    initCtx.autoConnectChecked = true

    // move data to context
    setContext(initCtx)
  }, [])

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}
