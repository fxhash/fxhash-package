import { CookieAuthenticationStrategy } from "./cookie.js"
import {
  AuthenticationStrategy,
  IAuthenticationStrategy,
} from "./interfaces.js"
import { JWTAuthenticationStrategy } from "./jwt.js"

export const authStrategiesMap: Record<
  AuthenticationStrategy,
  IAuthenticationStrategy<any>
> = {
  [AuthenticationStrategy.JWT]: JWTAuthenticationStrategy,
  [AuthenticationStrategy.COOKIE]: CookieAuthenticationStrategy,
}
