import { useClient } from "@/index"
import { AuthButton } from "./AuthButton"
import icon from "@/icons/ethereum.svg"
import { BlockchainNetwork } from "@fxhash/sdk"

export function SigninButtonEthereum() {
  const { client } = useClient()

  return (
    <AuthButton
      icon={icon}
      onClick={client?.connectWallet.bind(null, BlockchainNetwork.ETHEREUM)}
    >
      Ethereum wallet
    </AuthButton>
  )
}
