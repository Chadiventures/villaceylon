export const WEEKDAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
export const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]
export const MAX_STAY_NIGHTS = 30
const SHORT_WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

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
export function formatDateLabel(iso: string) {
  if (!iso) return ""
  const date = fromIso(iso)
  return `${SHORT_WEEKDAYS[date.getDay()]} ${date.getDate()} ${SHORT_MONTHS[date.getMonth()]}`
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
  if (date <= start) return true
  const nights = Math.round((date.getTime() - start.getTime()) / 86400000)
  return nights > MAX_STAY_NIGHTS
}

export function checkoutStillValid(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return false
  const nights = nightsBetweenIso(checkIn, checkOut)
  return nights >= 1 && nights <= MAX_STAY_NIGHTS
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
