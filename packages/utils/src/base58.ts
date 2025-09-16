import bs58check from "bs58check"

/**
 * OP_PREFIX: Tezos operation prefix
 * 5 (0x05) represents the generic operation tag
 * 116 (0x74) is the operation kind tag for transactions
 * This prefix is used to identify Tezos operations in the network
 */
const OP_PREFIX = new Uint8Array([5, 116])

/**
 * Encodes a 32 bytes hex string with base58check, and pads the output with
 * an initial information byte "o", just like Tezos operations.
 * @param hex input 32 bytes hex string to encode
 */
export function b58checkHexString(hex: string): string {
  // Remove '0x' prefix if present
  const cleanHex = hex.startsWith("0x") ? hex.slice(2) : hex

  // Convert hex string to Uint8Array
  const hexBuffer = new Uint8Array(
    cleanHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
  )

  // Concatenate OP_PREFIX with the hex buffer
  const fullBuffer = new Uint8Array(OP_PREFIX.length + hexBuffer.length)
  fullBuffer.set(OP_PREFIX)
  fullBuffer.set(hexBuffer, OP_PREFIX.length)

  // Encode using bs58check
  const encoded = bs58check.encode(fullBuffer)

  // Prefix with 'o' as per Tezos operations
  return "o" + encoded
}
