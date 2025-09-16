import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps'
import { useBridges } from '../hooks/useBridges'
import { BridgeData } from '../../models/bridges'
export default function GoogleMap() {
  const { data } = useBridges()

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        defaultZoom={10}
        defaultCenter={{ lat: -36.8485, lng: 174.7633 }}
        style={{ width: '100%', height: '400px' }}
        mapId={import.meta.env.VITE_MAP_ID}
      >
        {data.map((bridge: BridgeData, index: number) => (
          <AdvancedMarker
            position={{ lat: bridge.lat, lng: bridge.lng }}
            key={index}
          />
        ))}
      </Map>
    </APIProvider>
  )
}
