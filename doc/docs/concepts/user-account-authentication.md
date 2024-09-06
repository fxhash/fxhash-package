# User accounts & authentication

On fxhash, some of the features we provide require storing user data _off-chain_ or require the ability for our backend application to verify a wallet ownership. This implies that some fxhash-backend authentication needs to be in place.

Some of these features include user profile, gathering user data securely (in the context of shipping physical objects for instance), storing temporary data (when working on a project), linking wallets on different chains under a single account, or even signing in with email or socials.

Moreover, we aim for this SDK used by 3rd parties to provide feature-parity with the main platform. As such, we implemented an open authentication system allowing your applications to access such features for your users.

## Authentication flows

Let's quickly look into our authentication flow so that you can get familiar with how it works.

```mermaid
sequenceDiagram
  actor User
  participant Client
  participant fx as fxhash API

  User->>Client: Connect using wallet/email/social
  Client->>fx: Authenticate with signature/token
  fx-->>fx: Verify info, create session
  fx-->>Client: JWT Tokens
```

This is your typical authentication flow.

However, as we provide various authentication strategies, we support different variants of this flow, which we introduce next. **Please not that we describe these flows for information, which are implemented by our SDK—as a consumer of the SDK you will only face higher level APIs.**

### Wallet

Your typical blockchain-wallet authentication strategy.

```mermaid
sequenceDiagram
  actor User
  participant Wallet
  participant Client
  participant fx as fxhash API

  User->>Client: Connect wallet
  Client->>User: Select blockchain/wallet solution
  User-->>Client: Selected blockchain/wallet
  Client->>Wallet: Request permission
  Wallet->>User: Allow ?
  User-->>Wallet: Ok
  Wallet-->>Client: Ok
  Client->>Wallet: Sign message (ex. SIWE)
  Wallet->>User: Sign ?
  User-->>Wallet: Ok
  Wallet-->>Client: Signature
  Client->>fx: Authenticate with message+signature
  fx-->>fx: Verify signature
  fx-->>fx: Create session
  fx-->>Client: JWT Tokens
  Client-->>User: Authenticated!
```

- `1-11`: The user connects their wallet of choice, and is immediately prompted with a message signature to verify their wallet ownership on our backend. The message to be signed follows strict specifications so that wallets can properly display the signature request, ensuring the user can trust it and sign. This is a common _web3_ flow
- `12-16`: Our backend verifies the signature against the message, and if valid connects the user (creating an account if needed) by storing a session and returning JWT tokens which can be used to authenticate further requests.

### Email

::: tip
See [Wallet options: \<iframe\> embedded wallet](./wallet-options.md#iframe-embedded-wallet) for technical details about the underlying wallet solution.
:::

```mermaid
sequenceDiagram
  actor User
  participant Client
  participant Wallet as Embedded wallet
  participant fx as fxhash API
  participant Web3Auth

  User->>Client: Input $email
  Client->>fx: Begin email OTP flow with $email
  fx-->>fx: Generate OTP
  fx-->>User: Send OTP to $email
  User-->>Client: Input OTP
  Client->>fx: Authenticate $email with OTP
  fx-->>fx: Validates
  fx-->>Client: Web3Auth token issued by fxhash
  Client-->Wallet: Create Web3Auth session with token
  Wallet->>Web3Auth: Authenticate with token
  Web3Auth-->>Web3Auth: Verify token
  Web3Auth-->>Wallet: Web3Auth idToken
  Wallet->Web3Auth: Use idToken to get key parts
  Wallet-->>Wallet: Reconstruct pk locally
  Wallet-->>Client: Web3Auth idToken & session details
  Client->>fx: Authenticate using idToken
  fx->>Web3Auth: Validate idToken
  fx-->>fx: Verify Web3Auth session against auth payload
  fx-->>fx: Create session
  fx-->>Client: JWT Tokens
  Client-->>User: Authenticated!
```

This flow requires some extra steps as a secure embedded wallet iframe is used for handling the authentication with Web3Auth to reconstruct the private key. However, from a user perspective this flow is actually as simple as the wallet one, with the advantage of only needing an email address.

### Social provider

::: tip
See [Wallet options: \<iframe\> embedded wallet](./wallet-options.md#iframe-embedded-wallet) for technical details about the underlying wallet solution.
:::

```mermaid
sequenceDiagram
  actor User
  participant Client
  participant Wallet as Embedded wallet
  participant fx as fxhash API
  participant Social
  participant Web3Auth

  User->>Client: Sign in with Social
  User-->>Social: Go through OAuth flow
  Social-->>Client: OAuth tokens
  Client->>fx: Authenticate on social with tokens
  fx-->>Social: Validate OAuth tokens
  fx-->>Client: Web3Auth token issued by fxhash
  Client-->Wallet: Create Web3Auth session with token
  Wallet->>Web3Auth: Authenticate with token
  Web3Auth-->>Web3Auth: Verify token
  Web3Auth-->>Wallet: Web3Auth idToken
  Wallet->Web3Auth: Use idToken to get key parts
  Wallet-->>Wallet: Reconstruct pk locally
  Wallet-->>Client: Web3Auth idToken & session details
  Client->>fx: Authenticate using idToken
  fx->>Web3Auth: Validate idToken
  fx-->>fx: Verify Web3Auth session against auth payload
  fx-->>fx: Create session
  fx-->>Client: JWT Tokens
  Client-->>User: Authenticated!
```

This flow is similar to email sign in, except for the very first steps. Arguably this is the easiest solution for onboarding users, at some cost for wallet ownership and decentralisation.

::: info
In the future we are planning to implement flow for transferring a Web3Auth wallet to a self custody one, to improve the security of assets. However in the meantime this solution provides a frictionless and secure-enough solution for blockchain-uneducated users.
:::

## Authentication is optional!

::: warning
The authentication layer is optional and only required for a subset of the features we provide. The SDK APIs provide simple ways for you to customize this behaviour (and even more complexe ones in case you would want)
:::

Example using `@fxhash/client`:

```ts
import { createClient } from "@fxhash/client" // or from "@fxhash/sdk"

createClient({
  metadata: {
    /* ... */
  },
  wallets: {
    /* ... */
  },

  // simply setting this boolean to true will instruct the client to connect
  // the wallets defined above to the fxhash authentication layer in a
  // transparent way for you.
  authentication: true,
})
```

::: info
The authentication layer is implemented by the [**`@fxhash/core`**](../packages/core/) package, and built in a modular way. You can read more information on the underlying implementation in its doc.
:::
