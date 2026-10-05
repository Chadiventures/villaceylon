import type { Locale } from "../../lib/i18n"

export const WEEKDAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
export const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]
const WEEKDAY_LABELS_SV = ["Må", "Ti", "On", "To", "Fr", "Lö", "Sö"]
const MONTH_LABELS_SV = [
  "januari", "februari", "mars", "april", "maj", "juni",
  "juli", "augusti", "september", "oktober", "november", "december",
]
export const MIN_STAY_NIGHTS = 2
export const DEPOSIT_NIGHTS = 2
export const MAX_STAY_NIGHTS = 30
const SHORT_WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const SHORT_WEEKDAYS_SV = ["sön", "mån", "tis", "ons", "tors", "fre", "lör"]
const SHORT_MONTHS_SV = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"]

export function calendarLabels(locale: Locale = "en") {
  if (locale === "sv") return { weekdays: WEEKDAY_LABELS_SV, months: MONTH_LABELS_SV }
  return { weekdays: WEEKDAY_LABELS, months: MONTH_LABELS }
}

export function toIso(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export function fromIso(iso: string) {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function addMonths(date: Date, count: number) {
  return new Date(date.getFullYear(), date.getMonth() + count, 1)
}

export function addDays(date: Date, count: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + count)
  return next
}

export function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

/** "Sat 17 Oct", used for the check in and check out cell values. */
export function formatDateLabel(iso: string, locale: Locale = "en") {
  if (!iso) return ""
  const date = fromIso(iso)
  const weekdays = locale === "sv" ? SHORT_WEEKDAYS_SV : SHORT_WEEKDAYS
  const months = locale === "sv" ? SHORT_MONTHS_SV : SHORT_MONTHS
  return `${weekdays[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`
}

export function nightsBetweenIso(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0
  const nights = (fromIso(checkOut).getTime() - fromIso(checkIn).getTime()) / 86400000
  return nights > 0 ? Math.round(nights) : 0
}

export function isPastDate(date: Date, today = startOfDay(new Date())) {
  return date < today
}

export function isCheckoutDisabled(date: Date, checkIn: string, today = startOfDay(new Date())) {
  if (isPastDate(date, today)) return true
  if (!checkIn) return false
  const start = fromIso(checkIn)
  const nights = Math.round((date.getTime() - start.getTime()) / 86400000)
  return nights < MIN_STAY_NIGHTS || nights > MAX_STAY_NIGHTS
}

export function checkoutStillValid(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return false
  const nights = nightsBetweenIso(checkIn, checkOut)
  return nights >= MIN_STAY_NIGHTS && nights <= MAX_STAY_NIGHTS
}

export function paymentSplit(nights: number, mode: "deposit" | "full") {
  const stay = Math.max(0, nights)
  if (mode === "full") return { due: stay, balance: 0 }
  const due = Math.min(DEPOSIT_NIGHTS, stay)
  return { due, balance: stay - due }
}

export function buildMonthGrid(monthStart: Date) {
  const firstWeekday = (monthStart.getDay() + 6) % 7
  const daysInMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate()
  const cells: (Date | null)[] = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(monthStart.getFullYear(), monthStart.getMonth(), day))
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}
