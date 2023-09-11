import {createFxhashSdk} from "./sdk/index"

// Used to expose the library to the browser build version
if (typeof window !== "undefined") {
  ;(window as any).$fx = createFxhashSdk(window, {})
}

