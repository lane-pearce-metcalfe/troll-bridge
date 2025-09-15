export interface AddBridgeData {
  name: string
  location: string
  type: string
  length: number
  height: number
  year_built: number
  added_by: string | undefined
  troll_owner: string | null
  lat: number
  lng: number
  img_url: string
}

export interface BridgeData extends AddBridgeData {
  id: number
}
