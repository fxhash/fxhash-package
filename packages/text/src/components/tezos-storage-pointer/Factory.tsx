/**
 * This module handles the instanciation abstraction of the Tezos Storage blocks
 * based on the Tezos Storage Pointer properties.
 */

import { ITezosStoragePointer } from "@/processor/_interfaces"
import { FunctionComponent } from "react"
import { TezosStorageUnknown } from "./Unknown"
import { TezosStorageIteration } from "./Iteration"
import { TezosStorageProject } from "./Project"

export interface TezosStorageRenderer<T> extends FunctionComponent<T> {
  // check if the renderer is compatible with the pointer
  matches: (pointer: ITezosStoragePointer) => boolean
  // get the props from the pointer
  getPropsFromPointer: (pointer: ITezosStoragePointer) => T
}

// the list of tezos storage render components
const TezosStorageRenderers: TezosStorageRenderer<any>[] = [
  TezosStorageProject,
  TezosStorageIteration,
  TezosStorageUnknown,
]

/**
 * Given some pointer to a storage, outputs the component which can render it
 * withotu failing due to unsupported data
 */
export function TezosStorageFactory(
  pointer: ITezosStoragePointer
): TezosStorageRenderer<any> {
  for (const renderer of TezosStorageRenderers) {
    if (renderer.matches(pointer)) {
      return renderer
    }
  }
  return TezosStorageUnknown
}
