import { useId } from "react"

export function FlagSv() {
  return (
    <svg className="flag" viewBox="0 0 16 10" width="18" height="12" aria-hidden="true">
      <rect width="16" height="10" fill="#006AA7" />
      <rect x="5" width="2" height="10" fill="#FECC00" />
      <rect y="4" width="16" height="2" fill="#FECC00" />
    </svg>
  )
}

export function FlagGb() {
  const raw = useId().replace(/:/g, "")
  const clipId = `flag-gb-${raw}`
  return (
    <svg className="flag" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true">
      <clipPath id={clipId}>
        <path d="M0,0 h60 v30 h-60 z" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <path d="M0,0 h60 v30 h-60 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}
