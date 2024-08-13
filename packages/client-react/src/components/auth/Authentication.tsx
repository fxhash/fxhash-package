import { useClient } from "@/index.js"
import css from "./Authentication.module.css"
import {
  SignInButtonDiscord,
  SignInButtonGoogle,
  SignInButtonTezos,
} from "./_index.js"
import { SignInEmail } from "./email/SignInEmail.js"
import { SignInButtonEthereum } from "./signin-buttons/Ethereum.js"

type Props = {}
export function Authentication({}: Props) {
  const { config } = useClient()

  return (
    <div className={css.root}>
      <SignInButtonEthereum />
      <SignInButtonTezos />
      {config.web2SignIn && (
        <>
          {config.web2SignIn.google && <SignInButtonGoogle />}
          {config.web2SignIn.discord && <SignInButtonDiscord />}
          {config.web2SignIn.email && <SignInEmail />}
        </>
      )}
    </div>
  )
}
