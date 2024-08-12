import { useState } from "react"
import css from "./SigninEmail.module.css"
import { useClient } from "@/hooks/useClient.js"
import icon from "@/icons/email.svg"

type Props = {}
export function SigninEmail({}: Props) {
  const { client } = useClient()
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)

  const _setEmail = (email: string) => {
    setEmail(email)
    setError(null)
  }

  const _handleSubmitEmail = async () => {
    if (!client) return
    try {
      const res = await client.requestEmailOTP(email)
      if (res.isFailure()) {
        setError(res.error.userMessage)
      } else {
        console.log("TODO: handle")
        console.log(res.value)
      }
    } catch (err: any) {
      console.log(err)
      setError("Unexpected error.")
    }
  }

  return (
    <div>
      <form
        className={`${css.root} ${error ? css.error : ""}`}
        onSubmit={evt => {
          evt.preventDefault()
          _handleSubmitEmail()
        }}
      >
        <label>
          <img className={css.icon} src={icon} />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={evt => _setEmail(evt.target.value)}
            placeholder="your@email.com"
          />
          <button type="submit">submit</button>
        </label>
      </form>

      {error && <div className={css.errorMessage}>{error}</div>}
    </div>
  )
}
