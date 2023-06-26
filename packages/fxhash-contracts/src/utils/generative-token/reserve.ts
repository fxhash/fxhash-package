import { EReserveMethod, IReserve } from "types/entities/Reserve";
// import { TRenderReserveComponent } from "../components/GenerativeToken/Reserves/Reserve"
// import { ReserveAccessList } from "../components/GenerativeToken/Reserves/ReserveAccessList";
// import { ReserveMintPass } from "../components/GenerativeToken/Reserves/ReserveMintPass";
// import { InputReserveMintPass } from "../components/Input/Reserves/InputReserveMintPass";
// import { TInputReserve } from "services/parameters-builder/update-reserve/input";
// import { InputReserveWhitelist } from "../components/Input/Reserves/InputReserveWhitelist";
import { User } from "types/entities/User";
import { GenerativeToken } from "types/entities/GenerativeToken";
import { ILiveMintingContext } from "context/LiveMinting";
import { IReserveConsumption } from "services/contract-operations/Mint.js";


type TReserveEligibility = (
  reserve: IReserve,
  user: User,
  liveMintContext?: ILiveMintingContext
) => number

export interface IReserveDefinition {
  id: number
  label: string
  description: string
  // inputComponent: TInputReserve
  // renderComponent: TRenderReserveComponent
  initialValue: any
}

// maps reserves to their definition

export const mapReserveDefinition: Record<EReserveMethod, IReserveDefinition> = {
  WHITELIST: {
    id: 0,
    label: "Access List",
    description: "A list of users to whom a number of editions is reserved",
    // inputComponent: InputReserveWhitelist,
    // renderComponent: ReserveAccessList,
    initialValue: [],
  },
  MINT_PASS: {
    id: 1,
    label: "Mint Pass",
    description: "[For Live Events] A Smart Contract which controls whether a user can mint or not.",
    // inputComponent: InputReserveMintPass,
    // renderComponent: ReserveMintPass,
    initialValue: "",
  },
};

/**
 * Returns the size of the reserves
 */
export function getReservesAmount(reserves: IReserve[]): number {
  return reserves && reserves.length > 0
    ? reserves.reduce((a, b) => a + b.amount, 0)
    : 0
}

/**
 * Maps a reserve method with its function to compute how many can be consumed
 * from the reserve
 */
const mapReserveToEligiblity: Record<EReserveMethod, TReserveEligibility> = {
  WHITELIST: (reserve, user) => {
    return reserve.data[user.id] || 0
  },
  MINT_PASS: (reserve, user, passCtx) => {
    return reserve.data
      ? passCtx?.mintPass?.group?.address === reserve.data
        ? 1
        : 0
      : 0
  },
}

/**
 * Is a user elligible to mint from the reserve of a token ?
 */
export function reserveEligibleAmount(
  user: User,
  token: GenerativeToken,
  liveMintingContext?: ILiveMintingContext
): number {
  let eligibleFor = 0
  if (token.reserves && user && user.id) {
    for (const reserve of token.reserves) {
      if (reserve.amount > 0 && reserve.method) {
        eligibleFor += Math.min(
          mapReserveToEligiblity[reserve.method](
            reserve,
            user,
            liveMintingContext
          ),
          reserve.amount
        )
      }
    }
  }
  return eligibleFor
}

/**
 * How many editions are left in the reserve ?
 */
export function reserveSize(token: GenerativeToken): number {
  let size = 0
  for (const reserve of token.reserves) {
    size += reserve.amount
  }
  return Math.min(token.balance, size)
}

/**
 * Get the best reserve consumption method to consume, or null if no reserve
 * can be consumed
 */
export function getReserveConsumptionMethod(
  token: GenerativeToken,
  user: User,
  liveMintingContext: ILiveMintingContext
): IReserveConsumption | null {
  let consumption: IReserveConsumption | null = null

  // only if a token has a reserve we check
  if (token.reserves) {
    // we sort the reserve, MINT_PASS is last
    const sorted = token.reserves.sort((a, b) =>
      a.method === EReserveMethod.MINT_PASS ? -1 : 1
    )

    // we parse the reserve and check for a match
    for (const reserve of token.reserves) {
      if (reserve.amount > 0) {
        if (
          mapReserveToEligiblity[reserve.method](
            reserve,
            user,
            liveMintingContext
          ) > 0
        ) {
          consumption = {
            method: reserve.method,
            data: {
              token: liveMintingContext.mintPass?.token,
              address: user.id,
              project: token.id,
              reserveData: reserve.data,
            },
          }
          break
        }
      }
    }
  }

  return consumption
}
