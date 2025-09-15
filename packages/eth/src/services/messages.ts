import { splitStringAt, Result, failure, success } from "@fxhash/utils"
import {
  isHex,
  type Hex,
  stringToBytes,
  bytesToHex,
  hexToNumber,
  hexToString,
} from "viem"

class InvalidFormatDecodeSignMessageError extends Error {
  name = "InvalidFormatDecodeSignMessageError" as const
  message = "invalid format"
}

class InvalidPrefixDecodeSignMessageError extends Error {
  name = "InvalidPrefixDecodeSignMessageError" as const
  message = "the prefix byte is invalid, it should be 0x19"
}

class InvalidVersionDecodeSignMessageError extends Error {
  name = "InvalidVersionDecodeSignMessageError" as const
  message = "version byte is invalid or not supported"
}

class InvalidVersionSpecificDataDecodeSignMessageError extends Error {
  name = "InvalidVersionSpecificDataDecodeSignMessageError" as const
  message = "version specific data is invalid"
}

class InvalidLengthDecodeSignMessageError extends Error {
  name = "InvalidLengthDecodeSignMessageError" as const
  message = "message length doesn't match length in the version-specific data"
}

type DecodeSignMessageError =
  | InvalidFormatDecodeSignMessageError
  | InvalidPrefixDecodeSignMessageError
  | InvalidVersionDecodeSignMessageError
  | InvalidVersionSpecificDataDecodeSignMessageError
  | InvalidLengthDecodeSignMessageError

/**
 * Following EIP-191 <https://eips.ethereum.org/EIPS/eip-191> "Signed Data
 * Standard", this function verifies if the input data is of a valid format,
 * and eventually returns the decoded message part.
 * **Note**: This function only supports version 0x45 for `personal_sign`
 * messages, otherwise it returns failure.
 *
 * @param message The message to be signed as a Hex string
 *
 * @returns Success: Message parts; Failure: {@link DecodeSignMessageError}
 */
export function decodeSignMessage(
  message: Hex
): Result<string, DecodeSignMessageError> {
  if (!isHex(message)) return failure(new InvalidFormatDecodeSignMessageError())

  const clearHex = message.startsWith("0x") ? message.slice(2) : message
  if (!clearHex.startsWith("19"))
    return failure(new InvalidPrefixDecodeSignMessageError())

  const withoutIdByte = clearHex.slice(2)
  if (!withoutIdByte.startsWith("45"))
    return failure(new InvalidVersionDecodeSignMessageError())

  const versionConstantData = bytesToHex(
    stringToBytes("Ethereum Signed Message:\n")
  ).slice(2)
  if (!withoutIdByte.startsWith(versionConstantData))
    return failure(new InvalidVersionSpecificDataDecodeSignMessageError())

  const [lengthHex, messageHex] = splitStringAt(
    withoutIdByte.slice(versionConstantData.length),
    8
  )
  const length = hexToNumber(`0x${lengthHex}`)

  const decoded = hexToString(`0x${messageHex}`)
  if (decoded.length !== length)
    return failure(new InvalidLengthDecodeSignMessageError())

  return success(decoded)
}
