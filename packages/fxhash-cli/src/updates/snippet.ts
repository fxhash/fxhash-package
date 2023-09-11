import { STATIC_PATH } from "../constants"
import axios from "axios"
import fs from "fs"
import path from "path"

const SNIPPET_FILENAME = "snippet.js"

const SNIPPET_FILE_URL = `https://raw.githubusercontent.com/fxhash/fxhash-boilerplate/master/lib/files/snippet.js`

/**
 * Fetches the snippet on the Github repository, and returns its contents
 * @returns {Promise<string>} a promise of the snippet contents
 * @throws {Error} if request fails in any way
 */
export async function pullSnippet() {
  const buff = await axios({
    url: SNIPPET_FILE_URL,
    responseType: "arraybuffer",
    timeout: 3000,
  })
  return buff.data.toString()
}

export async function saveSnippet(content) {
  fs.writeFileSync(path.join(STATIC_PATH, SNIPPET_FILENAME), content, {
    flag: "w",
  })
}

