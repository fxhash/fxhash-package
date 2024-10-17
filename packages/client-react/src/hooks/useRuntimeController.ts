import { RefCallback, useCallback, useEffect, useMemo, useState } from "react"
import {
  ProjectState,
  IRuntimeControllerOptions,
  IRuntimeController,
  createRuntimeController,
  RuntimeWholeState,
  ControlState,
} from "@fxhash/sdk"
import { ControlsChangedEventPayload } from "@fxhash/sdk"

export interface IUseRuntimeControllerReturn {
  controller: IRuntimeController
  runtime?: RuntimeWholeState
  controls?: ControlState
  restart: (iframe: HTMLIFrameElement) => void
  ref: RefCallback<HTMLIFrameElement>
}

export type UseRuntimeController = (params: {
  state: ProjectState
  options?: IRuntimeControllerOptions
}) => IUseRuntimeControllerReturn

export const useRuntimeController: UseRuntimeController = ({
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
    [options]
  )

  const [runtime, setRuntime] = useState<RuntimeWholeState>()
  const [controls, setControls] = useState<ControlState>()

  const ref = useCallback(
    (iframe: HTMLIFrameElement) => {
      if (iframe) {
        if (!controller.initialized()) {
          controller.init(iframe)
        } else {
          controller.restart(iframe)
        }
      }
    },
    [controller]
  )

  useEffect(() => {
    function onControlsChange({ state }: ControlsChangedEventPayload) {
      setControls(state)
    }
    controller.emitter.on("runtime-changed", setRuntime)
    controller.emitter.on("controls-changed", onControlsChange)

    return () => {
      controller.emitter.off("runtime-changed", setRuntime)
      controller.emitter.off("controls-changed", onControlsChange)
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
    ref,
  }
}
