import { keccak256, toHex } from "viem"

export const ADMIN_ROLE = keccak256(toHex("ADMIN_ROLE"))
export const BANNED_USER_ROLE = keccak256(toHex("BANNED_USER_ROLE"))
export const CREATOR_ROLE = keccak256(toHex("CREATOR_ROLE"))
export const MINTER_ROLE = keccak256(toHex("MINTER_ROLE"))
export const TOKEN_MODERATOR_ROLE = keccak256(toHex("TOKEN_MODERATOR_ROLE"))
export const USER_MODERATOR_ROLE = keccak256(toHex("USER_MODERATOR_ROLE"))
export const VERIFIED_USER_ROLE = keccak256(toHex("VERIFIED_USER_ROLE"))

export const ETH_ROLES = [
  ADMIN_ROLE,
  BANNED_USER_ROLE,
  CREATOR_ROLE,
  MINTER_ROLE,
  TOKEN_MODERATOR_ROLE,
  USER_MODERATOR_ROLE,
  VERIFIED_USER_ROLE,
]
