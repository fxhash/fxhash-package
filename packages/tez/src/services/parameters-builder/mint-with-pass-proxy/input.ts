export type TMintWithPassProxy = {
  mint_pass_group_address: string
  issuer_version: number
  mint_params: {
    issuer_id: number
    referrer: string | null
    reserve_input: string | null
    create_ticket: string | null
    recipient: string | null
    input_bytes: string
  }
  consume_pass_params: {
    payload: string
    signature: string
  }
}
