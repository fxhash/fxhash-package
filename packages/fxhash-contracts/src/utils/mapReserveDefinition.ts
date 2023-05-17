// import { TRenderReserveComponent } from "../components/GenerativeToken/Reserves/Reserve"
// import { ReserveAccessList } from "../components/GenerativeToken/Reserves/ReserveAccessList";
// import { ReserveMintPass } from "../components/GenerativeToken/Reserves/ReserveMintPass";
// import { InputReserveMintPass } from "../components/Input/Reserves/InputReserveMintPass";
// import { TInputReserve } from "services/parameters-builder/update-reserve/input";
// import { InputReserveWhitelist } from "../components/Input/Reserves/InputReserveWhitelist";
import { EReserveMethod } from "../types/entities/Reserve";

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
