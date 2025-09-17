import { useEffect, useState } from 'react'
import { useAddBridge } from '../hooks/useBridges'
import { AddBridgeData } from '../../models/bridges'
import { useAuth0 } from '@auth0/auth0-react'
import Header from './Header'
import '../styles/addBridge.css'
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps'
import { useNavigate } from 'react-router-dom'

export default function BridgeForm() {
  const navigate = useNavigate()
  const { user } = useAuth0()
  const addBridgeMutation = useAddBridge()
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number
    lng: number
  }>({ lat: -36.8485, lng: 174.7633 })

  const [formData, setFormData] = useState<AddBridgeData>({
    name: '',
    location: '',
    type: '',
    length: 0,
    height: 0,
    year_built: 0,
    added_by: user?.sub,
    troll_owner: null,
    lat: markerPosition.lat,
    lng: markerPosition.lng,
    img_url: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'length' ||
        name === 'height' ||
        name === 'year_built' ||
        name === 'id'
          ? Number(value)
          : value,
    }))
  }

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      lat: markerPosition.lat,
      lng: markerPosition.lng,
    }))
  }, [markerPosition])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addBridgeMutation.mutate(formData)
    navigate('/')
  }

  return (
    <div className="bridge-form-container">
      <Header />
      <div className="bridge-form-content">
        {/* Success/Error Messages */}
        {addBridgeMutation.isSuccess && (
          <div className="form-message success">Bridge added successfully!</div>
        )}

        {addBridgeMutation.isError && (
          <div className="form-message error">
            Error adding bridge. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="bridge-form">
          <h2 className="form-title">Add a New Bridge</h2>

          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Bridge Name *
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter bridge name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="location">
              Location *
            </label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter location"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="type">
              Type of Bridge
            </label>
            <input
              id="type"
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Suspension, Arch, Beam"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="length">
                Length (meters)
              </label>
              <input
                id="length"
                type="number"
                name="length"
                value={formData.length || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="0"
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="height">
                Height (meters)
              </label>
              <input
                id="height"
                type="number"
                name="height"
                value={formData.height || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="year_built">
              Year Built
            </label>
            <input
              id="year_built"
              type="number"
              name="year_built"
              value={formData.year_built || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., 1937"
              min="1000"
              max="2030"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="lat">
              Click anywhere on the map to add the bridges coordinates
            </label>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
              <Map
                defaultZoom={10}
                defaultCenter={{ lat: -36.8485, lng: 174.7633 }}
                style={{ width: '100%', height: '400px' }}
                mapId={import.meta.env.VITE_MAP_ID}
                onClick={async (e) => {
                  if (!e.detail.latLng) return
                  const latDet = e.detail.latLng.lat
                  const lngDet = e.detail.latLng.lng
                  setMarkerPosition({ lat: latDet, lng: lngDet })
                }}
              >
                <AdvancedMarker
                  position={{
                    lat: markerPosition.lat,
                    lng: markerPosition.lng,
                  }}
                />
              </Map>
            </APIProvider>
            <button
              onClick={() => {
                console.log(markerPosition)
              }}
            >
              Test
            </button>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="img_url">
              Image URL
            </label>
            <input
              id="img_url"
              type="url"
              name="img_url"
              value={formData.img_url}
              onChange={handleChange}
              className="form-input"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <button
            type="submit"
            className={`form-submit ${addBridgeMutation.isPending ? 'loading' : ''}`}
            disabled={addBridgeMutation.isPending}
          >
            {addBridgeMutation.isPending ? 'Adding Bridge...' : 'Add Bridge'}
          </button>
        </form>
      </div>
    </div>
  )
}
