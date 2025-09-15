import { Link } from 'react-router-dom'
import { useBridges } from '../hooks/useBridges.ts'
import Header from './Header.tsx'
import '../styles/bridgeList.css'

function App() {
  const { data } = useBridges()

  if (!data) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading bridges...</div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="app">
        <Header />
        <div className="app-content">
          <div className="empty-state">
            <h2 className="empty-state-title">No Bridges Found</h2>
            <p className="empty-state-text">
              There are no bridges in the database yet.
            </p>
            <Link to="/addBridge" className="empty-state-cta">
              Add the First Bridge
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <Header />
      <div className="app-content">
        <h1 className="bridges-title">List of Bridges</h1>
        
        {/* Table-like header */}
        <div className="bridges-header">
          <div>Name</div>
          <div>Occupancy</div>
        </div>
        
        <ul className="bridges-list">
          {data.map((bridge: { id: number; name: string; occupied?: boolean }) => (
            <li key={bridge.id}>
              <Link to={`/bridge/${bridge.id}`} className="bridge-item-link">
                <div className="bridge-item">
                  <p className="bridge-name">{bridge.name}</p>
                  <span className={`bridge-occupancy ${
                    bridge.occupied ? 'occupancy-occupied' : 'occupancy-vacant'
                  }`}>
                    {bridge.occupied ? 'Occupied' : 'Vacant'}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
