import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NASA Event Map",
  description: "Interactive map of NASA events",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
