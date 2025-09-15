import { Link } from 'react-router-dom'
import { useBridges } from '../hooks/useBridges.ts'
import Header from './Header.tsx'
import '../styles/bridgeList.css'

function App() {
  const { data } = useBridges()

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="app">
        <Header />
        <h1>List of bridges</h1>
        <ul>
          {data.map((bridge: { id: number; name: string }) => (
            <Link to={`/bridge/${bridge.id}`} key={bridge.id}>
              <p>{bridge.name}</p>
            </Link>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
