import { ErrorWrapper } from "@/components/feedback/ErrorWrapper.js"
import { useClient } from "@/index.js"
import { web2SignInEnabled } from "@/utils/validate.js"
import { invariant } from "@fxhash/sdk"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import { useState } from "react"

export function SignInButtonGoogle() {
  const { client, config } = useClient()
  const [error, setError] = useState<string | null>(null)

  invariant(
    web2SignInEnabled(config),
    "<SignInButtonGoogle> cannot be used if web2 signin is disabled in the fxhash client provider config"
  )
  invariant(
    config.web2SignIn.google?.clientId,
    "<SignInButtonGoogle> cannot be used if Discord options have not been configured in the web2SignIn options of the fxhash client provider config"
  )

  return (
    <ErrorWrapper error={error} marginTop="5px">
      <GoogleOAuthProvider clientId={config.web2SignIn.google.clientId}>
        <GoogleLogin
          width={300}
          onSuccess={async response => {
            if (!response.credential)
              throw Error("credentials missing from google login")
            const res = await client.loginWeb2({
              method: "oauth",
              options: {
                provider: "google",
                token: response.credential,
              },
            })
            if (res.isFailure()) {
              res.error.userMessage
            }
          }}
        />
      </GoogleOAuthProvider>
    </ErrorWrapper>
  )
}
