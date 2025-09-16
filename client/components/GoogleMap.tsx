import { APIProvider, Map } from '@vis.gl/react-google-maps'
export default function GoogleMap() {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        defaultZoom={2}
        center={{ lat: 0, lng: 0 }}
        style={{ width: '100%', height: '400px' }}
      ></Map>
    </APIProvider>
  )
}
