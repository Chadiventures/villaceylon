import type { CSSProperties } from "react"

export function Palm({ style, flip }: { style?: CSSProperties; flip?: boolean }) {
  return (
    <svg className={flip ? "decor flip" : "decor"} style={style} width="240" viewBox="0 0 300 300" fill="none" aria-hidden="true">
      <g stroke="#243F34" strokeWidth="2" strokeLinecap="round" opacity="0.55">
        <path d="M20 280 C90 220 160 150 250 40" />
        <path d="M20 280 C70 240 150 200 240 120" />
        <path d="M20 280 C120 250 200 210 270 150" />
        <path d="M20 280 C60 200 120 120 210 40" />
        <path d="M20 280 C100 240 180 180 250 90" />
      </g>
    </svg>
  )
}
