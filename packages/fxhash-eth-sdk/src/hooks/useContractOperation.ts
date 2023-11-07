import { useContext, useRef, useState } from "react"
import { UserContext } from "@/context/User"
import { TContractOperation } from "@/services/operations/contractOperation"
import {
  ContractOperationCallback,
  ContractOperationStatus,
  TContractOperationHookReturn,
} from "@/contracts/Contracts"
import { useIsMounted } from "./useIsMounted"
// import { createOperationAppliedAlert } from "components/Alerts/OperationAppliedAlert"
// import { MessageCenterContext } from "../context/MessageCenter"

interface OptionsContractOperation {
  onSuccess?: (data: any) => void
  onContractOperationStatusInjected?: (message) => void
  onContractOperationStatusError?: (message) => void
}

export function useContractOperation<Params>(
  OperationClass: TContractOperation<Params>,
  options: OptionsContractOperation = {}
): TContractOperationHookReturn<Params> {
  const [state, setState] = useState<ContractOperationStatus>(
    ContractOperationStatus.NONE
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [opHash, setOpHash] = useState<string | null>(null)
  //TODO: to fix any
  const [operation, setOperation] = useState<any | null>(null)
  const [opData, setOpData] = useState<any[] | null>(null)
  const [params, setParams] = useState<Params | null>(null)
  const counter = useRef<number>(0)
  const isMounted = useIsMounted()
  const userContext = useContext(UserContext)
  // const messageCenter = useContext(MessageCenterContext)

  // resets the state
  const clear = () => {
    setLoading(false)
    setSuccess(false)
    setError(false)
    setOpHash(null)
    setOperation(null)
    setOpData(null)
    setParams(null)
    setState(ContractOperationStatus.NONE)
  }

  // trigger the operation with the given parameters
  const call = async (params: Params) => {
    setLoading(true)
    setSuccess(false)
    setError(false)
    setOpHash(null)
    setOperation(null)
    setOpData(null)
    setParams(params)
    setState(ContractOperationStatus.NONE)

    // assign the ID to this call and increment it to prevent overlaps
    counter.current++
    const id = counter.current

    // will be called to propagate the call progress
    const statusCallback: ContractOperationCallback = (status, data) => {
      if (counter.current === id && isMounted()) {
        setState(status)
        // if operation is *INJECTED*, we sent success
        if (status === ContractOperationStatus.INJECTED) {
          setSuccess(true)
          setLoading(false)
          // todo: type this shit
          if (data?.hash) {
            setOpHash(data.hash)
          }
          if (data?.operation) {
            setOperation(data.operation)
          }
          if (data?.opData) {
            setOpData(data.opData)
          }
          if (options.onSuccess) {
            options.onSuccess(data)
          }
        } else if (status === ContractOperationStatus.ERROR) {
          setLoading(false)
          setError(true)
        }
      }

      // even if not mounted anymore we call the handlers
      if (status === ContractOperationStatus.INJECTED) {
        // messageCenter.addMessage(createOperationAppliedAlert(data.message))
        options.onContractOperationStatusInjected?.(data)
      } else if (status === ContractOperationStatus.ERROR) {
        options.onContractOperationStatusError?.(data)
        // messageCenter.addMessage({
        //   type: "error",
        //   title: "An error occured",
        //   content: data,
        // })
      }
    }

    // if there's no user synced, we request a sync
    if (!userContext.user || !userContext.walletManager) {
      try {
        await userContext.connect()
      } catch (err) {
        statusCallback(
          ContractOperationStatus.ERROR,
          "Wallet needs to be synced to run operations"
        )
        return
      }
    }

    // otherwise we can just trigger the operation
    userContext.walletManager?.sendTransaction(
      OperationClass,
      params,
      statusCallback
    )
  }

  return {
    state,
    params,
    opHash,
    operation,
    opData,
    loading,
    success,
    call,
    clear,
    error,
  }
}
