export type ExtractBalancerConfig = {
  awsBatchJobName: string
  awsBatchGpuJobDefArn: string
  awsBatchGpuJobQueueArn: string
  awsBatchGpuJobQueuePriorityArn: string
  awsBucketId: string
  awsRegion: "us-east-1"
  clearGPUQueue: boolean
  fetchJobStatusIntervalMs: number
  logs: boolean
  tracingEnabled: boolean
}

export const extractBalancerConfigDev: ExtractBalancerConfig = {
  awsBatchJobName: "fxh-extract-gpu",
  awsBatchGpuJobDefArn:
    "arn:aws:batch:us-east-1:759392670381:job-definition/fxhash-dev-extract:7",
  awsBatchGpuJobQueueArn:
    "arn:aws:batch:us-east-1:759392670381:job-queue/fxhash-extract",
  awsBatchGpuJobQueuePriorityArn:
    "arn:aws:batch:us-east-1:759392670381:job-queue/fxhash-dev-extract-priority",
  awsBucketId: "fxh-capture",
  awsRegion: "us-east-1",
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
  awsBatchGpuJobDefArn:
    "arn:aws:batch:us-east-1:759392670381:job-definition/fxhash-batch-prd-fxhash-extract",
  awsBatchGpuJobQueueArn:
    "arn:aws:batch:us-east-1:759392670381:job-queue/fxhash-batch-prd-gpu-spot-mix",
  awsBatchGpuJobQueuePriorityArn:
    "arn:aws:batch:us-east-1:759392670381:job-queue/fxhash-batch-prd-gpu-spot-mix-priority",
  awsBucketId: "fxh-prd-batch-extract-us-east-1",
  clearGPUQueue: true,
}
