"use client"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => <div style={{ padding: 16 }}>Loading map…</div>,
})

export default function Home() {
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const handler = (e: ErrorEvent) => setError(e.message)
    window.addEventListener("error", handler)
    return () => window.removeEventListener("error", handler)
  }, [])
  if (error) return <div style={{ padding: 16, color: "red" }}>Runtime error: {error}</div>
  return <Map />
}
