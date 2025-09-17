import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import '../styles/header.css'

export default function Header() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0()

  function handleLogin() {
    loginWithRedirect()
  }

  function handleLogout() {
    logout()
  }

  return (
    <header>
      <div className="header-auth">
        {!user ? (
          <button onClick={handleLogin} className="header-btn login-btn">
            Login
          </button>
        ) : (
          <button onClick={handleLogout} className="header-btn logout-btn">
            Logout
          </button>
        )}
      </div>

      <nav className="header-nav">
        <Link to="/" className="header-link">
          <button className="header-btn home-btn">Home</button>
        </Link>
        {isAuthenticated ? (
          <Link to="/addBridge" className="header-link">
            <button className="header-btn add-bridge-btn">Add Bridge</button>
          </Link>
        ) : null}
      </nav>
    </header>
  )
}
