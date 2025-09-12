import { useQuery } from '@tanstack/react-query'
import { getBridges } from '../apis/bridges.ts'

export function useBridges() {
  const query = useQuery({ queryKey: ['fruits'], queryFn: getBridges })
  return query
}
