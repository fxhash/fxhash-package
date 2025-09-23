import fs from "fs"
import crypto from "crypto"

export function getSha256(filePath: string): string {
  const fileData = fs.readFileSync(filePath)
  const sha256Hash = crypto.createHash("sha256").update(fileData).digest("hex")
  return sha256Hash
}
