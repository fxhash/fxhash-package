import { useClient } from "@/index.js"
import { openPopup } from "@fxhash/utils-browser"
import { AuthButton } from "./AuthButton.js"
import icon from "@/icons/discord.svg"
import { invariant } from "@fxhash/sdk"
import { web2SignInEnabled } from "@/utils/validate.js"
import { ErrorWrapper } from "@/components/feedback/ErrorWrapper.js"
import { useState } from "react"

type Props = {}

export function SignInButtonDiscord({}: Props) {
  const { client, config } = useClient()
  const [error, setError] = useState<string | null>(null)

  invariant(
    web2SignInEnabled(config),
    "<SignInButtonDiscord> cannot be used if web2 signin is disabled in the fxhash client provider config"
  )
  invariant(
    config.web2SignIn.discord?.clientId,
    "<SignInButtonDiscord> cannot be used if Google options have not been configured in the web2SignIn options of the fxhash client provider config"
  )

  const handleToken = async (token: string) => {
    setError(null)
    if (!client) return
    const res = await client.loginWeb2({
      method: "oauth",
      options: {
        provider: "discord",
        token,
      },
    })
    if (res.isFailure()) {
      setError(res.error.userMessage)
    }
  }

  const handleLogin = () => {
    invariant(config.web2SignIn.discord?.clientId, "missing Discord client id")
    const redirectUri = window.location.origin
    const state = Math.random().toString().slice(2)
    let urlOAuth = "https://discord.com/oauth2/authorize"
    urlOAuth += `?client_id=${config.web2SignIn.discord.clientId}`
    urlOAuth += `&response_type=token`
    urlOAuth += `&redirect_uri=${encodeURIComponent(redirectUri)}`
    urlOAuth += `&scope=identify+email`
    urlOAuth += `&state=${state}`

    const popup = openPopup({
      url: urlOAuth,
      title: "Login with Discord",
      width: 500,
      height: 700,
      centered: true,
      toolbar: false,
      location: true,
      status: false,
      menubar: false,
      scrollbars: true,
    })
    const ID = setInterval(() => {
      if (popup?.closed) clearInterval(ID)
      const close = () => {
        popup?.close()
        clearInterval(ID)
      }

      try {
        const href = popup?.location.href!
        const url = new URL(href)
        if (url.origin === window.location.origin) {
          const fragParams = new URLSearchParams(url.hash)
          if (fragParams.get("state") !== state) return close()
          const _token = fragParams.get("access_token")
          if (!_token) return close()
          handleToken(_token)
          return close()
        }
      } catch (err) {
        // cannot read window.location cause X-origin, but is fine
      }
    }, 300)
  }

  return (
    <ErrorWrapper error={error} marginTop="5px">
      <AuthButton icon={icon} onClick={handleLogin}>
        Sign in with Discord
      </AuthButton>
    </ErrorWrapper>
  )
}
