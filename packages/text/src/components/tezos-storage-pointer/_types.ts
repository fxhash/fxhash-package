import { ITezosStoragePointer } from "@/processor/_interfaces"
import {
  IPointerPropsProject,
  IPointerPropsIteration,
  IPointerPropsUnknown,
} from "./_interfaces"

export type TezosStorageType = "project" | "iteration" | "unknown"

export type StorageTypeProps = Record<TezosStorageType, unknown> & {
  project: IPointerPropsProject
  iteration: IPointerPropsIteration
  unknown: IPointerPropsUnknown
}

export type ITezosStoragePointerProps = ITezosStoragePointer
