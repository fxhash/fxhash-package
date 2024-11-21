import { BlockchainNetwork } from "@fxhash/sdk"
import { AuthButton } from "./AuthButton.js"
import icon from "@/icons/tezos.svg"
import { useClient } from "@/index.js"

export function SignInButtonTezos() {
  const { client } = useClient()

  return (
    <AuthButton
      icon={icon}
      onClick={() => client.connectWallet.bind(null, BlockchainNetwork.TEZOS)}
    >
      Tezos wallet
    </AuthButton>
  )
}
