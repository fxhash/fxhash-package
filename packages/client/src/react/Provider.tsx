"use client"
// @ts-ignore - unused
import React, { PropsWithChildren, createContext, useRef } from "react"
import { FxhashClient } from "../client/index.js"

export const FxhashClientContext = createContext<{
  fxhashClient: FxhashClient
}>({
  fxhashClient: new FxhashClient(),
})

export function FxhashClientProvider(props: PropsWithChildren) {
  const fxhashClient = useRef<FxhashClient>(new FxhashClient())

  return (
    <FxhashClientContext.Provider
      value={{ fxhashClient: fxhashClient.current }}
    >
      {props.children}
    </FxhashClientContext.Provider>
  )
}
