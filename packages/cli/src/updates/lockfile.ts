import path from "path"
import fs from "fs"
import { STATIC_PATH } from "../constants"

const LOCK_FILENAME = "fxhash-lock.json"
const PATH_FILE = path.join(STATIC_PATH, LOCK_FILENAME)

export function readLockFile() {
  // read content of the lock file, if it exists; if not, define as empty obj
  const contents = fs.existsSync(PATH_FILE)
    ? JSON.parse(fs.readFileSync(PATH_FILE, "utf8"))
    : {}
  return contents
}

/**
 * Will update the content of the fxhash lock file. The file is read first to
 * allow updates of existing lock file content.
 * @param {(content: Object => Object)} updateFn takes the current JSON config
 * as first argument and returns the new JSON config object
 */
export function updateLockFile(updateFn) {
  // read content of the lock file, if it exists; if not, define as empty obj
  let contents = readLockFile()
  // update using the provided function
  contents = updateFn(contents)
  // write the update
  fs.writeFileSync(PATH_FILE, JSON.stringify(contents, null, 2), {
    flag: "w",
  })
}
