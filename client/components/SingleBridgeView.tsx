import { useParams } from 'react-router-dom'
import { useGetBridgeFromId } from '../hooks/useBridges'
import Header from './Header'

export default function SingleBridgeView() {
  const id = useParams().id

  const { data, isLoading, isError } = useGetBridgeFromId(Number(id))

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading bridge</div>
  }

  if (!data) {
    return <div>No bridge found</div>
  }

  return (
    <div>
      <Header />
      <h2 className="text-2xl font-bold">{data.name}</h2>
    </div>
  )
}
