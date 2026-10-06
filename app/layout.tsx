import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { cookies } from "next/headers"
import { Cinzel, Cormorant_Garamond, Instrument_Sans } from "next/font/google"
import { CookieConsent } from "../components/CookieConsent"
import { CurrencyProvider } from "../components/CurrencyContext"
import { Footer } from "../components/Footer"
import { GuideScroll } from "../components/GuideScroll"
import { Header, SkipLink } from "../components/Header"
import { ImagePlaceholderWarning } from "../components/ImagePlaceholderWarning"
import { getResolvedImages, placeholderSlots } from "../lib/images.server"
import { JsonLd } from "../components/JsonLd"
import { LazyConcierge } from "../components/LazyConcierge"
import { Motion } from "../components/Motion"
import { OverlayProvider } from "../components/OverlayContext"
import { PreLaunchGate } from "../components/PreLaunchGate"
import { SearchProvider } from "../components/search/SearchContext"
import { StickyBookBar } from "../components/StickyBookBar"
import { WhatsAppFab } from "../components/WhatsAppFab"
import { copy } from "../lib/copy"
import { stripLocale } from "../lib/i18n"
import { getLocale, getRequestPath } from "../lib/locale"
import { blockIndexing, languageAlternates, pageMetadata } from "../lib/seo"
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const path = stripLocale(await getRequestPath())
  const page = pageMetadata({
    title: copy.meta.homeTitle[locale],
    description: copy.meta.homeDescription[locale],
    path: path === "/" ? "/" : path,
    locale,
    absoluteTitle: true,
  })
  return {
    ...page,
    metadataBase: new URL(site.url),
    title: {
      default: copy.meta.homeTitle[locale],
      template: `%s | ${site.name}`,
    },
    description: copy.meta.homeDescription[locale],
    alternates: {
      canonical: page.alternates?.canonical,
      languages: languageAlternates(path === "/" ? "/" : path),
    },
    openGraph: {
      ...page.openGraph,
      type: "website",
      siteName: site.name,
      description: copy.meta.homeSocial[locale],
    },
    twitter: {
      ...page.twitter,
      title: site.name,
      description: copy.meta.homeTwitter[locale],
    },
    robots: blockIndexing
      ? { index: false, follow: false }
      : { index: true, follow: true },
    manifest: "/manifest.webmanifest",
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#243F34",
  colorScheme: "light",
}

function hotelJsonLd(locale: "en" | "sv") {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: site.name,
    url: site.url,
    image: [`${site.url}${site.ogImage}`],
    description: copy.meta.hotel[locale],
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
      { "@type": "LocationFeatureSpecification", name: copy.meta.amenityAc[locale], value: true },
      { "@type": "LocationFeatureSpecification", name: copy.meta.amenityWifi[locale], value: true },
      { "@type": "LocationFeatureSpecification", name: copy.meta.amenityPool[locale], value: true },
      { "@type": "LocationFeatureSpecification", name: copy.meta.amenityRestaurant[locale], value: true },
      { "@type": "LocationFeatureSpecification", name: copy.meta.amenityRoof[locale], value: true },
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

const POLICY_PATHS = ["/privacy", "/cookies", "/terms", "/business-terms"]

function readEnv(name: string) {
  return process.env[name]
}

function isPolicyPath(path: string) {
  const bare = stripLocale(path).replace(/\/+$/, "") || "/"
  return POLICY_PATHS.includes(bare)
}

async function prelaunchGated() {
  if (readEnv("PRELAUNCH_MODE") !== "on") return false
  if (isPolicyPath(await getRequestPath())) return false
  const key = readEnv("PREVIEW_KEY")
  const preview = (await cookies()).get("pt_preview")?.value
  return !(key && preview === key)
}

function Frame({ locale, children }: { locale: "en" | "sv"; children: ReactNode }) {
  return (
    <>
      <SkipLink />
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
      <JsonLd data={hotelJsonLd(locale)} />
    </>
  )
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale()
  const hero = getResolvedImages().home.hero.src
  const gated = await prelaunchGated()
  const frame = <Frame locale={locale}>{children}</Frame>
  return (
    <html lang={locale} className={`${serif.variable} ${caps.variable} ${sans.variable}${gated ? " prelaunch-gated" : ""}`}>
      <head>
        <link rel="preload" as="image" href={hero} />
      </head>
      <body className={gated ? "prelaunch-gated" : undefined}>
        {gated ? <div className="prelaunch-site" aria-hidden="true" inert>{frame}</div> : frame}
        {gated ? <PreLaunchGate /> : null}
      </body>
    </html>
  )
}
