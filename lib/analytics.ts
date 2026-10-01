type WindowWithGtag = Window & { gtag?: (...args: unknown[]) => void }

/** No-op-safe analytics helper. Fires gtag if present; otherwise just logs in dev. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  const win = window as WindowWithGtag
  if (typeof win.gtag === "function") {
    win.gtag("event", name, params)
  }
}
