export type ExtractBalancerConfig = {
  clearGPUQueue: boolean
  fetchJobStatusIntervalMs: number
  logs: boolean
  tracingEnabled: boolean
}

export const extractBalancerConfigDev: ExtractBalancerConfig = {
  clearGPUQueue: false,
  fetchJobStatusIntervalMs: 5000,
  logs: false,
  tracingEnabled: true,
}

export const extractBalancerConfigLocal: ExtractBalancerConfig = {
  ...extractBalancerConfigDev,
}

export const extractBalancerConfigProd: ExtractBalancerConfig = {
  ...extractBalancerConfigDev,
  clearGPUQueue: true,
}
