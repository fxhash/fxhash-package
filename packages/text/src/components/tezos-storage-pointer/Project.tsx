import { isEthereumAddressValid } from "@fxhash/utils"
import { TezosStorageRenderer } from "./Factory"
import { config } from "@fxhash/config"

interface Props {
  id: string
}
export const TezosStorageProject: TezosStorageRenderer<Props> = ({ id }) => {
  return <div>Project {id}</div>
}

TezosStorageProject.matches = pointer => {
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

TezosStorageProject.getPropsFromPointer = pointer => {
  return {
    id: pointer.path.split("::")[1],
  }
}
