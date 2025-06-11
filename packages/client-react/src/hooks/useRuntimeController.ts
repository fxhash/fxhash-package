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
  runtime: RuntimeWholeState
  controls: ControlState
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
    // since objects are compared by reference and not by value
    // we explicitly pass the values to the dependency array
    [
      state.cid,
      state.chain,
      state.snippetVersion,
      state.hash,
      state.iteration,
      state.minter,
      state.context,
      state.inputBytes,
      state.definition,
      state.parentHashes,
      options?.autoRefresh,
      options?.connector,
    ]
  )
  const [runtime, setRuntime] = useState<RuntimeWholeState>(() =>
    controller.runtime().whole()
  )
  const [controls, setControls] = useState<ControlState>(() =>
    controller.controls().state()
  )

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
      setControls({ ...state })
    }
    function onRuntimeChange(_runtime: RuntimeWholeState) {
      setRuntime({ ..._runtime })
    }
    controller.emitter.on("runtime-changed", onRuntimeChange)
    controller.emitter.on("controls-changed", onControlsChange)
    return () => {
      controller.emitter.off("runtime-changed", onRuntimeChange)
      controller.emitter.off("controls-changed", onControlsChange)
      controller.release()
    }
  }, [controller])

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
