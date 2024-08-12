import { BlockchainNetwork } from "@fxhash/sdk"
import { AuthButton } from "./AuthButton"
import icon from "@/icons/tezos.svg"
import { useClient } from "@/index"

export function SigninButtonTezos() {
  const { client } = useClient()

  return (
    <AuthButton
      icon={icon}
      onClick={client?.connectWallet.bind(null, BlockchainNetwork.TEZOS)}
    >
      Tezos wallet
    </AuthButton>
  )
}
