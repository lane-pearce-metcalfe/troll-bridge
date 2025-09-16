import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getBridges,
  getBridgeFromId,
  addBridge,
  takeoverBridge,
  releaseBridge,
} from '../apis/bridges.ts'
import { AddBridgeData } from '../../models/bridges.ts'

export function useBridges() {
  const query = useQuery({ queryKey: ['bridges'], queryFn: getBridges })
  return query
}

export function useGetBridgeFromId(id: number) {
  const query = useQuery({
    queryKey: ['bridge', id],
    queryFn: () => getBridgeFromId(id),
  })
  return query
}

export function useTakeoverBridge() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      bridgeId,
      userSub,
    }: {
      bridgeId: number
      userSub: string
    }) => takeoverBridge(bridgeId, userSub),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['bridges'] })
      queryClient.invalidateQueries({
        queryKey: ['bridge', variables.bridgeId],
      })
    },
  })
}

export function useReleaseBridge() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      bridgeId,
      userSub,
    }: {
      bridgeId: number
      userSub: string
    }) => releaseBridge(bridgeId, userSub),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['bridges'] })
      queryClient.invalidateQueries({
        queryKey: ['bridge', variables.bridgeId],
      })
    },
  })
}

export function useAddBridge() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newBridge: AddBridgeData) => addBridge(newBridge),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bridges'] })
    },
  })
}
