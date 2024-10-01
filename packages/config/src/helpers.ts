const HOST_LOCAL = "localhost"
const HOST_DOCKER_INTERNAL = "host.docker.internal"

export function getDockerInternalUrl(url: string): string {
  return url.replace(HOST_LOCAL, HOST_DOCKER_INTERNAL)
}

export const isProd: boolean = (() => {
  // We can't destructure process.envs
  // https://nextjs.org/docs/pages/api-reference/next-config-js/env
  return (
    process.env.FXHASH_ENV === "prd" ||
    process.env.FXHASH_ENV === "production" ||
    process.env.NEXT_PUBLIC_FXHASH_ENV === "prd" ||
    process.env.NEXT_PUBLIC_FXHASH_ENV === "production" ||
    process.env.REACT_APP_FXHASH_ENV === "prd" ||
    process.env.REACT_APP_FXHASH_ENV === "production" ||
    process.env.VITE_FXHASH_ENV === "prd" ||
    process.env.VITE_APP_FXHASH_ENV === "production"
  )
})()

export const isLocal: boolean = (() => {
  // We can't destructure process.envs
  // https://nextjs.org/docs/pages/api-reference/next-config-js/env
  return (
    process.env.FXHASH_ENV === "local" ||
    process.env.NEXT_PUBLIC_FXHASH_ENV === "local" ||
    process.env.REACT_APP_FXHASH_ENV === "local" ||
    process.env.VITE_FXHASH_ENV === "local"
  )
})()

export const isDockerLocal: boolean = (() => {
  const isBrowser = typeof window !== "undefined"
  if (isBrowser) return false
  let fs
  try {
    fs = require("fs")
  } catch (e) {
    return false
  }
  if (!fs) return false
  return isLocal && fs.existsSync("/.dockerenv")
})()
