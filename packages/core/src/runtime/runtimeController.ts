import {
  invariant,
  mockBlockchainAddress,
  mockTransactionHash,
} from "@fxhash/utils"
import { runtime } from "./runtime.js"
import { BlockchainNetwork, BlockchainType } from "@fxhash/shared"
import { iframeConnector } from "./connectors.js"
import {
  ControlState,
  ProjectState,
  RuntimeConnector,
  RuntimeContext,
  RuntimeController,
} from "./_types.js"
import { FxParamsData, buildParamsObject } from "@fxhash/params"
import { cloneDeep, merge } from "lodash"
import { RuntimeControllerEventEmitter } from "./_interfaces.js"
import { runtimeControls } from "./runtimeControls.js"

function handleOldSnippetEvents(e: any, runtime: RuntimeContext) {
  if (e.data) {
    if (e.data.id === "fxhash_getHash") {
      if (e.data.data) {
        runtime.state.update({ hash: e.data.data })
      } else {
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
  iframe: HTMLIFrameElement
  state: ProjectState
  options?: RuntimeControllerOptions
}

export function createRuntimeController(
  params: RuntimeControllerParams
): RuntimeController {
  const { options, state } = params
  const runtimeOptions = { ...DEFAULT_RUNTIME_OPTIONS, ...options }

  let _controls2 = runtimeControls()

  const emitter = new RuntimeControllerEventEmitter()

  const _iframe = params.iframe

  let _runtime = runtime({
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

  _runtime.emitter.on("context-changed", handleChangeRuntime)
  _controls2.emitter.on("controls-changed", controls => {
    _controls2 = controls
    emitter.emit("controls-changed", controls.state)
  })

  function handleChangeRuntime(runtime: RuntimeContext) {
    // If definition or state hash changed, sync the iframe
    if (runtime.details.stateHash.hard !== _runtime.details.stateHash.hard) {
      syncIframe(runtime)
    }
    if (
      runtime.details.definitionHash.params !==
      _runtime.details.definitionHash.params
    ) {
      _controls2.setDefinition(
        runtime.definition.params,
        runtime.definition.params
          ? buildParamsObject(runtime.definition.params, runtime.state.params)
          : {}
      )
      // emitter.emit("controls-changed", _controls)
    }
    _runtime = runtime
    emitter.emit("runtime-changed", _runtime)
  }

  function softUpdateParams(params: FxParamsData) {
    // TODO: debounce
    _runtime.state.update({ params })
    // TODO: make enum for events
    _iframe.contentWindow?.postMessage(
      { id: "fxhash_params:update", params },
      "*"
    )
  }

  function updateControls(update: Partial<FxParamsData>, forceRefresh = false) {
    // find the params which have changed and are "synced"
    const changed = Object.keys(update)
      .filter(id => _controls2.state.params.values[id] !== update[id])
      .map(id => _controls2.state.params.definition?.find(d => d.id === id))
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
      // TODO: handle auto-refresh
      /*
        if (options.autoRefresh) {
          updtParamsDeb({
            params: update,
          })
        }
        */
    } else {
      _runtime.state.update({ params: update })
    }
    _controls2.setValues(update)
    // emitter.emit("controls-changed", _controls)
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

  function handleWindowMessages() {
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

  function handleIframeLoad() {
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
    init: () => {
      handleWindowMessages()
      handleIframeLoad()
      syncIframe(_runtime)
    },
    release: () => {
      invariant(_iframe, "_iframe is required")
      _iframe.removeEventListener("load", onIframeLoad, true)
      window.removeEventListener("message", onMessage, false)
    },
    runtime: _runtime,
    controls: _controls2,
    getUrl: () => getUrl(_runtime),
    hardSync: () => {
      _runtime.update({
        state: {
          params: _controls2.state.params.values,
        },
      })
      console.log(_controls2.state.params.values)
      console.log(_runtime.state.params)
      syncIframe(_runtime)
    },
    updateControls,
    emitter,
  }
}
