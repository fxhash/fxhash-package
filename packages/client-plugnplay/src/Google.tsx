import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import { ClientPlugnPlay } from "./client.js"

const GOOGLE_CLIENT_ID =
  "989746027092-sagkbf4apuj13qlt5jrq693i9cl4bpsn.apps.googleusercontent.com"

type Props = {
  client: ClientPlugnPlay
}

/**
 * TODO: Remove from here, shoudl be in react package
 */
export function GoogleLoginBtn({ client }: Props) {
  console.log(client)
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={response => {
          if (!response.credential)
            throw Error("credentials missing from google login")
          console.log(response)
          // client.loginOAuth("google", response.credential)
          client.loginOAuth({
            method: "oauth",
            options: {
              provider: "google",
              token: response.credential,
            },
          })
        }}
      />
    </GoogleOAuthProvider>
  )
}
