import { RichError, RichErrorUnion } from "../common"

export class EmailOTPLockedError extends RichError {
  name = "EmailOTPLockedError" as const
  messages = {
    dev: "Email locked 2h because too many attempts",
    user: "This email is locked for verification during 2 hours because of too many attempts in a short period of time",
  }
}

export const EmailOTPRequestErrors = [EmailOTPLockedError]
export type EmailOTPRequestError = RichErrorUnion<typeof EmailOTPRequestErrors>

export class EmailOTPInvalidError extends RichError {
  name = "EmailOTPInvalidError" as const
  messages = {
    dev: "Email verification failed because OTP is invalid",
    user: "The validation code is invalid",
  }
}

export class EmailOTPExpiredError extends RichError {
  name = "EmailOTPExpiredError" as const
  messages = {
    dev: "Email verification failed because OTP has expired. A new OTP request must be initiated",
    user: "Verification code has expired. Please make another request.",
  }
}

export const EmailOTPVerificationErrors = [
  EmailOTPInvalidError,
  EmailOTPExpiredError,
  EmailOTPLockedError,
]
export type EmailOTPVerificationError = RichErrorUnion<
  typeof EmailOTPVerificationErrors
>
