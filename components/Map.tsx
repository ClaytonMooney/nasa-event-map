"use client"

import { useEffect, useState } from "react"
import "leaflet/dist/leaflet.css"

type Event = {
  id: number
  title: string
  category: string
  position: [number, number]
}

export default function Map() {
  const [MapContainer, setMapContainer] = useState<any>(null)
  const [TileLayer, setTileLayer] = useState<any>(null)
  const [Marker, setMarker] = useState<any>(null)
  const [Popup, setPopup] = useState<any>(null)
  const [Icon, setIcon] = useState<any>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    import("leaflet").then((L) => {
      delete (L.Icon.Default as any).prototype._getIconUrl
      setIcon(L.Icon)
      import("react-leaflet").then((reactLeaflet) => {
        setMapContainer(() => reactLeaflet.MapContainer)
        setTileLayer(() => reactLeaflet.TileLayer)
        setMarker(() => reactLeaflet.Marker)
        setPopup(() => reactLeaflet.Popup)
      })
    })

    fetch("/map_data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load events")
        return res.json()
      })
      .then((data: Event[]) => setEvents(Array.isArray(data) ? data : []))
      .catch((err: any) => setError(err.message))
  }, [])

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>
  if (!MapContainer) return <div className="p-4 text-gray-500">Loading map...</div>

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      className="h-screen w-full z-0"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {events.map((event) => (
        <Marker
          key={event.id}
          position={event.position}
          icon={Icon ? new Icon.Default() : undefined}
        >
          <Popup>
            <div>
              <h3 className="font-bold text-lg">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.category}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
