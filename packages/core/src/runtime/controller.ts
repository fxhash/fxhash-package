import {
  Result,
  failure,
  invariant,
  mockBlockchainAddress,
  mockTransactionHash,
  success,
} from "@fxhash/utils"
import { runtimeContext } from "./context.js"
import { BlockchainNetwork, BlockchainType } from "@fxhash/shared"
import { iframeConnector } from "./connectors.js"
import { ProjectState, RuntimeConnector } from "./_types.js"
import { FxParamsData, buildParamsObject } from "@fxhash/params"
import {
  RuntimeContext,
  RuntimeController,
  RuntimeControllerEventEmitter,
  RuntimeControls,
} from "./_interfaces.js"
import { runtimeControls } from "./controls.js"
import { debounce } from "lodash"

/*
 * This function is used to handle old snippet events
 */

function handleOldSnippetEvents(e: any, runtime: RuntimeContext) {
  if (e.data) {
    if (e.data.id === "fxhash_getHash") {
      if (e.data.data) {
        runtime.state.update({ hash: e.data.data })
      }
    }
    if (e.data.id === "fxhash_getFeatures") {
      if (e.data.data) {
        runtime.definition.update({ features: e.data.data })
      } else {
        runtime.definition.update({ features: null })
      }
    }
    if (e.data.id === "fxhash_getParams") {
      if (e.data.data) {
        const { definitions, values } = e.data.data
        if (definitions) {
          runtime.update({
            state: {
              params: values,
            },
            definition: {
              params: definitions,
            },
          })
        }
      } else {
        runtime.update({
          state: {
            params: {},
          },
          definition: {
            params: null,
          },
        })
      }
    }
  }
}

const DEFAULT_RUNTIME_OPTIONS = {
  autoRefresh: false,
  connector: iframeConnector,
  chain: BlockchainNetwork.ETHEREUM,
}

export interface RuntimeControllerOptions {
  autoRefresh?: boolean
  connector?: RuntimeConnector
  chain?: BlockchainType
}

export interface RuntimeControllerParams {
  state: ProjectState
  options?: RuntimeControllerOptions
}

/**
 * The runtime controller is the main controller for the runtime.
 * It holds the state of the runtime and the controls.
 * @param params - initial state of the runtime and options
 * @returns RuntimeController - Which exposes the runtime, controls, init, release, getUrl, hardSync, updateControls and an event emitter
 */

export function createRuntimeController(
  params: RuntimeControllerParams
): RuntimeController {
  const { options, state } = params
  const runtimeOptions = { ...DEFAULT_RUNTIME_OPTIONS, ...options }
  const emitter = new RuntimeControllerEventEmitter()

  let _iframe: HTMLIFrameElement
  let _controls = runtimeControls()
  let _runtime = runtimeContext({
    state: {
      hash: state.hash || mockTransactionHash(runtimeOptions.chain),
      minter: state.minter || mockBlockchainAddress(runtimeOptions.chain),
      iteration: state.iteration || 1,
      context: state.context,
      chain: state.chain,
    },
    definition: {
      version: state.snippetVersion,
    },
  })

  _runtime.emitter.on("context-changed", runtime => {
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
  })

  _controls.emitter.on("controls-changed", (controls: RuntimeControls) => {
    _controls = controls
    emitter.emit("controls-changed", controls)
  })

  const _updateParamsDebounced = debounce(_runtime.state.update, 200)

  function softUpdateParams(params: FxParamsData) {
    invariant(_controls.state.params.definition, "definition is required")
    _updateParamsDebounced({ params })
    // TODO: make enum for events
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
    // TODO: make enum for events
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
    // TODO: make enum for events
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
    return () => window.removeEventListener("message", onMessage, false)
  }

  function onIframeLoad() {
    invariant(_iframe, "_iframe is required")
    _iframe.contentWindow?.postMessage("fxhash_getInfo", "*")
    _iframe.contentWindow?.postMessage("fxhash_getFeatures", "*")
    _iframe.contentWindow?.postMessage("fxhash_getParams", "*")
    _iframe.contentWindow?.postMessage("fxhash_getHash", "*")
  }

  function _registerIframeOnLoadListener() {
    invariant(_iframe, "_iframe is required")
    _iframe.addEventListener("load", onIframeLoad, true)
    return () => _iframe?.removeEventListener("load", onIframeLoad, true)
  }

  function getConnector() {
    invariant(_iframe, "_iframe is required")
    return runtimeOptions.connector(_iframe)
  }

  function getUrl(runtime: RuntimeContext) {
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

  function syncIframe(runtime: RuntimeContext) {
    getConnector().useSync(getUrl(runtime))
  }

  return {
    init: (iframe: HTMLIFrameElement) => {
      invariant(iframe, "iframe is required")
      _iframe = iframe
      _registerWindowMessageListeners()
      _registerIframeOnLoadListener()
      syncIframe(_runtime)
    },
    release: () => {
      invariant(_iframe, "_iframe is required")
      _iframe.removeEventListener("load", onIframeLoad, true)
      window.removeEventListener("message", onMessage, false)
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
