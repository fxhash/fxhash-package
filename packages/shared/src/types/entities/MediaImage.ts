export interface MediaImage {
  id: string
  width?: number
  height?: number
  metadata?: {} | null
  mimeType?: string
  placeholder?: string
  processed: boolean
}
