const GPU_VERSIONS = ["v111", "v132"] as const
type GPUVersion = (typeof GPU_VERSIONS)[number]

interface GPURenderingVersionConfig {
  date: string
  version: string
  batchArn: string
}

export type GPURenderingConfig = Record<GPUVersion, GPURenderingVersionConfig>
type GPURenderingConfigShared = Record<
  GPUVersion,
  Omit<GPURenderingVersionConfig, "batchArn">
>

// Shared config
const gpuRenderingConfigShared: GPURenderingConfigShared = {
  v111: {
    date: "2023-03-06",
    version: "111.0.5563.64",
  },
  v132: {
    date: "2025-01-14",
    version: "132.0.6834.83",
  },
}

// Helper function to create environment configs
const createEnvConfig = (
  batchArns: Record<GPUVersion, string>
): GPURenderingConfig => {
  return Object.fromEntries(
    GPU_VERSIONS.map(version => [
      version,
      {
        ...gpuRenderingConfigShared[version],
        batchArn: batchArns[version],
      },
    ])
  ) as GPURenderingConfig
}

// Environment configs
export const gpuRenderingConfigDev = createEnvConfig({
  v111: "arn:aws:batch:us-east-1:409089350506:job-definition/fxhash-batch-dev-fxhash-extract-chrome-v111",
  v132: "arn:aws:batch:us-east-1:409089350506:job-definition/fxhash-batch-dev-fxhash-extract-chrome-v132",
})

export const gpuRenderingConfigProd = createEnvConfig({
  v111: "arn:aws:batch:us-east-1:759392670381:job-definition/fxhash-batch-prd-fxhash-extract",
  v132: "arn:aws:batch:...",
})
