'use client'
import Link from "next/link"
import Script from "next/script"
import { useEffect, useState } from "react"
import { copy } from "../lib/copy"
import { localizePath } from "../lib/i18n"
import { useOverlay } from "./OverlayContext"
import { useLocale } from "./useLocale"

type Consent = "accepted" | "declined"

// Set NEXT_PUBLIC_GA_ID to a real Google Analytics measurement ID to enable analytics.
// Analytics only ever loads after the visitor accepts in the banner below.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null)
  const [ready, setReady] = useState(false)
  const { chromeHidden } = useOverlay()
  const locale = useLocale()

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
        <div className="cookie-banner" role="dialog" aria-label={copy.cookie.label[locale]}>
          <div className="cookie-banner-inner">
            <p>{copy.cookie.body[locale]} <Link href={localizePath("/cookies", locale)}>{copy.cookie.policy[locale]}</Link>.</p>
            <div className="cookie-actions">
              <button type="button" className="btn btn-line" onClick={() => choose("declined")}>{copy.cookie.decline[locale]}</button>
              <button type="button" className="btn btn-amber" onClick={() => choose("accepted")}>{copy.cookie.accept[locale]}</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
