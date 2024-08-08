import { useClient } from "@/index.js"
import { IClientPlugnPlay } from "@fxhash/sdk"
import { invariant } from "@fxhash/shared"
import { useState } from "react"
import OtpInput from "react-otp-input"

export function InputRequestEmailOTP() {
  const { client } = useClient()
  const [value, setValue] = useState("")

  const [otp, setOtp] = useState<string>("")
  const [otpReq, setOtpReq] = useState<Awaited<
    ReturnType<IClientPlugnPlay["requestEmailOTP"]>
  > | null>(null)

  return (
    <>
      {otpReq ? (
        <form
          onSubmit={async evt => {
            evt.preventDefault()
            client?.loginWeb2({
              method: "email",
              options: {
                email: otpReq.email,
                otp: otp,
              },
            })
          }}
        >
          <div>
            OTP Request on {otpReq.email} / expires {otpReq.expires}
          </div>
          {/* @ts-ignore */}
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={8}
            /* @ts-ignore */
            renderInput={props => <input {...props} />}
          />
          <button type="submit">submit OTP</button>
        </form>
      ) : (
        <form
          onSubmit={async evt => {
            evt.preventDefault()
            invariant(client, "client invariant")
            const otpRequest = await client.requestEmailOTP(value)
            setOtpReq(otpRequest)
          }}
        >
          <input
            type="email"
            value={value}
            onChange={evt => setValue(evt.target.value)}
            placeholder="email@example.com"
          />
          <button type="submit">submit {"->"}</button>
        </form>
      )}
    </>
  )
}
