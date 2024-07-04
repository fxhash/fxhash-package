import { CookieCredentialsStrategy } from "./cookie.js"
import { CredentialsStrategy, ICredentialsStrategy } from "./_interfaces.js"
import { JWTCredentialsStrategy } from "./jwt.js"

export const credentialsStratMap: Record<
  CredentialsStrategy,
  ICredentialsStrategy<any>
> = {
  [CredentialsStrategy.JWT]: JWTCredentialsStrategy,
  [CredentialsStrategy.COOKIE]: CookieCredentialsStrategy,
}
