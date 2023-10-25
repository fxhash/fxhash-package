import { Request, Response, NextFunction } from "express"
import { hasRole, verifyAuthToken } from "@/authentication"
import { AuthRole } from "@/types/roles"

/**
 * Returns the fxhash authentication token if it's present in the request
 * (first looks for cookies, then x-fxhash-token header).
 * @param req Express request
 * @returns A fxhash token present in the request
 */
export function getTokenFromRequest(req: Request): string | undefined {
  return req.cookies?.token || req.headers["x-fxhash-token"]
}

/**
 * If there is a token cookie in the request, decodes the token cookie and
 * populates the fxhashUser property in the request object for further
 * processing.
 * This middleware doesn't break the execution flow of requests, as in it will
 * only populate (or not) the fxhashUser field.
 */
export function fxhashAuthInjectionMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
) {
  console.log(req.cookies)
  const token = req.cookies?.token || req.headers["x-fxhash-token"]
  if (!token || req.fxhashUser) return next()
  // if there is a token cookie, verify the cookie
  try {
    const authToken = verifyAuthToken(token)
    req.fxhashUser = authToken
  } catch (err) {
    // error gets ignored: this middleware doesn't come in the way of the exec
    // flow, it just populated the fxhashUser field if there is a token
  } finally {
    next()
  }
}

/**
 * Returns a request handler which terminates the request by sending a 401 if
 * there isn't an authenticated user in the request or if the user doesn't have
 * the required role. This function was designed to be called when initializing
 * an express endpoint.
 *
 * **Note**: This requires the `fxhashAuthInjectionMiddleware` to have been
 * previously executed in the flow, otherwise it won't be able to detect the
 * user in the request.
 *
 * @param role The role which the authenticated user must have
 *
 * @example
 * ```ts
 * // using top-level authentication middleware
 * app.use(fxhashAuthInjectionMiddleware)
 * app.get("/secrets", fxhashAuthGuard("user"), (req, res) => {
 *   // here code executed for authenticated users
 * })
 *
 * // keeping the authentication middleware local to the endpoint
 * app.get(
 *   "/secrets",
 *   fxhashAuthInjectionMiddleware,
 *   fxhashAuthGuard("user"),
 *   (req, res) => {
 *     // here secret code
 *   }
 * )
 * ```
 */
export function fxhashAuthGuard(role: AuthRole) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.fxhashUser || !hasRole(req.fxhashUser, role)) {
      return res.status(401).send()
    }
    return next()
  }
}
