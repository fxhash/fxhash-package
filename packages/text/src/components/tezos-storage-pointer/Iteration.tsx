import { isEthereumAddressValid } from "@fxhash/utils"
import { TezosStorageRenderer } from "./Factory"
import { config, getObjktIdFromContract } from "@fxhash/config"

interface Props {
  id: string
}
export const TezosStorageIteration: TezosStorageRenderer<Props> = ({ id }) => {
  return <div>gentk {id}</div>
}

TezosStorageIteration.matches = pointer => {
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

TezosStorageIteration.getPropsFromPointer = pointer => {
  const contract = pointer.contract.split(".")[0]
  const idNumber = pointer.path.split("::")[1]
  if (isEthereumAddressValid(contract)) {
    return { id: `${contract}-${idNumber}` }
  } else {
    return {
      id: getObjktIdFromContract(contract, idNumber),
    }
  }
}
