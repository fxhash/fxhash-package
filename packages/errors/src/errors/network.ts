import { RichError } from "./common.js"

export class NetworkRichError extends RichError {
  name = "NetworkRichError" as const
  messages = {
    dev: "An network error occured.",
    user: "Network error",
  }
}
