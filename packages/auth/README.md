# @fxhash/auth

Provides utilities for anything related to fxhash authentication.

## Config

This module is best suited for having the JWT public key accessible in the env variable `AUTH_JWT_PUBLIC_KEY`.

## Utils

```ts
import { verifyAuthToken, hasRole } from "@fxhash/auth"

// verify and decodes the JWT token using the JWT public key
const authToken = verifyAuthToken(token)

// check if a decoded auth token has a given role
const hasAccess = hasRole(authToken, "admin")
```

## Express

This module also comes with some express utility functions to facilitate the implementation of authentication on random APIs.

```ts
import { fxhashAuthInjectionMiddleware, fxhashAuthGuard } from "@fxhash/auth"

// using top-level authentication middleware
app.use(fxhashAuthInjectionMiddleware)
app.get("/secrets", fxhashAuthGuard("user"), (req, res) => {
  // here code executed for authenticated users
})

// keeping the authentication middleware local to the endpoint
app.get(
  "/secrets",
  fxhashAuthInjectionMiddleware,
  fxhashAuthGuard("user"),
  (req, res) => {
    // here secret code
  }
)
```
