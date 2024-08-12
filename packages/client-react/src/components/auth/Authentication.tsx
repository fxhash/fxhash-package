import css from "./Authentication.module.css"
import {
  SigniButtonDiscord,
  SigninButtonGoogle,
  SigninButtonTezos,
} from "./_index.js"
import { SigninEmail } from "./email/SigninEmail.js"
import { SigninButtonEthereum } from "./signin-buttons/Ethereum.js"

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
