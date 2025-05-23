import { AuthToken } from "@/types/auth-token"
import { AuthRole } from "@/types/roles"
import jwt from "jsonwebtoken"

// local auth public, used to keep in-memory pointer of the key to be f4st
let authPublic: string | null = null

/**
 * Verify an authentication token using the
 * @param token The raw encrypted authentication JWT token
 * @param authJwtPublicKey Optional JWT public key to use for decryption. If
 * cannot be found, the JWT in the env variables will be used instead.
 * @returns The decoded JWT token, if such data can be decoded from the token
 * @throws When token cannot be verified, or when JWT public key cannot be found
 */
export function verifyAuthToken(
  token: string,
  authJwtPublicKey?: string
): AuthToken {
  // look for the auth public key, if cannot find it throw
  if (!authPublic && process.env.AUTH_JWT_PUBLIC_KEY && !authJwtPublicKey) {
    authPublic = process.env.AUTH_JWT_PUBLIC_KEY.replace(/\\n/g, "\n")
  }
  let localAuthPublic = authPublic
  if (authJwtPublicKey) {
    localAuthPublic = authJwtPublicKey
  }
  if (!localAuthPublic) {
    throw new Error(
      "Cannot verify auth token: the fxhash auth jwt public key (AUTH_JWT_PUBLIC_KEY) is missing from the environment variables."
    )
  }

  // verify the JWT and return it
  const decoded = jwt.verify(token, localAuthPublic, { algorithms: ["RS256"] })
  return decoded as AuthToken
}

/**
 * Given an authentication token and a role, checks if such role is within the
 * authentication token.
 * @param authToken The decoded authentication token
 * @param role The role to test
 * @returns Whether the auth token contains the given role
 */
export function hasRole(authToken: AuthToken, role: AuthRole): boolean {
  return (
    authToken["https://hasura.io/jwt/claims"]["x-hasura-role"] === role ||
    authToken["https://hasura.io/jwt/claims"][
      "x-hasura-allowed-roles"
    ].includes(role)
  )
}

/**
 * Verifies if a token contains a given role, by decrypting it and by checking
 * if the role can be found inside.
 * @param token The encrypted authentication token
 * @param role The role to check the token against
 * @returns Whether or not the role is included in the token
 */
export function verifyAuthRole(token: string, role: AuthRole) {
  const decoded = verifyAuthToken(token)
  return hasRole(decoded, role)
}

/**
 * Signs a new cookie with the given payload
 * @param payload to be signed
 * @param options Optional parameters for the signing process
 * @param jwtPrivateKey Optional JWT private key to use for encryption. If
 * cannot be found, the JWT in the env variables will be used instead.
 * @returns string
 */
export function signAuthToken(
  payload: string | Buffer | Object,
  options?: jwt.SignOptions,
  jwtPrivateKey?: string
): string {
  const authPrivate =
    jwtPrivateKey || process.env.AUTH_JWT_PRIVATE_KEY?.replace(/\\n/g, "\n")

  if (!authPrivate) {
    throw new Error(
      "Cannot find private key: the fxhash auth jwt private key (AUTH_JWT_PRIVATE_KEY) is missing from the environment variables."
    )
  }
  return jwt.sign(payload, authPrivate, {
    algorithm: "RS256",
    expiresIn: "14d",
    ...options,
  })
}

export const VALID_FOR = 24 * 60 * 60 * 1000 // 24 hours
