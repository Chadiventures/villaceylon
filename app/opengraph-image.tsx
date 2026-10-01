import { ImageResponse } from "next/og"
import { site } from "../lib/site"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #243F34 0%, #8C6E45 55%, #F4C863 100%)",
          color: "#F5EDDA",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, textTransform: "uppercase", opacity: 0.85 }}>{site.name}</div>
        <div style={{ fontSize: 64, marginTop: 24, fontStyle: "italic", textAlign: "center", padding: "0 60px" }}>
          Boutique surf hotel in Ahangama
        </div>
      </div>
    ),
    { ...size },
  )
}
