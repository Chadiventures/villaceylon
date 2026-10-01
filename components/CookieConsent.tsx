'use client'
import Link from "next/link"
import Script from "next/script"
import { useEffect, useState } from "react"
import { useOverlay } from "./OverlayContext"

type Consent = "accepted" | "declined"

// Set NEXT_PUBLIC_GA_ID to a real Google Analytics measurement ID to enable analytics.
// Analytics only ever loads after the visitor accepts in the banner below.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null)
  const [ready, setReady] = useState(false)
  const { chromeHidden } = useOverlay()

  useEffect(() => {
    const saved = window.localStorage.getItem("ptCookieConsent") as Consent | null
    setConsent(saved)
    setReady(true)
  }, [])

  function choose(value: Consent) {
    window.localStorage.setItem("ptCookieConsent", value)
    setConsent(value)
  }

  return (
    <>
      {consent === "accepted" && GA_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      ) : null}
      {ready && !consent && !chromeHidden ? (
        <div className="cookie-banner" role="dialog" aria-label="Cookie preferences">
          <div className="cookie-banner-inner">
            <p>We use a few cookies to remember your preferences and, if you accept, to understand how guests use the site. See our <Link href="/cookies">cookie policy</Link>.</p>
            <div className="cookie-actions">
              <button type="button" className="btn btn-line" onClick={() => choose("declined")}>Decline non-essential</button>
              <button type="button" className="btn btn-amber" onClick={() => choose("accepted")}>Accept</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
