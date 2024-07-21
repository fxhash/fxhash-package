type IOpenPopupParams = {
  url: string
  title: string
  /**
   * @default 500
   */
  width?: number
  /**
   * @default 700
   */
  height?: number
  /**
   * Whether the popup should be screen-centered when opened
   * @default true
   */
  centered?: boolean
  /**
   * Whether the toolbar should be shown or not.
   * @default false
   */
  toolbar?: boolean
  /**
   * Whether the location should be shown or not.
   * @default true
   */
  location?: boolean
  /**
   * Whether or not the status bar should be shown.
   * @default false
   */
  status?: boolean
  /**
   * Whether or not the menu bar should be shown.
   * @default false
   */
  menubar?: boolean
  /**
   * Whether or not the window should be scrollable.
   * @default true
   */
  scrollbars?: boolean
}

/**
 * Open a popup window at a given URL, with some utilities to control the
 * popup behaviour.
 */
export function openPopup({
  url,
  title,
  width: w = 500,
  height: h = 700,
  centered = true,
  toolbar = false,
  location = true,
  status = false,
  menubar = false,
  scrollbars = true,
}: IOpenPopupParams) {
  // Fixes dual-screen position
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height

  const left = centered ? (width - w) / 2 + dualScreenLeft : 0
  const top = centered ? (height - h) / 2 + dualScreenTop : 0

  const opt = (name: string, value: boolean) =>
    `${name}=${value ? "yes" : "no"}`

  const newWindow = window.open(
    url,
    title,
    `
    ${opt("toolbar", toolbar)},
    ${opt("location", location)},
    ${opt("status", status)},
    ${opt("menubar", menubar)},
    ${opt("scrollbars", scrollbars)},
    width=${w}, 
    height=${h}, 
    top=${top}, 
    left=${left}
    `
  )
  newWindow?.focus()

  return newWindow
}
