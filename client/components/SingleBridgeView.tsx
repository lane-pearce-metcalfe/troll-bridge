import { useParams } from 'react-router-dom'
import { useGetBridgeFromId } from '../hooks/useBridges'
import Header from './Header'
import '../styles/singleBridgeView.css'

export default function SingleBridgeView() {
  const id = useParams().id

  const { data, isLoading, isError } = useGetBridgeFromId(Number(id))

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        Loading...
      </div>
    )
  }

  if (isError) {
    return <div className="error-container">Error loading bridge</div>
  }

  if (!data) {
    return <div className="not-found-container">No bridge found</div>
  }

  return (
    <>
      <Header />
      <div className="single-bridge-container">
        <div className="bridge-content">
          <h2 className="bridge-title">{data.name}</h2>
          <img src={data.img_url} alt={data.name} className="bridge-image" />
          <div className="bridge-details">
            <div className="bridge-detail-item">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{data.location}</span>
            </div>
            <div className="bridge-detail-item">
              <span className="detail-label">Type:</span>
              <span className="detail-value">{data.type}</span>
            </div>
            <div className="bridge-detail-item">
              <span className="detail-label">Length:</span>
              <span className="detail-value">{data.length} meters</span>
            </div>
            <div className="bridge-detail-item">
              <span className="detail-label">Height:</span>
              <span className="detail-value">{data.height} meters</span>
            </div>
            <div className="bridge-detail-item">
              <span className="detail-label">Year Built:</span>
              <span className="detail-value">{data.year_built}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
