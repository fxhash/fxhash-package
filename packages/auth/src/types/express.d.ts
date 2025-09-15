import { AuthToken } from "./auth-token"

export {}

declare global {
  namespace Express {
    export interface Request {
      fxhashUser?: AuthToken
    }
  }
}
