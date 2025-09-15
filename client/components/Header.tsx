import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import '../styles/header.css'

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
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/addBridge">
        <button>Add Bridge</button>
      </Link>
    </header>
  )
}
