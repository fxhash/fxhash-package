"use client"
// @ts-ignore - unused
import React, { PropsWithChildren, createContext, useRef } from "react"
import { FxhashClient } from "../../client/index.js"

export interface ClientContext {
  client: FxhashClient
}

export const ClientContext = createContext<ClientContext>({
  client: new FxhashClient(),
})

export function ClientProvider(props: PropsWithChildren) {
  const client = useRef<FxhashClient>(new FxhashClient())

  return (
    <ClientContext.Provider value={{ client: client.current }}>
      {props.children}
    </ClientContext.Provider>
  )
}
