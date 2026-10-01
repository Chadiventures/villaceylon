import type { Locale } from "./i18n"
import { exampleRates } from "./prices"
import { faqSv } from "./faq.sv"

export type FaqCategoryId =
  | "booking-and-policies"
  | "rooms-and-facilities"
  | "food-and-drink"
  | "getting-here"
  | "surf-and-the-area"
  | "practical-tips"

export type FaqItem = {
  id: string
  category: FaqCategoryId
  question: string
  answer: string
  href?: string
  hrefLabel?: string
}

export type FaqGroup = { id: FaqCategoryId; title: string; items: FaqItem[] }

export type FaqLdSource = Pick<FaqItem, "question" | "answer"> | { q: string; a: string }

export const FAQ_UPDATED = "October 2026"

export const FAQ_TITLE = "FAQ: Staying at The Papaya Tree, Ahangama | Boutique Hotel Sri Lanka"

export const FAQ_DESCRIPTION =
  `Answers on rooms from $${exampleRates.double}, cancellation, the pool, food on site and how to reach The Papaya Tree in Ahangama. Still unsure? Message us on WhatsApp.`

export const FAQ_CATEGORIES: { id: FaqCategoryId; title: string }[] = [
  { id: "booking-and-policies", title: "Booking and policies" },
  { id: "rooms-and-facilities", title: "Rooms and facilities" },
  { id: "food-and-drink", title: "Food and drink" },
  { id: "getting-here", title: "Getting here" },
  { id: "surf-and-the-area", title: "Surf and the area" },
  { id: "practical-tips", title: "Practical tips" },
]

/** Owner or copy TODOs. Do not publish these on /faq or in FAQPage JSON-LD. */
export const FAQ_UNPUBLISHED = [
  "How do I pay?",
  "Extra perks for booking direct",
  "Is breakfast included?",
  "Is the tap water safe to drink?",
  "Airport transfer confirmation extras",
] as const

