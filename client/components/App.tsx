import { Link } from 'react-router-dom'
import {
  useBridges,
  useReleaseBridge,
  useTakeoverBridge,
} from '../hooks/useBridges.ts'
import Header from './Header.tsx'
import '../styles/bridgeList.css'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  const { user } = useAuth0()
  const { data } = useBridges()

  const takeoverBridge = useTakeoverBridge()
  const releaseBridge = useReleaseBridge()

  function handleTakeover(bridgeId: number) {
    if (user && user.sub) {
      takeoverBridge.mutate({ bridgeId, userSub: user.sub })
    }
  }

  function handleRelease(bridgeId: number) {
    if (user && user.sub) {
      releaseBridge.mutate({ bridgeId, userSub: user.sub })
    }
  }

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

        <div className="bridges-header">
          <div>Name</div>
          <div>Occupancy</div>
        </div>

        <ul className="bridges-list">
          {data.map(
            (bridge: { id: number; name: string; troll_owner?: boolean }) => (
              <li key={bridge.id}>
                <div className="bridge-item">
                  <Link
                    to={`/bridge/${bridge.id}`}
                    className="bridge-item-link"
                  >
                    <p className="bridge-name">{bridge.name}</p>
                  </Link>
                  <span
                    className={`bridge-occupancy ${
                      bridge.troll_owner
                        ? 'occupancy-occupied'
                        : 'occupancy-vacant'
                    }`}
                  >
                    {bridge.troll_owner === user?.sub ? (
                      <button onClick={() => handleRelease(bridge.id)}>
                        Release
                      </button>
                    ) : bridge.troll_owner ? (
                      'Occupied'
                    ) : (
                      <button onClick={() => handleTakeover(bridge.id)}>
                        Takeover
                      </button>
                    )}
                  </span>
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
