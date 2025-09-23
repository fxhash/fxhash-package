import { AuthRole } from "./roles"

export interface AuthToken {
  /**
   * User account ID
   */
  id: string

  /**
   * Hasura-specific Authentication details
   * https://hasura.io/docs/latest/auth/authentication/jwt/
   */
  "https://hasura.io/jwt/claims": {
    "x-hasura-user-id": string
    "x-hasura-allowed-roles": AuthRole[]
    "x-hasura-default-role": AuthRole
    "x-hasura-role": AuthRole
  }
}
