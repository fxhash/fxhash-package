import { JwtPayload } from "jwt-decode"

export interface JwtAccessTokenPayload extends JwtPayload {
  id: string
}
