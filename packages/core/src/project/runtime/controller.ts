import {
  cleanup,
  invariant,
  mockBlockchainAddress,
  mockTransactionHash,
} from "@fxhash/utils"
import { runtimeContext } from "./context.js"
import { proxyConnector } from "./connectors.js"
import { ControlState, ProjectState, RuntimeWholeState } from "./_types.js"
import { FxParamsData, buildParamsObject } from "@fxhash/params"
import {
  IRuntimeContext,
  IRuntimeController,
  RuntimeControllerEventEmitter,
  RuntimeConnector,
} from "./_interfaces.js"
import { runtimeControls } from "./controls.js"
import debounce from "lodash.debounce"

/**
 * This function is used to handle old snippet events for projects
 * that use < v3.3.0 of the @fxhash/project-sdk
 */

function handleOldSnippetEvents(e: any, runtime: IRuntimeContext) {
  if (!e.data || !e.data.id) return

  switch (e.data.id) {
    case "fxhash_getHash":
      if (e.data.data) {
        runtime.updateState({ hash: e.data.data })
      }
      break

    case "fxhash_getFeatures":
      runtime.updateDefinition({ features: e.data.data || null })
      break

    case "fxhash_getParams":
      if (e.data.data?.definitions) {
        runtime.update({
          state: { params: e.data.data.values },
          definition: { params: e.data.data.definitions },
        })
      } else {
        runtime.update({
          state: { params: {} },
          definition: { params: null },
        })
      }
      break
  }
}

export interface IRuntimeControllerOptions {
  autoRefresh?: boolean
  connector?: RuntimeConnector
}

const DEFAULT_RUNTIME_OPTIONS: IRuntimeControllerOptions = {
  autoRefresh: false,
  connector: proxyConnector,
}

export interface IRuntimeControllerParams {
  state: ProjectState
  options?: IRuntimeControllerOptions
}

/**
 * The runtime controller is the main controller for the runtime.
 * It holds the state of the runtime and the controls and keeps
 * iframe in sync with the state.
 * @param params - initial state of the runtime and options
 * @returns RuntimeController - Which exposes the runtime, controls, init,
 * release, getUrl, hardSync, updateControls and an event emitter
 */
