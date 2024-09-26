import { RefObject, useEffect, useMemo, useState } from "react"
import {
  ProjectState,
  IRuntimeControllerOptions,
  IRuntimeController,
  createRuntimeController,
  RuntimeWholeState,
  ControlState,
} from "@fxhash/sdk"

type UseRuntimeController = (params: {
  iframeRef: RefObject<HTMLIFrameElement>
  state: ProjectState
  options?: IRuntimeControllerOptions
}) => {
  controller: IRuntimeController
  runtime?: RuntimeWholeState
  controls?: ControlState
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
  const [runtime, setRuntime] = useState<RuntimeWholeState>()
  const [controls, setControls] = useState<ControlState>()

  useEffect(() => {
    if (!iframeRef.current) return
    controller.emitter.on("runtime-changed", setRuntime)
    controller.emitter.on("controls-changed", setControls)
    controller.init(iframeRef.current)

    setRuntime(controller.runtime().whole())
    setControls(controller.controls().state())

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
