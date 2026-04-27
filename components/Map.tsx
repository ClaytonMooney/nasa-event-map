"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import iconUrl from "leaflet/dist/images/marker-icon.png"
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png"
import shadowUrl from "leaflet/dist/images/marker-shadow.png"

L.Icon.Default.mergeOptions({
  iconUrl: iconUrl.src,
  iconRetinaUrl: iconRetinaUrl.src,
  shadowUrl: shadowUrl.src,
})

type EventItem = {
  id: number
  title: string
  category: string
  position: [number, number]
}

export default function Map() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/map_data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load events")
        return res.json()
      })
      .then((data: EventItem[]) => setEvents(Array.isArray(data) ? data : []))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : String(err)))
  }, [])

  if (error) return <div style={{ padding: 16, color: "red" }}>Error: {error}</div>

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100vh", width: "100%" }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {events.map((event) => (
        <Marker key={event.id} position={event.position}>
          <Popup>
            <strong>{event.title}</strong>
            <br />
            {event.category}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