export function createRuntimeController(
  params: IRuntimeControllerParams
): IRuntimeController {
  const clean = cleanup()
  const options = params.options
  const _initial = params.state

  const runtimeOptions = { ...DEFAULT_RUNTIME_OPTIONS, ...options }
  const emitter = new RuntimeControllerEventEmitter()
  const _connector = runtimeOptions.connector

  const _controls = runtimeControls()
  const _runtime = runtimeContext({
    state: {
      hash: _initial.hash || mockTransactionHash(_initial.chain),
      minter: _initial.minter || mockBlockchainAddress(_initial.chain),
      iteration: _initial.iteration || 1,
      context: _initial.context,
      chain: _initial.chain,
    },
    definition: {
      version: _initial.snippetVersion,
    },
  })

  let _iframe: HTMLIFrameElement | null = null

  let _prevRuntime: RuntimeWholeState | null = null
  _runtime.emitter.on("context-changed", _handleContextChange)
  function _handleContextChange(runtime: RuntimeWholeState) {
    // If definition or state hash changed, sync the iframe
    if (
      runtime.details.stateHash.hard !== _prevRuntime?.details.stateHash.hard
    ) {
      _syncIframe()
    }
    if (
      runtime.details.definitionHash.params !==
      _prevRuntime?.details.definitionHash.params
    ) {
      _controls.update(
        runtime.definition.params
          ? buildParamsObject(runtime.definition.params, runtime.state.params)
          : {},
        runtime.definition.params
      )
    }
    emitter.emit("runtime-changed", runtime)
    _prevRuntime = { ...runtime }
  }

  _controls.emitter.on("controls-changed", _handleControlsChange)
  function _handleControlsChange(controls: ControlState) {
    emitter.emit("controls-changed", controls)
  }

  const _updateParamsDebounced = debounce(_runtime.updateState, 200)

  function softUpdateParams(params: FxParamsData) {
    invariant(_iframe, "_iframe is required")
    _updateParamsDebounced({ params })
    // TODO: refactor message event handling
    _iframe.contentWindow?.postMessage(
      { id: "fxhash_params:update", data: { params } },
      "*"
    )
  }

  function updateControls(update: Partial<FxParamsData>, forceRefresh = false) {
    const controlsState = _controls.state()
    // make sure definition exists and check if the key
    // of the update have a corresponding definition
    invariant(
      controlsState.params.definition !== null,
      "Definition is required"
    )
    invariant(
      Object.keys(update).every(id =>
        controlsState.params.definition?.find(d => d.id === id)
      ),
      "Unknown parameter"
    )
    // find the params which have changed and are "synced"
    const changed = Object.keys(update)
      .filter(id => controlsState.params.values[id] !== update[id])
      .map(id => controlsState.params.definition?.find(d => d.id === id))
    // when there are no changes we don't need to do anything
    // e.g. when artworks call emit in a draw loop this should
    // catch too many updates that are actually not needed
    if (changed.length === 0) return
    // params that are "synced"
    const synced = changed.filter(
      (def): def is NonNullable<typeof def> => def?.update === "sync"
    )
    // if at least a change, soft refresh
    if (Object.keys(synced).length > 0) {
      softUpdateParams(
        Object.fromEntries(synced.map(def => [def.id, update[def.id]]))
      )
    }
    if (!forceRefresh) {
      // if auto-refresh is defined, we update params on the runtime (will only)
      // reload the hard params
      if (options?.autoRefresh) {
        _updateParamsDebounced({
          params: update,
        })
      }
    } else {
      _runtime.updateState({ params: update })
    }
    // in any case, refresh the control state
    _controls.update(update)
  }

  function onMessage(e: MessageEvent) {
    // TODO: refactor message event handling
    if (e.data.id === "fxhash_getInfo") {
      const {
        version,
        params: { definitions, values },
        minter,
        features,
        hash,
      } = e.data.data
      _runtime.update({
        state: { hash, minter, params: values },
        definition: { params: definitions, features, version },
      })
    }
    // TODO: refactor message event handling
    if (e.data.id === "fxhash_emit:params:update") {
      const { params } = e.data.data
      updateControls(params)
    }
    // handle deprecated events from old snippet
    handleOldSnippetEvents(e, _runtime)
  }

  function _registerWindowMessageListeners() {
    invariant(window, "window is required")
    window.addEventListener("message", onMessage, false)
    clean.add(() => window.removeEventListener("message", onMessage, false))
  }

  function onIframeLoad() {
    invariant(_iframe, "_iframe is required")
    // TODO: refactor message event handling
    _iframe.contentWindow?.postMessage("fxhash_getInfo", "*")
    _iframe.contentWindow?.postMessage("fxhash_getFeatures", "*")
    _iframe.contentWindow?.postMessage("fxhash_getParams", "*")
    _iframe.contentWindow?.postMessage("fxhash_getHash", "*")
  }

  function _registerIframeOnLoadListener() {
    invariant(_iframe, "_iframe is required")
    _iframe.addEventListener("load", onIframeLoad, true)
    clean.add(() => _iframe?.removeEventListener("load", onIframeLoad, true))
  }

  function getUrl(runtime: IRuntimeContext) {
    invariant(_connector, "_connector is required")
    const runtimeState = runtime.state()
    const runtimeDefinition = runtime.definition()
    const runtimeDetails = runtime.details()
    return _connector.getUrl({
      cid: _initial.cid,
      hash: runtimeState.hash,
      minter: runtimeState.minter,
      iteration: runtimeState.iteration,
      inputBytes: runtimeDetails.params.inputBytes || _initial.inputBytes,
      context: runtimeState.context,
      snippetVersion: runtimeDefinition.version || "",
      chain: runtimeState.chain,
    })
  }

  function _syncIframe() {
    invariant(_iframe, "_iframe is required")
    _iframe.contentWindow?.location.replace(getUrl(_runtime))
  }

  function _init(iframe: HTMLIFrameElement) {
    invariant(iframe, "iframe is required")
    _iframe = iframe
    _registerWindowMessageListeners()
    _registerIframeOnLoadListener()
    _syncIframe()
  }

  return {
    init: (iframe: HTMLIFrameElement) => {
      _init(iframe)
    },
    release: () => {
      clean.clear()
    },
    restart: (iframe: HTMLIFrameElement) => {
      clean.clear()
      _init(iframe)
      _runtime.updateState({
        hash: _initial.hash || mockTransactionHash(_initial.chain),
        minter: _initial.minter || mockBlockchainAddress(_initial.chain),
        iteration: _initial.iteration || 1,
        context: _initial.context,
        chain: _initial.chain,
      })
    },
    runtime: () => _runtime,
    controls: () => _controls,
    getUrl: () => getUrl(_runtime),
    hardSync: () => {
      _runtime.update({
        state: {
          params: _controls.state().params.values,
        },
      })
      _syncIframe()
    },
    updateControls,
    emitter,
  }
}
