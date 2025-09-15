import { useState } from 'react'
import { useAddBridge } from '../hooks/useBridges'
import { AddBridgeData } from '../../models/bridges'
import { useAuth0 } from '@auth0/auth0-react'

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
    <form onSubmit={handleSubmit}>
      <h2>Add a New Bridge</h2>

      <p>Bridge name:</p>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <p>Location:</p>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <p>Type of bridge:</p>
      <input
        type="text"
        name="type"
        value={formData.type}
        onChange={handleChange}
      />
      <p>Length in meters:</p>
      <input
        type="number"
        name="length"
        value={formData.length}
        onChange={handleChange}
      />
      <p>Height in meters:</p>
      <input
        type="number"
        name="height"
        value={formData.height}
        onChange={handleChange}
      />
      <p>Year built:</p>
      <input
        type="number"
        name="year_built"
        value={formData.year_built}
        onChange={handleChange}
      />
      <p>Latitude:</p>
      <input
        type="number"
        step="any"
        name="lat"
        placeholder="Latitude"
        value={formData.lat}
        onChange={handleChange}
      />
      <p>Longitude:</p>
      <input
        type="number"
        name="lng"
        placeholder="Longitude"
        value={formData.lng}
        onChange={handleChange}
      />
      <p>Img url:</p>
      <input
        type="url"
        name="img_url"
        value={formData.img_url}
        onChange={handleChange}
      />

      <button type="submit">Add bridge</button>
    </form>
  )
}
