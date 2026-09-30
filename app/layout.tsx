import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Cinzel, Cormorant_Garamond, Instrument_Sans } from "next/font/google"
import { Concierge } from "../components/Concierge"
import { Footer } from "../components/Footer"
import { GuideScroll } from "../components/GuideScroll"
import { Header } from "../components/Header"
import { Motion } from "../components/Motion"
import "./globals.css"

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
})

const caps = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caps",
})

const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "The Papaya Tree",
  description: "Seven identical rooms in a garden in Ahangama, three minutes from the surf.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${caps.variable} ${sans.variable}`}>
      <body>
        <Header />
        <GuideScroll />
        <main>{children}</main>
        <Footer />
        <Concierge />
        <Motion />
      </body>
    </html>
  )
}
