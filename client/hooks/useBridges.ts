import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getBridges, getBridgeFromId, addBridge } from '../apis/bridges.ts'
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

export function useAddBridge() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newBridge: AddBridgeData) => addBridge(newBridge),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bridges'] })
    },
  })
}
