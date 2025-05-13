import { mockTezosAddress } from "@fxhash/utils/address"
import { mockTezosTransactionHash } from "@fxhash/utils/hash"
import { createFxRandom } from "@fxhash/utils/math"
import { parseHashParams } from "@fxhash/utils/url"
import {
  type FxParamType,
  type FxParamValue,
  type FxParamsRaw,
} from "@fxhash/params"
import {
  serializeParams,
  processParams,
  processParam,
  deserializeParams,
  ParameterProcessors,
} from "@fxhash/params/utils"
import { type FxHashApi, type FxHashExecutionContext } from "../types"
import { version } from "../version"

export function createFxhashSdk(window: Window): FxHashApi {
  const { parent } = window

  const search = new URLSearchParams(window.location.search)
  // make fxrandstring from hash
  const fxhash = search.get("fxhash") || mockTezosTransactionHash()
  // make fxrandminter from minter address
  const fxminter = search.get("fxminter") || mockTezosAddress()
  let fxrandminter = createFxRandom(fxminter)
  // true if preview mode active, false otherwise
  // you can append preview=1 to the URL to simulate preview active
  const isFxpreview = search.get("preview") === "1"
  // call this method to trigger the preview
  function fxpreview() {
    window.dispatchEvent(new Event("fxhash-preview"))
    setTimeout(() => fxpreview(), 500)
  }
  // call this function to trigger capture frame
  function captureFrame(isLastFrame: boolean = false) {
    window.dispatchEvent(
      new CustomEvent("fxhash-capture-frame", {
        detail: { isLastFrame: isLastFrame },
      })
    )
    setTimeout(() => captureFrame(isLastFrame), 500)
  }
  // get the byte params from the URL
  const { params, lineage: _lineage } = parseHashParams(window.location.href)

  const initialInputBytes = params.replace("0x", "")
  const lineage = [..._lineage, fxhash]
  const fxRandsByDepth = [...lineage.map(h => createFxRandom(h))]

  const resetFxRandByDepth = (depth: number) => {
    if (depth < 0 || depth >= lineage.length) throw new Error("Invalid depth")
    const hash = lineage[depth]
    fxRandsByDepth[depth] = createFxRandom(hash)
    // Add reset method to this generator as well
    fxRandsByDepth[depth].reset = () => resetFxRandByDepth(depth)

    // If this is the main rand (last in the array), update $fx.rand too
    if (depth === lineage.length - 1) {
      fxrand = fxRandsByDepth[depth]
      $fx.rand = fxrand
    }
  }

  fxRandsByDepth.forEach((generator, index) => {
    generator.reset = () => resetFxRandByDepth(index)
  })

  let fxrand = fxRandsByDepth[lineage.length - 1]

  function randAt(depth: number) {
    if (!fxRandsByDepth[depth]) throw new Error("Invalid depth")
    return fxRandsByDepth[depth]()
  }
  randAt.reset = (depth: number) => {
    resetFxRandByDepth(depth)
  }

  const $fx: FxHashApi = {
    _version: version,
    _processors: ParameterProcessors,
    _params: undefined,
    _features: undefined,
    _rawValues: {},
    _paramValues: {},
    _listeners: {},
    _receiveUpdateParams: async function (newRawValues, onDefault) {
      const handlers = await this._propagateEvent("params:update", newRawValues)
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
      if (!this._params) throw new Error("Params not defined")
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
      if (!this._params) throw new Error("Params not defined")
      const bytes = serializeParams(this._rawValues, this._params)
      this.inputBytes = bytes
    },
    _emitParams: function (newRawValues) {
      const constrainedValues = Object.keys(newRawValues).reduce(
        (acc, paramId) => {
          if (!this._params) throw new Error("Params not defined")
          acc[paramId] = processParam(
            paramId,
            newRawValues[paramId],
            this._params,
            "constrain"
          ) as FxParamValue<FxParamType>
          return acc
        },
        {} as FxParamsRaw
      )
      this._receiveUpdateParams(constrainedValues, () => {
        return new Promise<void>((resolve, reject) => {
          try {
            parent.postMessage(
              {
                id: "fxhash_emit:params:update",
                data: {
                  params: constrainedValues,
                },
              },
              "*"
            )
            resolve()
          } catch (error) {
            reject(error)
          }
        })
      })
    },
    _fxRandByDepth: fxRandsByDepth,
    createFxRandom: createFxRandom,
    hash: fxhash,
    lineage: lineage,
    depth: lineage.length - 1,
    rand: fxrand,
    randAt: randAt,
    minter: fxminter,
    randminter: fxrandminter,
    iteration: Number(search.get("fxiteration")) || 1,
    context:
      (search.get("fxcontext") as FxHashExecutionContext) || "standalone",
    preview: fxpreview,
    captureFrame: captureFrame,
    isPreview: isFxpreview,
    inputBytes: undefined,
    params: function (definition) {
      this._params = definition.map(def => ({
        ...def,
        version: this._version,
        value: def.default,
        options: def.options,
      }))
      this._rawValues = deserializeParams(initialInputBytes, this._params, {
        withTransform: true,
        transformType: "constrain",
      }) as FxParamsRaw
      this._paramValues = processParams(
        this._rawValues,
        this._params,
        "transform"
      )
      this._updateInputBytes()
    },
    features: function (features) {
      this._features = features
    },
    getFeature: function (id) {
      if (!this._features) throw new Error(`Feature ${id} not defined`)
      return this._features?.[id]
    },
    getFeatures: function () {
      if (!this._features) throw new Error("Features not defined")
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
      if (!this._params) throw new Error("Params not defined")
      const definition = this._params.find(d => d.id === id)
      if (!definition) throw new Error(`Param with id ${id} not found`)
      const processor = ParameterProcessors[definition.type]
      return processor.random(definition as any)
    },
    getDefinitions: function () {
      if (!this._params) return []
      return this._params
    },
    stringifyParams: function (params) {
      return JSON.stringify(
        params || this._rawValues,
        (_, value) => {
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
    _propagateEvent: async function (name, data) {
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
    resetFxRandByDepth(lineage.length - 1)
  }
  fxrand.reset = resetFxRand
  const resetFxRandMinter: () => void = () => {
    fxrandminter = createFxRandom(fxminter)
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
