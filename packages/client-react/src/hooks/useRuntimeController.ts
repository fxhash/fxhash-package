import { RefObject, useEffect, useRef, useState } from "react"
import {
  ProjectState,
  RuntimeControllerOptions,
  RuntimeContext,
  ControlState,
  RuntimeController,
  createRuntimeController,
} from "@fxhash/sdk"

type UseRuntimeController = (params: {
  iframeRef: RefObject<HTMLIFrameElement>
  state: ProjectState
  options?: Omit<RuntimeControllerOptions, "onChange">
}) => {
  runtime?: RuntimeContext
  controls?: ControlState
  hardSync: () => void
  updateControls: (
    update: Partial<Record<string, any>>,
    forceRefresh?: boolean
  ) => void
}

export const useRuntimeController: UseRuntimeController = ({
  iframeRef,
  state,
  options,
}) => {
  const _controller = useRef<RuntimeController>()
  const [runtime, setRuntime] = useState<RuntimeContext>()
  const [controls, setControls] = useState<ControlState>()

  useEffect(() => {
    if (!iframeRef.current) return
    const controller = createRuntimeController({
      iframe: iframeRef.current,
      state,
      options: {
        ...options,
      },
    })
    controller.emitter.on("runtime-changed", setRuntime)
    controller.emitter.on("controls-changed", setControls)
    controller.init()
    _controller.current = controller

    setRuntime(controller.runtime)
    return () => {
      controller.release()
      _controller.current = undefined
    }
  }, [])

  return {
    runtime,
    controls,
    hardSync: () => _controller.current?.hardSync(),
    updateControls: (update, forceRefresh = false) =>
      _controller.current?.updateControls(update, forceRefresh),
  }
}
