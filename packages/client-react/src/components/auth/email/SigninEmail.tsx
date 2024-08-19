import { useState } from "react"
import css from "./SigninEmail.module.css"
import { useClient } from "@/hooks/useClient.js"
import icon from "@/icons/email.svg"
import { Web3AuthEmailRequestOtpOutput } from "@fxhash/sdk"
import { OtpVerification } from "./OtpVerification.js"
import { ErrorWrapper } from "@/components/feedback/ErrorWrapper.js"

type Props = {}
export function SignInEmail({}: Props) {
  const { client } = useClient()
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [otpRequest, setOtpRequest] =
    useState<Web3AuthEmailRequestOtpOutput | null>(null)

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
        setOtpRequest(res.value)
      }
    } catch (err: any) {
      console.log(err)
      setError("Unexpected error.")
    }
  }

  return (
    <>
      <ErrorWrapper error={error} marginTop="2px">
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
      </ErrorWrapper>

      {otpRequest && (
        <OtpVerification
          request={otpRequest}
          onCancel={() => setOtpRequest(null)}
        />
      )}
    </>
  )
}
