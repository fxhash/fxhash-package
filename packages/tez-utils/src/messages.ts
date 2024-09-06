import { Result, failure, success } from "@fxhash/utils"
import { char2Bytes, hex2Bytes } from "@taquito/utils"

const TEZOS_SIGNING_PREFIX = "0501" // 05 'micheline expression', 01 'string'

// 4 bytes (8 chars in the hex-encoding) for the size of the subsequent string
const encodeSizePrefix = (payload: string): string => {
  const hex = payload.length.toString(16)
  return hex.padStart(8, "0")
}

/**
 * Encodes the sign-in payload into the format expected by the Tezos wallet
 * @param payload The payload to encode.
 * @return  The encoded payload.
 */
export function encodeSignMessagePayload(payload: string): string {
  const bytes = char2Bytes(payload)
  const sizePrefix = encodeSizePrefix(payload)
  return TEZOS_SIGNING_PREFIX + sizePrefix + bytes
}

class InvalidFormatSignMessageError extends Error {
  name = "InvalidFormatSignMessageError" as const
  message = "format is invalid."
}

class InvalidPrefixDecodeSignMessageError extends Error {
  name = "InvalidPrefixDecodeSignMessageError" as const
  message = "invalid prefix, expecting '0501'"
}

class InvalidSizePrefixDecodeSignMessageError extends Error {
  name = "InvalidSizePrefixDecodeSignMessageError" as const
  message = "invalid message length prefix."
}

class MessageLengthDoesntMatchLengthPrefixSignMessageError extends Error {
  name = "MessageLengthDoesntMatchLengthPrefixSignMessageError" as const
  message = "message length doesn't match length prefix"
}

type DecodeSignMessageError =
  | InvalidFormatSignMessageError
  | InvalidPrefixDecodeSignMessageError
  | InvalidSizePrefixDecodeSignMessageError
  | MessageLengthDoesntMatchLengthPrefixSignMessageError

/**
 * Validates if a message payload is a valid Tezos message payload (starts with
 * 0501, has a length which matches the length of a 4 byte length prefix) and
 * returns such message decoded as a plain string (or a failure if any)
 * @param payload A raw payload as a hexadecimal string
 * @returns A success (decoded string message) or failure if any
 */
export function decodeSignMessagePayload(
  payload: string
): Result<string, DecodeSignMessageError> {
  if (!isHex(payload)) return failure(new InvalidFormatSignMessageError())

  if (!payload.startsWith(TEZOS_SIGNING_PREFIX))
    return failure(new InvalidPrefixDecodeSignMessageError())

  let withoutPayloadPrefix = payload.slice(4)
  if (withoutPayloadPrefix.length < 8)
    return failure(new InvalidSizePrefixDecodeSignMessageError())

  const length = Number("0x" + withoutPayloadPrefix.slice(0, 8))
  const withoutPrefix = withoutPayloadPrefix.slice(8)
  const message = hexStringToString(withoutPrefix)
  if (message.length !== length)
    return failure(new MessageLengthDoesntMatchLengthPrefixSignMessageError())

  return success(message)
}

function isHex(str: string): boolean {
  if (str.length % 2 !== 0) return false
  const set = "abcdef0123456789".split("")
  str = str.toLowerCase()
  for (let c of str) {
    if (!set.includes(c)) return false
  }
  return true
}

function hexStringToString(str: string): string {
  return str.length > 1
    ? String.fromCharCode.apply(
        null,
        str.match(/.{2}/g)!.map(hx => parseInt(hx, 16))
      )
    : ""
}
