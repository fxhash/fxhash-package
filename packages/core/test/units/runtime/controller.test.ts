import { vi, describe, test, expect, beforeEach, afterEach } from "vitest"
import { BlockchainNetwork } from "@fxhash/shared"
import { IRuntimeController, createRuntimeController } from "@/index.js"
import {
  MOCKED_HASH,
  MOCKED_MINTER,
  PARAMS_DEFINITION,
  PROJECT_STATE,
} from "./constants.js"

describe("createRuntimeController", () => {
  let controller: IRuntimeController
  let mockIframe: any
  let windowMessageHandler: ((event: MessageEvent) => void) | undefined

  beforeEach(() => {
    vi.useFakeTimers()
    mockIframe = {
      contentWindow: {
        postMessage: vi.fn(),
        location: { replace: vi.fn() },
      },
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }

    windowMessageHandler = vi.fn()
    vi.stubGlobal("window", {
      addEventListener: vi.fn((event, handler) => {
        if (event === "message") {
          windowMessageHandler = handler
        }
      }),
      removeEventListener: vi.fn(),
    })

    controller = createRuntimeController({
      state: PROJECT_STATE,
      options: {
        connector: {
          getUrl: () => "mocked-url",
        },
      },
    })
    controller.init(mockIframe)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  const simulateIframeLoad = () => {
    const loadHandler = mockIframe.addEventListener.mock.calls.find(
      (call: any) => call[0] === "load"
    )?.[1] as EventListener
    loadHandler?.(new Event("load"))
  }

  test("initializes with correct default values", () => {
    expect(controller.runtime().state()).toMatchObject({
      hash: MOCKED_HASH,
      minter: MOCKED_MINTER,
      iteration: 1,
      chain: BlockchainNetwork.ETHEREUM,
    })
  })

  test("sets up and removes event listeners correctly", () => {
    expect(mockIframe.addEventListener).toHaveBeenCalledWith(
      "load",
      expect.any(Function),
      true
    )
    expect(window.addEventListener).toHaveBeenCalledWith(
      "message",
      expect.any(Function),
      false
    )

    controller.release()
    expect(mockIframe.removeEventListener).toHaveBeenCalledWith(
      "load",
      expect.any(Function),
      true
    )
    expect(window.removeEventListener).toHaveBeenCalledWith(
      "message",
      expect.any(Function),
      false
    )
  })

  test("getUrl returns correct URL", () => {
    expect(controller.getUrl()).toBe("mocked-url")
  })

  test("hardSync updates runtime and syncs iframe", () => {
    simulateIframeLoad()
    const syncSpy = vi.spyOn(controller, "hardSync")
    controller.hardSync()

    expect(syncSpy).toHaveBeenCalled()
    expect(mockIframe.contentWindow.postMessage).toHaveBeenCalledWith(
      "fxhash_getInfo",
      "*"
    )
    expect(mockIframe.contentWindow.postMessage).toHaveBeenCalledWith(
      "fxhash_getFeatures",
      "*"
    )
    expect(mockIframe.contentWindow.postMessage).toHaveBeenCalledWith(
      "fxhash_getParams",
      "*"
    )
    expect(mockIframe.contentWindow.postMessage).toHaveBeenCalledWith(
      "fxhash_getHash",
      "*"
    )
  })

  test("cannot update unknown parameter", () => {
    simulateIframeLoad()
    windowMessageHandler?.(
      new MessageEvent("message", {
        data: {
          id: "fxhash_getParams",
          data: { definitions: PARAMS_DEFINITION, values: {} },
        },
      })
    )
    expect(() =>
      controller.controls().update({ unknown: "value" })
    ).toThrowError()
  })

  test("emits events on runtime changes", () => {
    const mockListener = vi.fn()
    controller.emitter.on("runtime-changed", mockListener)
    controller.runtime().updateState({ iteration: 2 })
    expect(mockListener).toHaveBeenCalled()
  })
})
