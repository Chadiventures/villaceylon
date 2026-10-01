import type { MetadataRoute } from "next"
import { site } from "../lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Papaya Tree",
    description: "A seven-room garden hotel in Ahangama, three minutes from the surf.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5EDDA",
    theme_color: "#243F34",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  }
}
