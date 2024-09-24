import {
  cleanup,
  invariant,
  mockBlockchainAddress,
  mockTransactionHash,
} from "@fxhash/utils"
import { runtimeContext } from "./context.js"
import { iframeConnector } from "./connectors.js"
import { ProjectState, RuntimeConnector } from "./_types.js"
import { FxParamsData, buildParamsObject } from "@fxhash/params"
import {
  IRuntimeContext,
  IRuntimeController,
  RuntimeControllerEventEmitter,
  IRuntimeControls,
} from "./_interfaces.js"
import { runtimeControls } from "./controls.js"
import { debounce } from "lodash"

/*
 * This function is used to handle old snippet events
 */

function handleOldSnippetEvents(e: any, runtime: IRuntimeContext) {
  if (!e.data || !e.data.id) return

  switch (e.data.id) {
    case "fxhash_getHash":
      if (e.data.data) {
        runtime.state.update({ hash: e.data.data })
      }
      break

    case "fxhash_getFeatures":
      runtime.definition.update({ features: e.data.data || null })
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
const DEFAULT_RUNTIME_OPTIONS = {
  autoRefresh: false,
  connector: iframeConnector,
}

export interface IRuntimeControllerOptions {
  autoRefresh?: boolean
  connector?: RuntimeConnector
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

  const { options, state } = params
  const runtimeOptions = { ...DEFAULT_RUNTIME_OPTIONS, ...options }
  const emitter = new RuntimeControllerEventEmitter()

  let _iframe: HTMLIFrameElement
  let _controls = runtimeControls()

  let _runtime = runtimeContext({
    state: {
      hash: state.hash || mockTransactionHash(state.chain),
      minter: state.minter || mockBlockchainAddress(state.chain),
      iteration: state.iteration || 1,
      context: state.context,
      chain: state.chain,
    },
    definition: {
      version: state.snippetVersion,
    },
  })

  _runtime.emitter.on("context-changed", _handleContextChange)

  function _handleContextChange(runtime: IRuntimeContext) {
    // If definition or state hash changed, sync the iframe
    if (runtime.details.stateHash.hard !== _runtime.details.stateHash.hard) {
      syncIframe(runtime)
    }
    if (
      runtime.details.definitionHash.params !==
      _runtime.details.definitionHash.params
    ) {
      _controls.update(
        runtime.definition.params
          ? buildParamsObject(runtime.definition.params, runtime.state.params)
          : {},
        runtime.definition.params
      )
    }
    _runtime = runtime
    emitter.emit("runtime-changed", _runtime)
  }

  _controls.emitter.on("controls-changed", _handleControlsChange)

  function _handleControlsChange(controls: IRuntimeControls) {
    _controls = controls
    emitter.emit("controls-changed", controls)
  }

  const _updateParamsDebounced = debounce(_runtime.state.update, 200)

  function softUpdateParams(params: FxParamsData) {
    invariant(_controls.state.params.definition, "definition is required")
    _updateParamsDebounced({ params })
    // TODO: refactor message event handling
    _iframe.contentWindow?.postMessage(
      { id: "fxhash_params:update", data: { params } },
      "*"
    )
  }

  function updateControls(update: Partial<FxParamsData>, forceRefresh = false) {
    // make sure definition exists and check if the key
    // of the update have a corresponding definition
    invariant(
      _controls.state.params.definition !== null,
      "Definition is required"
    )
    invariant(
      Object.keys(update).every(id =>
        _controls.state.params.definition?.find(d => d.id === id)
      ),
      "Unknown parameter"
    )
    // find the params which have changed and are "synced"
    const changed = Object.keys(update)
      .filter(id => _controls.state.params.values[id] !== update[id])
      .map(id => _controls.state.params.definition?.find(d => d.id === id))
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
      _runtime.state.update({ params: update })
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

  function getConnector() {
    return runtimeOptions.connector()
  }

  function getUrl(runtime: IRuntimeContext) {
    return getConnector().getUrl({
      cid: state.cid,
      hash: runtime.state.hash,
      minter: runtime.state.minter,
      iteration: runtime.state.iteration,
      inputBytes: runtime.details.params.inputBytes || state.inputBytes,
      context: runtime.state.context,
      snippetVersion: runtime.definition.version || "",
      chain: runtime.state.chain,
    })
  }

  function syncIframe(runtime: IRuntimeContext) {
    invariant(_iframe, "_iframe is required")
    getConnector().useSync(_iframe, getUrl(runtime))
  }

  function _init(iframe: HTMLIFrameElement) {
    invariant(iframe, "iframe is required")
    _iframe = iframe
    _registerWindowMessageListeners()
    _registerIframeOnLoadListener()
    syncIframe(_runtime)
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
      _runtime.state.update({
        hash: state.hash || mockTransactionHash(state.chain),
        minter: state.minter || mockBlockchainAddress(state.chain),
        iteration: state.iteration || 1,
        context: state.context,
        chain: state.chain,
      })
    },
    get runtime() {
      return _runtime
    },
    get controls() {
      return _controls
    },
    getUrl: () => getUrl(_runtime),
    hardSync: () => {
      _runtime.update({
        state: {
          params: _controls.state.params.values,
        },
      })
      syncIframe(_runtime)
    },
    updateControls,
    emitter,
  }
}
