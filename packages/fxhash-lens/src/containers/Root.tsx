import { FxParamsProvider } from "@fxhash/params/Context"
import { MainProvider } from "context/MainContext"
import { ParamsHistoryProvider } from "@fxhash/params/ParamsHistory"
import { PropsWithChildren } from "react"

/**
 * The root component is the first one called by the index. It serves as a
 * wrapper over the App to provide context Providers to the rest of the
 * application so that everything underneath is exposed properly.
 */
type Props = PropsWithChildren<any>
export function Root({ children }: Props) {
  return (
    <FxParamsProvider>
      <ParamsHistoryProvider>
        <MainProvider>{children}</MainProvider>
      </ParamsHistoryProvider>
    </FxParamsProvider>
  )
}
