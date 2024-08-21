import type { Address, Hex } from "viem"

export const INVALID_SIGNATURE = "INVALID"
export const INVALID_CHALLENGE_ID = "INVALID"

export const CHALLENGE_ID = "CHALLENGE_ID"
export const CHALLENGE_TEXT_ETHEREUM =
  "localhost:8888 wants you to sign in with your Ethereum account:\n" +
  "0x3f37cE40A4162Af17c9FC5a1148F6e0f44352Cce\n" +
  "\n" +
  "Agree to terms: https://www.fxhash.xyz/doc/legal/terms.pdf\n" +
  "\n" +
  "URI: https://www.fxhash.xyz/\n" +
  "Version: 1\n" +
  "Chain ID: 11155111\n" +
  "Nonce: fFvUjV0oZOtO5CvZo\n" +
  "Issued At: 2024-07-29T09:19:36.607Z"

export const CHALLENGE_TEXT_TEZOS =
  "Signed Message: sign in to fxhash.xyz (tz1PtkHCTK6hfKFY52vc4YGnExonEiKDoahP). Agree to terms: https://www.fxhash.xyz/doc/legal/terms.pdf. Issued At: 2024-07-29T09:21:58.172Z - valid for 5 mins."

export const ACCESS_TOKEN =
  "eyJhbGciOiJSUzI1NiJ9.eyJpZCI6IjNjMzdlOTZlLWYxYWEtNGI5OC04Y2I5LWI0OWNkY2I1NWNkZiIsImlhdCI6MTcyMjI0NDc3NiwiZXhwIjoxNzIyMjQ2NTc2fQ.DBP0P9QPwwTa1-cN5IwnZr62IZh_bGwlvrtQG-Q5UE0hdeAkmofI9IaPgQSEB1b_KujpkTn5a7wQ_BsLAWLcgIhNPrKHtPp0eeYZukaSGGWk9MkwJ3OxG_GB-31_xpWTA9S093E1gyXYJTepHej9iO3V7ZeNuznps6dbthRAybf3rARC-0ecOmzMwgLiOOvK_otkmqFIWJ2bsHXYLq4cSYUOOWg37n7fn6UbpBIXd8RSNijJdOVhDDRyPlpxUkm2Bjct_UlofOAklhmqmye1lDUaaapxG4CBKGHcpBr390zBHNGLT0-yLG0vmrdLAG5GUQT5ZVHA-gwnX1ans1MU5g"
export const REFRESH_TOKEN =
  "eyJhbGciOiJSUzI1NiJ9.eyJpZCI6IjNjMzdlOTZlLWYxYWEtNGI5OC04Y2I5LWI0OWNkY2I1NWNkZiIsInNlc3Npb25Ub2tlbiI6Ijk2YTQyYmM4LTM1MzctNDllNy04YjE5LTMzYjIyZjkzYjg3NyIsImlhdCI6MTcyMjI0NDc3NiwiZXhwIjoxNzIzNDU0Mzc2fQ.V5jOoj_zn0OYbch--KkH_MNQs7f2hUCj4mtNLpBn65i3P56qcHZJ_pyowL_8HY5l8fGmuMr1py95MvBKCPuppTV_0h1PaglwEME_3jYNjnC4UY-66ERIH1Hc86pDPKo9S6qzmeQZhSbHAgtQKmE3h8IdpbnL8prKue53xAccxpDzi5UyxBHshbpsvdeL8gN-VuCdBYH2zO4QC9MV3QDgjFZxbQYHm0prgvASlh-PHi3SzO9mk0HzEd71_bUKjvigQivr0oIpyaOZqOmwN-B4zYQJORyaHfdB5Qie-gk2YvBt_JiN5I6anAwhFYfOeDvODejeMRnn3mwmUd7QCVY_4w"

export const WALLETS = {
  ETH: {
    sk: "0x9d1efbc37184b214674e0bd959b4001c25bb6bc909900589d21db77ae09e6434" as Hex,
    address: "0x719cA16cD437a7F1CADD63030DeF978C3291298F" as Address,
  },
  TEZ: {
    sk: "edskRw91nUcbSjYaWK8nXuPxjs6CvKSHJinsXBzhDBipGb82YCBjCFRAkZfrYbVJU49etjczDekScrjfyhh12GHoqsYz4toPao",
    pkh: "tz1Se7pbsMANcg1t7NSpk4tQPAVEf1sFAiP1",
  },
}
