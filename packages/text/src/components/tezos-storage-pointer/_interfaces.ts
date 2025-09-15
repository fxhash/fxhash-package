import { ITezosStoragePointer } from "@/processor/_interfaces.js"
import { TezosStorageType, StorageTypeProps } from "./_types.js"

export interface IPointerPropsProject {
  id: string
}

export interface IPointerPropsIteration {
  id: string
  objktId: string | null
}

export interface IPointerPropsUnknown {
  pointer: ITezosStoragePointer
}

/**
 * The payload for the useTezosStoragePointer hook
 */
export interface IUseTezosStroagePointerPayload<T extends TezosStorageType> {
  type: T
  props: StorageTypeProps[T]
}
