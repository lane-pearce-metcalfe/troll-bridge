import { useBridges } from '../hooks/useBridges.ts'
import Header from './Header.tsx'

function App() {
  const { data } = useBridges()

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="app">
        <Header />
        <ul>
          {data.map((bridge: { id: number; name: string }, i: number) => (
            <p key={i}>{bridge.name}</p>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
