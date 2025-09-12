import { useQuery } from '@tanstack/react-query'
import { getBridges, getBridgeFromId } from '../apis/bridges.ts'

export function useBridges() {
  const query = useQuery({ queryKey: ['fruits'], queryFn: getBridges })
  return query
}

export function useGetBridgeFromId(id: number) {
  const query = useQuery({
    queryKey: ['bridge', id],
    queryFn: () => getBridgeFromId(id),
  })
  return query
}
