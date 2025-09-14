import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addUser, getUserFromAutho0Sub } from '../apis/users.ts'
import { UserData } from '../../models/user.ts'

export function useGetUserAuth0Sub(auth0Sub: string | undefined) {
  const query = useQuery({
    queryKey: ['user', auth0Sub],
    queryFn: () => getUserFromAutho0Sub(auth0Sub),
    enabled: !!auth0Sub,
  })
  return query
}

export function useAddUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (user: UserData) => {
      const newUser = addUser(user)
      return newUser
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.auth0Sub] })
    },
  })
}
