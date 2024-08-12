import { useClient } from "@/index.js"
import { openPopup } from "@fxhash/utils-browser"
import { AuthButton } from "./AuthButton.js"
import icon from "@/icons/discord.svg"

type Props = {
  clientId: string
}

export function SigniButtonDiscord({ clientId }: Props) {
  const { client } = useClient()

  const handleToken = (token: string) => {
    client?.loginWeb2({
      method: "oauth",
      options: {
        provider: "discord",
        token,
      },
    })
  }

  const handleLogin = () => {
    const redirectUri = window.location.origin
    const state = Math.random().toString().slice(2)
    let urlOAuth = "https://discord.com/oauth2/authorize"
    urlOAuth += `?client_id=${clientId}`
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
    <AuthButton icon={icon} onClick={handleLogin}>
      Sign in with Discord
    </AuthButton>
  )
}