export const faqItems: FaqItem[] = [
  {
    id: "cancellation",
    category: "booking-and-policies",
    question: "What is the cancellation policy?",
    answer:
      "Free cancellation up to 5 days before check-in for a full refund. Within 5 days of check-in the booking is non-refundable, and a no-show is non-refundable. If you shorten your stay less than 5 days before check-in, the removed nights are non-refundable. Approved refunds return to the original payment method within 5 to 10 business days. The same terms apply whether you book here, on Airbnb or on Booking.com.",
  },
  {
    id: "cheaper-direct",
    category: "booking-and-policies",
    question: "Is it cheaper to book direct?",
    answer:
      "Yes, booking direct gives you the best rate we offer, with free cancellation up to 5 days before check-in. The same cancellation terms apply on Airbnb and Booking.com, but the lowest price is on this site. Your total for the dates you pick shows before you confirm, with no booking fees added.",
  },
  {
    id: "room-cost",
    category: "booking-and-policies",
    question: "How much does a room cost?",
    answer:
      `Rooms start from $${exampleRates.double} a night for a Deluxe Double and $${exampleRates.family} a night for the Deluxe Four-Bed. The total for your dates shows before you book. Prices are per room, and booking direct is the best rate we offer.`,
  },
  {
    id: "check-in-out",
    category: "booking-and-policies",
    question: "What time is check-in and check-out?",
    answer:
      "The desk is open from 2pm for check-in. Check-out is by 11am. If your flight lands at an odd hour, message us and we will do our best. Write on WhatsApp with your arrival time and we will try to help on the day.",
  },
  {
    id: "how-many-rooms",
    category: "rooms-and-facilities",
    question: "How many rooms are there?",
    answer:
      "There are seven rooms: six Deluxe Doubles on the first and second floors, and one Deluxe Four-Bed on the ground floor. Together they sleep up to 16 guests. Every room has air conditioning, an internet cable, WiFi and a bathroom.",
  },
  {
    id: "deluxe-double",
    category: "rooms-and-facilities",
    question: "What is a Deluxe Double like?",
    answer:
      `A Deluxe Double is 34 square metres with a king size bed and a private balcony. It has air conditioning, an internet cable, WiFi and a bathroom, and the view is over the garden and the pool. It sleeps two and starts from $${exampleRates.double} a night.`,
  },
  {
    id: "family-room",
    category: "rooms-and-facilities",
    question: "What is the family room like?",
    answer:
      `The Deluxe Four-Bed is 34 square metres on the ground floor, with a king size bed and a bunk bed, so it sleeps four. It has a private patio, air conditioning, an internet cable, WiFi and a bathroom. The view is over the garden, not the pool. It starts from $${exampleRates.family} a night.`,
  },
  {
    id: "all-rooms-facilities",
    category: "rooms-and-facilities",
    question: "Do all rooms have air conditioning and WiFi?",
    answer:
      "Yes. Every room has air conditioning, an internet cable, WiFi and a bathroom. Each Deluxe Double is 34 square metres, with a private balcony and a view of the garden and pool. The Deluxe Four-Bed is also 34 square metres, with a private patio and a garden view.",
  },
  {
    id: "pool",
    category: "rooms-and-facilities",
    question: "Is there a swimming pool?",
    answer:
      "Yes, there is a pool in the garden. The six Deluxe Doubles look over the garden and the pool. The Deluxe Four-Bed looks over the garden, not the pool. You can swim without leaving the grounds, and the house sleeps up to 16 guests.",
  },
  {
    id: "restaurant",
    category: "food-and-drink",
    question: "Is there a restaurant?",
    answer:
      "Yes. The ground floor has a reception, a lounge, a restaurant and a workspace, with WiFi throughout. You can eat and sit downstairs without leaving the house. The rooftop lounge and bar are upstairs if you want a drink after the beach.",
  },
  {
    id: "rooftop-bar",
    category: "food-and-drink",
    question: "Is there a rooftop bar?",
    answer:
      "Yes, the roof has a lounge and a bar. The ground floor holds the reception, lounge, restaurant and a workspace, with WiFi. Come up for a drink after the beach, or stay downstairs for dinner in the restaurant.",
  },
  {
    id: "airport",
    category: "getting-here",
    question: "How far is the airport?",
    answer:
      "Colombo Bandaranaike (CMB) is about 2 to 2.5 hours by car from The Papaya Tree. Mattala Rajapaksa (HRI) is about 1.5 hours. You can also take the train from Colombo to Ahangama, then a short tuk-tuk to the hotel.",
  },
  {
    id: "train",
    category: "getting-here",
    question: "Can I take the train to Ahangama?",
    answer:
      "Yes, you can take the train from Colombo to Ahangama. From Ahangama station, tuk-tuks reach The Papaya Tree in about 3 minutes. If you prefer a car, Colombo airport (CMB) is about 2 to 2.5 hours by road.",
  },
  {
    id: "tours",
    category: "getting-here",
    question: "Do you run tours or a transfer desk?",
    answer:
      "We do not have a tours desk. We can point you to locals for cars, tuk-tuks and day trips. Message us on WhatsApp before you arrive if you want a name or a number.",
  },
  {
    id: "tuk-tuks",
    category: "getting-here",
    question: "How do I get around Ahangama?",
    answer:
      "Tuk-tuks reach The Papaya Tree in about 3 minutes and are the easy way around Ahangama. You do not need a scooter for the beach or town. For longer trips we can point you to local drivers.",
  },
  {
    id: "surf-distance",
    category: "surf-and-the-area",
    question: "How far is the surf?",
    answer:
      "Kabalana beach is a 3-minute walk from The Papaya Tree. Midigama is about 10 minutes away and Weligama about 15 minutes. Beginners often start at Kabalana or Weligama, both close enough for a short tuk-tuk.",
  },
  {
    id: "surf-season",
    category: "surf-and-the-area",
    question: "When is the best time to surf?",
    answer:
      "November to April is the best time to surf in Ahangama. December to March is the peak swell season. May to October is quieter, with warmer rain and fewer crowds on the breaks.",
  },
  {
    id: "beginners",
    category: "surf-and-the-area",
    question: "Is it good for beginner surfers?",
    answer:
      "Yes, beginners surf here. Kabalana and Weligama both suit first waves, and Kabalana is a 3-minute walk from the house. Midigama is about 10 minutes away when you want a step up.",
  },
  {
    id: "yoga",
    category: "surf-and-the-area",
    question: "Is there yoga or pilates nearby?",
    answer:
      "Yes, yoga and pilates studios are nearby in Ahangama. We can point you to local teachers. Many guests go in the morning, then walk the 3 minutes to Kabalana for a surf.",
  },
  {
    id: "day-trips",
    category: "surf-and-the-area",
    question: "What day trips are close by?",
    answer:
      "Galle is about 30 minutes away. Whale watching from Mirissa is about 45 minutes and runs from December to April. Tea country and Yala National Park are each about 2 hours by car.",
  },
  {
    id: "cash",
    category: "practical-tips",
    question: "Do I need cash in Ahangama?",
    answer:
      "Yes, bring cash for small shops in Ahangama. Larger places often take cards, but small shops usually want rupees. Keep a little cash on you for tuk-tuks, snacks and fruit stalls.",
  },
  {
    id: "temples",
    category: "practical-tips",
    question: "How should I dress at temples?",
    answer:
      "Dress respectfully at temples: cover your shoulders and knees. This is the usual custom at temples across Sri Lanka, including those near Ahangama and Galle. A light scarf is enough for most visits.",
  },
  {
    id: "street-dogs",
    category: "practical-tips",
    question: "Are there street dogs in Ahangama?",
    answer:
      "Yes, there are street dogs in Ahangama. If you want to help, look up @thedzikoproject. Give the dogs space around town and do not feed them at the hotel gate.",
  },
  {
    id: "best-time",
    category: "practical-tips",
    question: "When is the best time to visit?",
    answer:
      "It is warm all year in Ahangama. November to April is the best stretch for weather and surf. December to March is the busiest; May to October is quieter and still good for a stay.",
  },
]

export const faqGroups: FaqGroup[] = FAQ_CATEGORIES.map((category) => ({
  id: category.id,
  title: category.title,
  items: faqItems.filter((item) => item.category === category.id),
}))

export const seedFaq = {
  book: faqItems.filter((item) => item.id === "cancellation" || item.id === "cheaper-direct"),
  surf: faqItems.filter((item) => item.id === "surf-season" || item.id === "beginners"),
  gettingHere: faqItems.filter((item) => item.id === "airport" || item.id === "train"),
}

export function faqQuestion(item: FaqLdSource) {
  return "question" in item ? item.question : item.q
}

export function faqAnswer(item: FaqLdSource) {
  return "answer" in item ? item.answer : item.a
}

export function faqAnswerPlain(answer: string) {
  return answer.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
}

export function wordCount(text: string) {
  const words = faqAnswerPlain(text).split(/\s+/).filter(Boolean)
  return words.length
}

export function faqContent(locale: Locale = "en") {
  if (locale === "sv") return faqSv
  return {
    title: FAQ_TITLE,
    description: FAQ_DESCRIPTION,
    updated: FAQ_UPDATED,
    categories: FAQ_CATEGORIES,
    items: faqItems,
    groups: faqGroups,
    seed: seedFaq,
  }
}

export function faqPageLd(items: FaqLdSource[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: faqQuestion(item),
      acceptedAnswer: { "@type": "Answer", text: faqAnswerPlain(faqAnswer(item)) },
    })),
  }
}
