'use client'
import { useEffect } from "react"

/** Dev-only. Lists every IMAGES slot still using a neutral placeholder instead of a
 * real photo. The slot list is computed server-side (see layout.tsx) and passed in as
 * a plain string array, since this component cannot touch fs itself. */
export function ImagePlaceholderWarning({ slots }: { slots: string[] }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return
    if (slots.length > 0) {
      console.warn(
        `[images] ${slots.length} slot(s) are still using a neutral placeholder instead of a real photo:\n` +
          slots.map((slot) => `  - IMAGES.${slot}`).join("\n"),
      )
    }
  }, [slots])
  return null
}
