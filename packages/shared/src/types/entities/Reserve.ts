export enum EReserveMethod {
  WHITELIST = "WHITELIST",
  // TOKEN_STAKERS     = "TOKEN_STAKERS",
  MINT_PASS = "MINT_PASS",
}

export interface IWhitelistData<T = number> {
  address: string
  pct: T
}

export type ReserveWhiteList<T = number> = {
  method: EReserveMethod.WHITELIST
  data: IWhitelistData<T>[]
  amount: T
}

export function isReserveWhiteList(
  reserve: IReserve
): reserve is ReserveWhiteList {
  return reserve.method === EReserveMethod.WHITELIST
}

export type ReserveMintPass<T = number> = {
  method: EReserveMethod.MINT_PASS
  data: string
  amount: T
}

export function isReserveMintPass<T = number>(
  reserve: IReserve<T>
): reserve is ReserveMintPass<T> {
  return reserve.method === EReserveMethod.MINT_PASS
}

export type IReserve<T = number> = ReserveWhiteList<T> | ReserveMintPass<T>

export interface IReserveMintInput {
  method: EReserveMethod
  data: any
}
