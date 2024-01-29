import fs from "fs"
import path from "path"
import { promisify } from "util"
import Keyv from "keyv"
import { Octokit } from "@octokit/rest"

const mkdir = promisify(fs.mkdir)
const writeFile = promisify(fs.writeFile)

const ONE_HOUR_IN_MS = 1000 * 3600

const defaultCacheOpts = {
  ttl: ONE_HOUR_IN_MS,
  namespace: "github-download-directory",
}

async function createDirectories(filepath: string) {
  const dir = path.dirname(filepath)
  return mkdir(dir, { recursive: true })
}

async function output(file) {
  await createDirectories(file.path)
  await writeFile(file.path, file.contents)
}

export class GHDownloader {
  cache = null
  _octokit = null
  constructor(options) {
    const cacheOpts = Object.assign({}, defaultCacheOpts, options?.cache)

    this.cache = new Keyv(cacheOpts)

    this._octokit = new Octokit(options?.github)
  }

  async recurseTree(owner, repo, directory, options) {
    const { data } = await this._octokit.repos.getContent({
      owner,
      repo,
      ref: options?.sha,
      path: directory,
    })

    const recurseDirs = data.map(node => {
      if (node.type === "dir") {
        return this.recurseTree(owner, repo, node.path, options)
      }
      return {
        path: node.path,
        type: node.type,
        sha: node.sha,
      }
    })

    return Promise.all(recurseDirs).then(nodes => nodes.flat())
  }

  async getTree(owner, repo, directory, options) {
    const sha = options?.sha
    const cacheKey = sha ? `${owner}/${repo}#${sha}` : `${owner}/${repo}`

    const cachedTree = await this.cache.get(cacheKey)
    if (cachedTree) {
      return cachedTree
    }

    const tree = await this.recurseTree(owner, repo, directory, options)

    await this.cache.set(cacheKey, tree)

    if (typeof this.cache.save === "function") {
      await this.cache.save()
    }

    return tree
  }

  async fetchFiles(owner, repo, directory, options) {
    const tree = await this.getTree(owner, repo, directory, options)

    const files = tree
      .filter(node => node.path.startsWith(directory) && node.type === "file")
      .map(async node => {
        const { data } = await this._octokit.git.getBlob({
          owner,
          repo,
          file_sha: node.sha,
        })
        return {
          path: node.path,
          contents: Buffer.from(data.content, data.encoding),
        }
      })

    return Promise.all(files)
  }

  async download(owner, repo, directory, options) {
    const files = await this.fetchFiles(owner, repo, directory, options)
    return Promise.all(
      files
        .map(file => ({
          ...file,
          path: path.join(options?.output || "", file.path),
        }))
        .map(output)
    )
  }
}

