import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { Cinzel, Cormorant_Garamond, Instrument_Sans } from "next/font/google"
import { CookieConsent } from "../components/CookieConsent"
import { CurrencyProvider } from "../components/CurrencyContext"
import { Footer } from "../components/Footer"
import { GuideScroll } from "../components/GuideScroll"
import { Header } from "../components/Header"
import { ImagePlaceholderWarning } from "../components/ImagePlaceholderWarning"
import { IMAGES, placeholderSlots } from "../lib/images"
import { JsonLd } from "../components/JsonLd"
import { LazyConcierge } from "../components/LazyConcierge"
import { Motion } from "../components/Motion"
import { OverlayProvider } from "../components/OverlayContext"
import { SearchProvider } from "../components/search/SearchContext"
import { StickyBookBar } from "../components/StickyBookBar"
import { WhatsAppFab } from "../components/WhatsAppFab"
import { hasRating, site, trust } from "../lib/site"
import "./globals.css"
import "./mobile.css"

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
})

const caps = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caps",
  display: "swap",
})

const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "The Papaya Tree | Boutique Surf Hotel in Ahangama",
    template: "%s | The Papaya Tree",
  },
  description: "A seven-room garden hotel in Ahangama, three minutes from the surf. Cool AC rooms from $65, a pool under the palms. Book direct, free cancellation.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "The Papaya Tree",
    locale: "en_US",
    url: "/",
    title: "The Papaya Tree | Boutique Surf Hotel in Ahangama",
    description: "Seven rooms in a garden, three minutes from the surf in Ahangama. Book direct, no fees.",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: "The Papaya Tree, Ahangama" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Papaya Tree",
    description: "Boutique surf hotel in Ahangama. Book direct.",
    images: [site.ogImage],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#243F34",
  colorScheme: "light",
}

function hotelJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: site.name,
    url: site.url,
    image: [`${site.url}${site.ogImage}`],
    description: "A seven-room garden hotel in Ahangama, three minutes from the surf.",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    telephone: site.phoneE164,
    email: site.email,
    priceRange: "$$",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Air conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Outdoor pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
      { "@type": "LocationFeatureSpecification", name: "Rooftop bar", value: true },
    ],
    checkinTime: site.checkIn,
    checkoutTime: site.checkOut,
    numberOfRooms: site.rooms,
  }
  if (hasRating()) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: trust.ratingValue,
      reviewCount: trust.reviewCount,
    }
  }
  return data
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${caps.variable} ${sans.variable}`}>
      <head>
        <link rel="preload" as="image" href={IMAGES.home.hero.src} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <CurrencyProvider>
          <SearchProvider>
            <OverlayProvider>
              <Header />
              <GuideScroll />
              <main id="main-content">{children}</main>
              <Footer />
              <StickyBookBar />
              <WhatsAppFab />
              <LazyConcierge />
              <CookieConsent />
            </OverlayProvider>
          </SearchProvider>
        </CurrencyProvider>
        <ImagePlaceholderWarning slots={placeholderSlots()} />
        <Motion />
        <JsonLd data={hotelJsonLd()} />
      </body>
    </html>
  )
}
