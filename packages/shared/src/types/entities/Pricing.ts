export interface IPricingFixed<GNumber = number, GDate = Date> {
  id?: string
  price: GNumber
  opensAt?: GDate | null
  frameMinting?: {
    enabled?: boolean
    mintsPerFid?: number
  }
}

export interface IPricingDutchAuction<N = number> {
  id?: string
  levels: N[]
  restingPrice?: number
  finalPrice?: number
  decrementDuration: N
  opensAt: Date
  refundable: boolean
}
