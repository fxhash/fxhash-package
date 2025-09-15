# Error management

## Context

Historically, exceptions in JS have always been a pain to deal with, especially when raised by 3rd party libraries.

### Lack of type safety

It is not possible to reliably know the type of an error which has been caught. Consider the following example:

```ts
const ok = someOperation()

try {
  someFunctionWhichSeemsSafe()
  if (!ok) throw "error"
} catch (err) {
  // here while it seems like "err" can only be a string "error", the function
  // "someFunctionWhichSeemsSafe" could have thrown some uncaught exception
  // which would be caught here.
}
```

If `someFunctionWhichSeemsSafe()` comes from an external package, it can be very hard to know whether it may raise an exception or not. Moreover, as code complexity grows and as abstractions are being re-used accross different parts of a codebase, it becomes increasingly hard to manage exceptions in a robust fashion. All it takes is a deeply nested function to raise an uncaught error for interfering with the expected flow.

```ts
function a() {
  throw "random"
}
function b() {
  a()
}
function c() {
  b()
}
function d() {
  c()
}
function e() {
  d()
}

// having no insights on the implementation of e(), it would be hard to
// expect an error thrown by a deeply nested function call.
e()
```

### Proper user feedback derived from expected errors

When building thoughtful user flows, we would want to let users know what went wrong instead of just showing "an unexpected error occured". However, as typing raised exceptions is really hard in JS, and as no convention has been set to define the format of such errors, it can be very tedious for devs to craft clear error messages for their user feedback. Ex:

```ts
try {
  some3rdPartyFunvtion()
} catch (err) {
  // how to get a user-friendly error message here ?
  // how can I know if the error is excepted ?
  // is err.message meant for developer or users ?
  // how can the error message be constructed given the data available in err ?
}
```

## Our solutions

### Type safety

Borrowing from Rust's [Result](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html), functions from the fxhash sdk which can error will always return a result, with either success or failure. Both the success value and failure error are typed, ensuring that SDK consumers will know when failures are to be expected and have the necessary tools to process such errors properly.

```ts
const result = await someOperation()
if (result.isSuccess()) {
  return result.value // typed
} else {
  console.log(result.error) // also typed
}
```

TODO: more on Result

### Rich errors: User feedback from errors

Our whole stack uses a Rich Error pattern for all the errors returned. A rich error has:

- a message for developers: may contain some complexe/sensitive information which shouldn't be exposed to the user, eventually some clues on how to solve the error
- a message for the user: a well formatted message ready to be exposed to the user directly
- a string-identifier: an error code which allows error identification

For instance you may see the following error in our codebase:

```ts
export class EmailOTPExpiredError extends RichError {
  name = "EmailOTPExpiredError" as const
  messages = {
    dev: "Email verification failed because OTP has expired. A new OTP request must be initiated",
    user: "Verification code has expired. Please make another request.",
  }
}
```

If you were to be exposed to this error as a developer, it would be fairly straightforward to use it for feedback:

```ts
const otpVerificationResult = verifyOTP(otp)
if (otpVerificationResult.error) {
  alert(otpVerificationResult.error.messages.user)
}
```

TODO: more on Rich Error

By coupling Result and Rich Error, we get a robust, type-safe, dev & user friendly error management solution.
