export type IndexerStatusSeverity = "low" | "medium" | "high"

export interface IndexerStatus {
  level: number
  id: number
  originatedAt: string
  lastIndexedAt: string
}

export interface NetworkStatus {
  level: number
  lastSyncedAt: string
}
