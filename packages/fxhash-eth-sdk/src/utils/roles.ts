import { keccak256, toHex } from "viem"

export const ADMIN_ROLE = keccak256(toHex("ADMIN_ROLE"))
export const BANNED_USER_ROLE = keccak256(toHex("BANNED_USER_ROLE"))
export const CREATOR_ROLE = keccak256(toHex("CREATOR_ROLE"))
export const MINTER_ROLE = keccak256(toHex("MINTER_ROLE"))
export const MODERATOR_ROLE = keccak256(toHex("MODERATOR_ROLE"))
export const METADATA_ROLE = keccak256(toHex("METADATA_ROLE"))
export const SIGNER_ROLE = keccak256(toHex("SIGNER_ROLE"))

export enum ETH_ROLES {
  ADMIN_ROLE = "ADMIN_ROLE",
  BANNED_USER_ROLE = "BANNED_USER_ROLE",
  CREATOR_ROLE = "CREATOR_ROLE",
  MINTER_ROLE = "MINTER_ROLE",
  MODERATOR_ROLE = "MODERATOR_ROLE",
  METADATA_ROLE = "METADATA_ROLE",
  SIGNER_ROLE = "SIGNER_ROLE",
}

export const ETH_ROLES_HASHES = [
  ADMIN_ROLE,
  BANNED_USER_ROLE,
  CREATOR_ROLE,
  MINTER_ROLE,
  METADATA_ROLE,
  SIGNER_ROLE,
  MODERATOR_ROLE,
]

export const ETH_ROLES_MAP: Record<string, `0x${string}`> = Object.keys(
  ETH_ROLES
).reduce((acc, key, index) => {
  acc[ETH_ROLES[key as keyof typeof ETH_ROLES]] = ETH_ROLES_HASHES[index]
  return acc
}, {} as Record<string, `0x${string}`>)
