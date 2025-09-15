import { config } from "../config.js"

export const tezosContractPrefixesByContractAddress: Record<string, string> = {
  [config.tez.contracts.gentk_v1]: "FX0",
  [config.tez.contracts.gentk_v2]: "FX0",
  [config.tez.contracts.gentk_v3]: "FX1",
}
export function getObjktIdFromContract(contract: string, id: string): string {
  return `${tezosContractPrefixesByContractAddress[contract]}-${id}`
}
