import { useClient } from "@/index.js"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"

// todo: move in config
const GOOGLE_CLIENT_ID =
  "989746027092-sagkbf4apuj13qlt5jrq693i9cl4bpsn.apps.googleusercontent.com"

/**
 * TODO: Remove from here, shoudl be in react package
 */
export function GoogleLoginBtn() {
  const { client } = useClient()

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={response => {
          if (!response.credential)
            throw Error("credentials missing from google login")
          console.log(response)
          client?.loginWeb2({
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
