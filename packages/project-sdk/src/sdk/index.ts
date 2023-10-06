import { FxHashApi, FxHashExecutionContext } from "../types"
import { createFxRandom, getRandomHash } from "./math"
import {
  serializeParams,
  processParams,
  processParam,
  deserializeParams,
  ParameterProcessors,
} from "@fxhash/params/utils"

export function createFxhashSdk(window, options): FxHashApi {
  const { parent } = window

  const search = new URLSearchParams(window.location.search)
  // make fxrandstring from hash
  const fxhash = search.get("fxhash") || "oo" + getRandomHash(49)
  let fxrand = createFxRandom(fxhash, 2)
  // make fxrandminter from minter address
  const fxminter = search.get("fxminter") || "tz1" + getRandomHash(33)
  let fxrandminter = createFxRandom(fxminter, 3)
  // true if preview mode active, false otherwise
  // you can append preview=1 to the URL to simulate preview active
  const isFxpreview = search.get("preview") === "1"
  // call this method to trigger the preview
  function fxpreview() {
    console.log("FXPREVIEW")
    // window.dispatchEvent(new Event("fxhash-preview"))
    // setTimeout(() => fxpreview(), 500)
  }
  // get the byte params from the URL
  const searchParams = window.location.hash
  const initialInputBytes = searchParams?.replace("#0x", "")

  const $fx = {
    _version: "3.3.0",
    _processors: ParameterProcessors,
    // where params def & features will be stored
    _params: undefined,
    _features: undefined,
    // where the parameter values are stored
    _paramValues: {},
    _listeners: {},
    _receiveUpdateParams: async function (newRawValues, onDefault) {
      const handlers = await this.propagateEvent("params:update", newRawValues)
      handlers.forEach(([optInDefault, onDone]) => {
        if (!(typeof optInDefault == "boolean" && !optInDefault)) {
          this._updateParams(newRawValues)
          onDefault?.()
        }
        onDone?.(optInDefault, newRawValues)
      })
      if (handlers.length === 0) {
        this._updateParams(newRawValues)
        onDefault?.()
      }
    },
    _updateParams: function (newRawValues) {
      const constrained = processParams(
        { ...this._rawValues, ...newRawValues },
        this._params,
        "constrain"
      )
      Object.keys(constrained).forEach(paramId => {
        this._rawValues[paramId] = constrained[paramId]
      })
      this._paramValues = processParams(
        this._rawValues,
        this._params,
        "transform"
      )
      this._updateInputBytes()
    },
    _updateInputBytes: function () {
      const bytes = serializeParams(this._rawValues, this._params)
      this.inputBytes = bytes
    },
    _emitParams: function (newRawValues) {
      const constrainedValues = Object.keys(newRawValues).reduce(
        (acc, paramId) => {
          acc[paramId] = processParam(
            paramId,
            newRawValues[paramId],
            this._params,
            "constrain"
          )
          return acc
        },
        {}
      )
      this._receiveUpdateParams(constrainedValues, () => {
        parent.postMessage(
          {
            id: "fxhash_emit:params:update",
            data: {
              params: constrainedValues,
            },
          },
          "*"
        )
      })
    },
    hash: fxhash,
    rand: fxrand,
    minter: fxminter,
    randminter: fxrandminter,
    iteration: Number(search.get("fxiteration")) || 1,
    context:
      (search.get("fxcontext") as FxHashExecutionContext) || "standalone",
    preview: fxpreview,
    isPreview: isFxpreview,
    params: function (definition) {
      this._params = definition
      this._rawValues = deserializeParams(initialInputBytes, definition, {
        withTransform: true,
        transformType: "constrain",
      })
      this._paramValues = processParams(
        this._rawValues,
        definition,
        "transform"
      )
      this._updateInputBytes()
    },
    features: function (features) {
      this._features = features
    },
    getFeature: function (id) {
      return this._features[id]
    },
    getFeatures: function () {
      return this._features
    },
    getParam: function (id) {
      return this._paramValues[id]
    },
    getParams: function () {
      return this._paramValues
    },
    getRawParam: function (id) {
      return this._rawValues[id]
    },
    getRawParams: function () {
      return this._rawValues
    },
    getRandomParam: function (id) {
      const definition = this._params.find(d => d.id === id)
      const processor = processors[definition.type]
      return processor.random(definition)
    },
    getDefinitions: function () {
      return this._params
    },
    stringifyParams: function (params) {
      return JSON.stringify(
        params || this._rawValues,
        (key, value) => {
          if (typeof value === "bigint") return value.toString()
          return value
        },
        2
      )
    },
    on: function (name, callback, onDone) {
      if (!this._listeners[name]) {
        this._listeners[name] = []
      }
      this._listeners[name].push([callback, onDone])
      return () => {
        const index = this._listeners[name].findIndex(([c]) => c === callback)
        if (index > -1) {
          this._listeners[name].splice(index, 1)
        }
      }
    },
    propagateEvent: async function (name, data) {
      const results = []
      if (this._listeners?.[name]) {
        for (const [callback, onDone] of this._listeners[name]) {
          const result = callback(data)
          results.push([
            result instanceof Promise ? await result : result,
            onDone,
          ])
        }
      }
      return results
    },
    emit: function (id, data) {
      switch (id) {
        case "params:update":
          this._emitParams(data)
          break
        default:
          console.log("$fx.emit called with unknown id:", id)
          break
      }
    },
  }
  const resetFxRand: () => void = () => {
    fxrand = createFxRandom(fxhash, 2)
    $fx.rand = fxrand
    fxrand.reset = resetFxRand
  }
  fxrand.reset = resetFxRand
  const resetFxRandMinter: () => void = () => {
    fxrandminter = createFxRandom(fxminter, 3)
    $fx.randminter = fxrandminter
    fxrandminter.reset = resetFxRandMinter
  }
  fxrandminter.reset = resetFxRandMinter

  window.addEventListener("message", event => {
    if (event.data === "fxhash_getInfo") {
      parent.postMessage(
        {
          id: "fxhash_getInfo",
          data: {
            version: window.$fx._version,
            hash: window.$fx.hash,
            iteration: window.$fx.iteration,
            features: window.$fx.getFeatures(),
            params: {
              definitions: window.$fx.getDefinitions(),
              values: window.$fx.getRawParams(),
            },
            minter: window.$fx.minter,
          },
        },
        "*"
      )
    }
    if (event.data?.id === "fxhash_params:update") {
      const { params } = event.data.data
      if (params) window.$fx._receiveUpdateParams(params)
    }
  })
  return $fx
}
