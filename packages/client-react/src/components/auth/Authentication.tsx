import css from "./Authentication.module.css"
import {
  SigniButtonDiscord,
  SigninButtonGoogle,
  SigninButtonTezos,
  SigninEmail,
} from "./_index"
import { SigninButtonEthereum } from "./signin-buttons/Ethereum"

type Props = {}
export function Authentication({}: Props) {
  return (
    <div className={css.root}>
      <SigninButtonEthereum />
      <SigninButtonTezos />
      <SigninButtonGoogle />
      <SigniButtonDiscord clientId="1264184464775315596" />
      <SigninEmail />
    </div>
  )
}
