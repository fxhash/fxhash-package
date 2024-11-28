import { RichError } from "./common.js"

export class ReactClientNoWalletConnectedError extends RichError {
  name = "ReactClientNoWalletConnectedError" as const
  messages = {
    dev: "No wallet is connected to the client",
    user: "A wallet needs to be connected before performing this action",
  }
}
