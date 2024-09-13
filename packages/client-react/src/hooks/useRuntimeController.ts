import { RefObject, useEffect, useMemo, useState } from "react"
import {
  ProjectState,
  RuntimeControllerOptions,
  RuntimeContext,
  RuntimeController,
  createRuntimeController,
  RuntimeControls,
} from "@fxhash/sdk"

type UseRuntimeController = (params: {
  iframeRef: RefObject<HTMLIFrameElement>
  state: ProjectState
  options?: RuntimeControllerOptions
}) => {
  controller: RuntimeController
  runtime?: RuntimeContext
  controls?: RuntimeControls
}

export const useRuntimeController: UseRuntimeController = ({
  iframeRef,
  state,
  options,
}) => {
  const controller = useMemo(
    () =>
      createRuntimeController({
        state,
        options: {
          ...options,
        },
      }),
    []
  )
  const [runtime, setRuntime] = useState<RuntimeContext>()
  const [controls, setControls] = useState<RuntimeControls>()

  useEffect(() => {
    if (!iframeRef.current) return
    controller.emitter.on("runtime-changed", setRuntime)
    controller.emitter.on("controls-changed", setControls)
    controller.init(iframeRef.current)

    setRuntime(controller.runtime)
    setControls(controller.controls)
    return () => {
      controller.release()
    }
  }, [])

  return {
    controller,
    runtime,
    controls,
  }
}
