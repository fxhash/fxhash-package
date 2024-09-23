import { RefObject, useEffect, useMemo, useState } from "react"
import {
  ProjectState,
  IRuntimeControllerOptions,
  IRuntimeContext,
  IRuntimeController,
  createRuntimeController,
  IRuntimeControls,
} from "@fxhash/sdk"

type UseRuntimeController = (params: {
  iframeRef: RefObject<HTMLIFrameElement>
  state: ProjectState
  options?: IRuntimeControllerOptions
}) => {
  controller: IRuntimeController
  runtime?: IRuntimeContext
  controls?: IRuntimeControls
  restart: (iframe: HTMLIFrameElement) => void
}

export const useRuntimeController: UseRuntimeController = ({
  iframeRef,
  state,
  options,
}) => {
  const controller = useMemo<IRuntimeController>(
    () =>
      createRuntimeController({
        state,
        options: {
          ...options,
        },
      }),
    []
  )
  const [runtime, setRuntime] = useState<IRuntimeContext>()
  const [controls, setControls] = useState<IRuntimeControls>()

  useEffect(() => {
    if (!iframeRef.current) return
    controller.emitter.on("runtime-changed", setRuntime)
    controller.emitter.on("controls-changed", setControls)
    controller.init(iframeRef.current)

    setRuntime(controller.runtime)
    setControls(controller.controls)

    return () => {
      controller.emitter.off("runtime-changed", setRuntime)
      controller.emitter.off("controls-changed", setControls)
      controller.release()
    }
  }, [])

  return {
    controller,
    runtime,
    controls,
    restart: (iframe: HTMLIFrameElement) => {
      controller.restart(iframe)
    },
  }
}
