import { useQuery } from '@tanstack/react-query'
import { getUserFromAutho0Sub } from '../apis/users.ts'

export function useGetUserAuth0Sub(auth0Sub: string) {
  const query = useQuery({
    queryKey: ['user', auth0Sub],
    queryFn: () => getUserFromAutho0Sub(auth0Sub),
    enabled: !!auth0Sub,
  })
  return query
}
