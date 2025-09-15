export enum CaptureTriggerMode {
  DELAY = "DELAY",
  FN_TRIGGER = "FN_TRIGGER",
}

export const CaptureTriggerModeList = Object.values(CaptureTriggerMode)

export enum CaptureMode {
  CANVAS = "CANVAS",
  CUSTOM = "CUSTOM",
  VIEWPORT = "VIEWPORT",
}

export const CaptureModeList = Object.values(CaptureMode)

export enum StorageMode {
  TEMPORARY = "temporary",
}

export enum CapturePriority {
  HIGH = "high",
}

export interface CaptureSettings {
  storageMethod: StorageMode
  mode: CaptureMode | null
  triggerMode: CaptureTriggerMode | null
  delay: number
  canvasSelector?: string
  resX?: number
  resY?: number
  gpu?: boolean
  withFeatures?: boolean
  priority?: CapturePriority
}

export const DEFAULT_CAPTURE_SETTINGS: CaptureSettings = {
  storageMethod: StorageMode.TEMPORARY,
  mode: CaptureMode.VIEWPORT,
  triggerMode: CaptureTriggerMode.DELAY,
  delay: 1000,
  resX: 800,
  resY: 800,
  gpu: false,
  withFeatures: false,
  priority: CapturePriority.HIGH,
}

export interface PreviewRequestBody extends CaptureSettings {
  cid: string
}

const extractApi = "https://extract.fxhash-dev.xyz"

export async function fetchExtract(body: PreviewRequestBody): Promise<unknown> {
  return await fetch(`${extractApi}/extract`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}
