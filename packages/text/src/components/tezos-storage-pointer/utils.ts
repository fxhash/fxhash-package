/**
 * Given a Generative Token, outputs the Tezos Storage Pointer properties
 * associated
 */

import { ITezosStoragePointer } from "@/processor/_interfaces"
import { config } from "@fxhash/config"
import { isEthereumAddressValid } from "@fxhash/utils"

export function getTezosStoragePointerFromProject({
  id,
}: {
  id: string
}): ITezosStoragePointer {
  return {
    contract: config.tez.contracts.issuer_v1,
    path: `ledger::${id}`,
    storage_type: undefined,
    // the specification of the metadata
    data_spec: "FX-GEN-DATA-002",
    value_path: undefined,
  }
}

function getGentkFA2Contract(gentk: { id: string; version: number }): string {
  // FIXME: this is a workaround for having ethereum projects embedded
  // via the tezos storage pointer.
  if (isEthereumAddressValid(gentk.id.split("-")[0])) {
    return gentk.id.split("-")[0]
  }
  if (gentk.version === 0) {
    return config.tez.contracts.gentk_v1
  } else if (gentk.version === 1) {
    return config.tez.contracts.gentk_v2
  } else {
    return config.tez.contracts.gentk_v3
  }
}

function getGentkLocalId(id: string): string {
  if (id.includes("-")) {
    return id.split("-")[1]
  }
  return id
}

export function getTezosStoragePointerFromIteration(gentk: {
  id: string
  version: number
}): ITezosStoragePointer {
  return {
    contract: getGentkFA2Contract(gentk),
    path: `token_metadata::${getGentkLocalId(gentk.id)}`,
    storage_type: undefined,
    data_spec: undefined,
    value_path: undefined,
  }
}
