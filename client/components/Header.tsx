import { useAuth0 } from '@auth0/auth0-react'

export default function Header() {
  const { loginWithRedirect, logout, user } = useAuth0()

  function handleLogin() {
    loginWithRedirect()
  }

  function handleLogout() {
    logout()
  }
  return (
    <header>
      <>
        {!user ? (
          <button onClick={handleLogin}>Login</button>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </>
    </header>
  )
}
