import { config, getObjktIdFromContract } from "@fxhash/config"
import { isEthereumAddressValid } from "@fxhash/utils"
import { useMemo } from "react"
import { ITezosStoragePointer } from "@/processor/_interfaces.js"
import {
  IPointerPropsIteration,
  IPointerPropsProject,
  IUseTezosStroagePointerPayload,
} from "./_interfaces.js"
import { TezosStorageType } from "./_types.js"

/**
 * Check if the pointer is an iteration pointer
 * @param pointer
 * @returns boolean
 * @example
 * ```ts
 * const pointer = {
 *  contract: "KT1HbQepzV1nVGg8QVznG7z4RcHseD5kwqBn",
 *  path: "token_metadata::1"
 *  }
 *  isIterationPointer(pointer)
 *  ```
 */
export function isIterationPointer(pointer: ITezosStoragePointer) {
  if (!pointer?.contract) {
    return false
  }
  // get contract address, removing network indentifier if any
  const contract = pointer.contract.split(".")[0]
  if (
    [
      config.tez.contracts.gentk_v1,
      config.tez.contracts.gentk_v2,
      config.tez.contracts.gentk_v3,
    ].indexOf(contract) === -1 &&
    !isEthereumAddressValid(contract)
  ) {
    return false
  }
  const split = pointer.path.split("::")
  if (split[0] !== "token_metadata") {
    return false
  }
  if (isNaN(parseInt(split[1]))) {
    return false
  }
  return true
}

/**
 * Get the props for the iteration pointer
 * @param pointer
 * @retur): IPointerPropsIteration
 */
export function getIterationPointerProps(
  pointer: ITezosStoragePointer
): IPointerPropsIteration {
  const contract = pointer.contract.split(".")[0]
  const idNumber = pointer.path.split("::")[1]
  if (isEthereumAddressValid(contract)) {
    return { id: `${contract}-${idNumber}`, objktId: null }
  } else {
    return {
      id: idNumber,
      objktId: getObjktIdFromContract(contract, idNumber),
    }
  }
}

/**
 * Check if the pointer is a project pointer
 * @param pointer
 * @returns boolean
 * @example
 * ```ts
 * const pointer = {
 * contract: "KT1HbQepzV1nVGg8QVznG7z4RcHseD5kwqBn",
 * path: "ledger::1"
 * }
 * isProjectPointer(pointer)
 * ```
 */
export function isProjectPointer(pointer: ITezosStoragePointer): boolean {
  // get contract address, removing network indentifier if any
  if (!pointer?.contract) {
    return false
  }
  const contract = pointer.contract.split(".")[0]
  if (
    [
      config.tez.contracts.issuer_v0,
      config.tez.contracts.issuer_v1,
      config.tez.contracts.issuer_v2,
      config.tez.contracts.issuer_v3,
      config.tez.contracts.issuer_tickets,
    ].indexOf(contract) === -1 &&
    !isEthereumAddressValid(contract)
  ) {
    return false
  }
  const split = pointer.path.split("::")
  if (split[0] !== "ledger") {
    return false
  }
  if (!split[1]) {
    return false
  }
  return true
}

/**
 * Get the props for the project pointer
 * @param pointer
 * @returns IPointerPropsProject
 */
export function getProjectPointerProps(
  pointer: ITezosStoragePointer
): IPointerPropsProject {
  return { id: pointer.path.split("::")[1] }
}

/**
 * Get the payload for the useTezosStoragePointer hook
 * This function is not using hooks and therefore can be used in rsc
 * @param pointer
 * @returns UseTezosStroagePointerPayload
 */
export function getTezosStoratePointerPayload(
  pointer: ITezosStoragePointer
): IUseTezosStroagePointerPayload<TezosStorageType> {
  let type = "unknown" as TezosStorageType
  if (isProjectPointer(pointer)) {
    type = "project"
  } else if (isIterationPointer(pointer)) {
    type = "iteration"
  }

  let props
  switch (type) {
    case "iteration":
      props = getIterationPointerProps(pointer)
      break
    case "project":
      props = getProjectPointerProps(pointer)
      break
    default:
      props = { pointer }
  }

  return { type, props }
}

/**
 * The hook to use the tezos storage pointer. This hook uses useMemo to
 * avoid recomputing the payload when the pointer object is the same.
 * @param pointer
 * @returns UseTezosStroagePointerPayload
 */
export function useTezosStoragePointer(
  pointer: ITezosStoragePointer
): IUseTezosStroagePointerPayload<TezosStorageType> {
  return useMemo(() => {
    return getTezosStoratePointerPayload(pointer)
  }, [pointer])
}
