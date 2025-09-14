import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useCheckForUser } from '../hooks/useUsers'
import { useNavigate } from 'react-router-dom'

export function RegisterUser() {
  const {
    user: auth0User,
    isAuthenticated,
    isLoading: auth0Loading,
  } = useAuth0()
  const navigate = useNavigate()

  const {
    mutate: checkUser,
    data: userData,
    isPending,
    error,
  } = useCheckForUser()

  useEffect(() => {
    if (
      !auth0Loading &&
      isAuthenticated &&
      auth0User &&
      auth0User.sub &&
      auth0User.email
    ) {
      checkUser({
        auth0Sub: auth0User.sub,
        email: auth0User.email,
        name: auth0User.name ?? '',
        pfpUrl: auth0User.picture ?? '',
      })
    }
  }, [auth0Loading, isAuthenticated, auth0User, checkUser])

  useEffect(() => {
    if (userData) {
      navigate('/')
    }
  }, [userData, navigate])

  if (auth0Loading || isPending) return <p>Loading...</p>
  if (error) return <p>Something went wrong: {error.message}</p>

  return <p>Checking user...</p>
}
