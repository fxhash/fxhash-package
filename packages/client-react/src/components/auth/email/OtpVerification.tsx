import { OTPInput } from "input-otp"
import css from "./OtpVerification.module.css"
import * as React from "react"
import { useClient } from "@/index.js"
import { createPortal } from "react-dom"
import xmark from "@/icons/xmark.svg"
import { ErrorWrapper } from "@/components/feedback/ErrorWrapper.js"
import { Web3AuthEmailRequestOtpOutput } from "@fxhash/sdk"

type Props = {
  request: Web3AuthEmailRequestOtpOutput
  onCancel: () => void
}
export const OtpVerification: React.FC<Props> = ({ request, onCancel }) => {
  const { client } = useClient()
  const [value, setValue] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  async function _handleSubmit() {
    if (!client) return
    try {
      const res = await client.loginWeb2({
        method: "email",
        options: {
          email: request.email,
          otp: value,
        },
      })
      if (res.isFailure()) {
        setError(res.error.userMessage)
      }
    } catch (err) {
      console.log(err)
      setError("Unexpected error")
    }
  }

  return createPortal(
    <div className={css.wrapper}>
      <div className={css.cover} onClick={onCancel} />
      <form
        className={`${css.root} ${error ? css.error : ""}`}
        onSubmit={async evt => {
          evt.preventDefault()
          _handleSubmit()
        }}
      >
        <button className={css.close} type="button" onClick={onCancel}>
          <img src={xmark} />
        </button>

        <span className={css.title}>Enter verification code</span>
        <span className={css.info}>
          Check {request.email} for the verification code
        </span>

        <ErrorWrapper error={error} className={css.errorWrapper}>
          <div className={css.otpWrapper}>
            <OTPInput
              autoFocus
              value={value}
              onChange={v => {
                setValue(v)
                error && setError(null)
              }}
              maxLength={6}
              containerClassName={css.otp}
              textAlign="center"
              render={({ slots }) =>
                slots.map((slot, idx) => (
                  <div
                    key={idx}
                    className={`${css.otpDigit} ${slot.isActive ? css.active : ""}`}
                  >
                    {slot.char}
                    {slot.hasFakeCaret && <FakeCaret />}
                  </div>
                ))
              }
            />
          </div>
        </ErrorWrapper>

        <button
          className={css.submit}
          type="submit"
          disabled={value.length !== 6}
        >
          Submit
        </button>
      </form>
    </div>,
    document.body
  )
}

function FakeCaret() {
  return (
    <div className={css.fakeCaretWrapper}>
      <div className={css.fakeCaret} />
    </div>
  )
}
