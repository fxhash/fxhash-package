import { useClient } from "@/index.js"
import { openPopup } from "@fxhash/utils-browser"

export type DiscordLoginBtnProps = {
  clientId: string
}

export function DiscordLoginBtn({ clientId }: DiscordLoginBtnProps) {
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
      console.log("tick")
      if (popup?.closed) clearInterval(ID)
      const close = () => {
        popup?.close()
        clearInterval(ID)
      }

      try {
        const href = popup?.location.href!
        console.log(href)
        const url = new URL(href)
        if (url.origin === window.location.origin) {
          const fragParams = new URLSearchParams(url.hash)
          if (fragParams.get("state") !== state) return close()
          const _token = fragParams.get("access_token")
          if (!_token) return close()
          console.log({ _token })
          handleToken(_token)
          return close()
        }
      } catch (err) {
        // cannot read window.location cause X-origin, but is fine
      }
    }, 300)
  }

  return (
    <button type="button" onClick={handleLogin}>
      login with discord
    </button>
  )
}
