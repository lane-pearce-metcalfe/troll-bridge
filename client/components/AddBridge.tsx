import { useState } from 'react'
import { useAddBridge } from '../hooks/useBridges'
import { AddBridgeData } from '../../models/bridges'
import { useAuth0 } from '@auth0/auth0-react'
import Header from './Header'
import '../styles/addBridge.css'

export default function BridgeForm() {
  const { user } = useAuth0()
  const addBridgeMutation = useAddBridge()

  const [formData, setFormData] = useState<AddBridgeData>({
    name: '',
    location: '',
    type: '',
    length: 0,
    height: 0,
    year_built: 0,
    added_by: user?.sub,
    troll_owner: null,
    lat: 0,
    lng: 0,
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
        name === 'lat' ||
        name === 'lng' ||
        name === 'id'
          ? Number(value)
          : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addBridgeMutation.mutate(formData)
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

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="lat">
                Latitude
              </label>
              <input
                id="lat"
                type="number"
                step="any"
                name="lat"
                value={formData.lat || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="-36.8485"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="lng">
                Longitude
              </label>
              <input
                id="lng"
                type="number"
                step="any"
                name="lng"
                value={formData.lng || ''}
                onChange={handleChange}
                className="form-input"
                placeholder="174.7633"
              />
            </div>
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
