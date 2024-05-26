import { JwtPayload } from "jwt-decode"

export interface JwtAccessTokenPayload extends JwtPayload {
  address: string
  id: string
}
