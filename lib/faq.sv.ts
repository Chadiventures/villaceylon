import type { FaqCategoryId, FaqGroup, FaqItem } from "./faq"
import { exampleRates } from "./prices"

const categories: { id: FaqCategoryId; title: string }[] = [
  { id: "booking-and-policies", title: "Bokning och villkor" },
  { id: "rooms-and-facilities", title: "Rum och faciliteter" },
  { id: "food-and-drink", title: "Mat och dryck" },
  { id: "getting-here", title: "Hitta hit" },
  { id: "surf-and-the-area", title: "Surf och området" },
  { id: "practical-tips", title: "Bra att veta" },
]

const items: FaqItem[] = [
  {
    id: "cancellation",
    category: "booking-and-policies",
    question: "Vad är avbokningsvillkoren?",
    answer:
      "Avbokning är kostnadsfri upp till 5 dagar före ankomst, med full återbetalning. Sen avbokning eller utebliven ankomst ger ingen återbetalning. Om du kortar vistelsen mindre än 5 dagar före ankomst är de borttagna nätterna inte återbetalningsbara. Godkända återbetalningar går tillbaka till samma betalningssätt inom 5 till 10 arbetsdagar. Vid direktbokning kan du betala för två nätter och betala resterande nätter på hotellet vid ankomst, eller betala hela vistelsen på en gång. Samma avbokningsregler gäller i båda fallen, även för flygplatsupphämtning och transfer. Priser visas i USD och transaktionen sker i LKR. Minsta vistelse är två nätter. Samma avbokningsvillkor gäller oavsett om du bokar här, på Airbnb eller på Booking.com.",
  },
  {
    id: "cheaper-direct",
    category: "booking-and-policies",
    question: "Är det billigare att boka direkt?",
    answer:
      "Ja, att boka direkt ger det bästa priset vi erbjuder, med fri avbokning upp till 5 dagar före incheckning. Samma avbokningsvillkor gäller på Airbnb och Booking.com, men lägsta priset finns på den här sajten. Totalsumman för de datum du väljer visas innan du bekräftar, utan bokningsavgifter.",
  },
  {
    id: "room-cost",
    category: "booking-and-policies",
    question: "Vad kostar ett rum?",
    answer:
      `Rummen börjar från ${exampleRates.double} USD per natt för ett Deluxe Double och ${exampleRates.family} USD per natt för Deluxe Four-Bed. Totalsumman för dina datum visas innan du bokar. Priserna är per rum och visas i USD, men transaktionen sker i LKR. Att boka direkt är det bästa priset vi erbjuder.`,
  },
  {
    id: "check-in-out",
    category: "booking-and-policies",
    question: "Vilken tid är incheckning och utcheckning?",
    answer:
      "Receptionen är öppen från 14 för incheckning. Utcheckning är senast 11. Om ditt flyg landar vid en udda tid, skriv till oss så gör vi vårt bästa. Skicka ett WhatsApp med din ankomsttid så försöker vi hjälpa till samma dag.",
  },
  {
    id: "how-many-rooms",
    category: "rooms-and-facilities",
    question: "Hur många rum finns det?",
    answer:
      "Det finns sju rum: sex Deluxe Double på första och andra våningen, och ett Deluxe Four-Bed på bottenvåningen. Tillsammans rymmer de upp till 16 gäster. Alla rum har luftkonditionering, internetkabel, wifi och badrum.",
  },
  {
    id: "deluxe-double",
    category: "rooms-and-facilities",
    question: "Hur är ett Deluxe Double?",
    answer:
      `Ett Deluxe Double är 34 kvadratmeter med kingsize-säng och privat balkong. Det har luftkonditionering, internetkabel, wifi och badrum, och utsikt över trädgård och pool. Det rymmer två och börjar från ${exampleRates.double} USD per natt.`,
  },
  {
    id: "family-room",
    category: "rooms-and-facilities",
    question: "Hur är familjerummet?",
    answer:
      `Deluxe Four-Bed är 34 kvadratmeter på bottenvåningen, med kingsize-säng och våningssäng, så det rymmer fyra. Det har privat uteplats, luftkonditionering, internetkabel, wifi och badrum. Utsikten är över trädgården, inte poolen. Det börjar från ${exampleRates.family} USD per natt.`,
  },
  {
    id: "all-rooms-facilities",
    category: "rooms-and-facilities",
    question: "Har alla rum luftkonditionering och wifi?",
    answer:
      "Ja. Alla rum har luftkonditionering, internetkabel, wifi och badrum. Varje Deluxe Double är 34 kvadratmeter, med privat balkong och utsikt över trädgård och pool. Deluxe Four-Bed är också 34 kvadratmeter, med privat uteplats och utsikt över trädgården.",
  },
  {
    id: "pool",
    category: "rooms-and-facilities",
    question: "Finns det en pool?",
    answer:
      "Ja, det finns en pool i trädgården. De sex Deluxe Double har utsikt över trädgård och pool. Deluxe Four-Bed har utsikt över trädgården, inte poolen. Du kan bada utan att lämna tomten, och huset rymmer upp till 16 gäster.",
  },
  {
    id: "restaurant",
    category: "food-and-drink",
    question: "Finns det en restaurang?",
    answer:
      "Ja. Bottenvåningen har reception, lounge, restaurang och en arbetsplats, med wifi i hela våningen. Du kan äta och sitta där nere utan att lämna huset. På taket finns lounge och bar om du vill ha en drink efter stranden.",
  },
  {
    id: "rooftop-bar",
    category: "food-and-drink",
    question: "Finns det en takbar?",
    answer:
      "Ja, taket har en lounge och en bar. Bottenvåningen har reception, lounge, restaurang och en arbetsplats, med wifi. Kom upp och ta en drink efter stranden, eller stanna nere och ät middag i restaurangen.",
  },
  {
    id: "airport",
    category: "getting-here",
    question: "Hur långt är det till flygplatsen?",
    answer:
      "Colombo Bandaranaike (CMB) är ungefär 2 till 2,5 timmar med bil från The Papaya Tree. Mattala Rajapaksa (HRI) är ungefär 1,5 timmar. Du kan också ta tåget från Colombo till Ahangama och sedan en kort tuk-tuk till hotellet.",
  },
  {
    id: "train",
    category: "getting-here",
    question: "Kan jag ta tåget till Ahangama?",
    answer:
      "Ja, du kan ta tåget från Colombo till Ahangama. Från Ahangama station når en tuk-tuk The Papaya Tree på ungefär 3 minuter. Om du hellre tar bil är Colombo flygplats (CMB) ungefär 2 till 2,5 timmar på vägen.",
  },
  {
    id: "tours",
    category: "getting-here",
    question: "Har ni utflykter eller en transferdisk?",
    answer:
      "Vi har ingen utflyktsdisk. Vi kan tipsa om lokala förare för bil, tuk-tuk och dagsutflykter. Skriv på WhatsApp innan du kommer om du vill ha ett namn eller ett nummer.",
  },
  {
    id: "tuk-tuks",
    category: "getting-here",
    question: "Hur tar jag mig runt i Ahangama?",
    answer:
      "Tuk-tuks når The Papaya Tree på ungefär 3 minuter och är det enkla sättet att ta sig runt i Ahangama. Du behöver ingen scooter för stranden eller stan. För längre turer kan vi tipsa om lokala förare.",
  },
  {
    id: "surf-distance",
    category: "surf-and-the-area",
    question: "Hur långt är det till surfen?",
    answer:
      "Kabalana beach är tre minuters promenad från The Papaya Tree. Midigama är ungefär 10 minuter bort och Weligama ungefär 15 minuter. Nybörjare börjar ofta vid Kabalana eller Weligama, båda nära nog för en kort tuk-tuk.",
  },
  {
    id: "surf-season",
    category: "surf-and-the-area",
    question: "När är det bäst att surfa?",
    answer:
      "November till april är den bästa tiden att surfa i Ahangama. December till mars är högsäsong för dyning. Maj till oktober är lugnare, med varmare regn och färre folk i lineupen.",
  },
  {
    id: "beginners",
    category: "surf-and-the-area",
    question: "Passar det nybörjare?",
    answer:
      "Ja, nybörjare surfar här. Både Kabalana och Weligama passar de första vågorna, och Kabalana är tre minuters promenad från huset. Midigama är ungefär 10 minuter bort när du vill ta nästa steg.",
  },
  {
    id: "yoga",
    category: "surf-and-the-area",
    question: "Finns det yoga eller pilates i närheten?",
    answer:
      "Ja, yoga- och pilatesstudior finns i närheten i Ahangama. Vi kan tipsa om lokala lärare. Många gäster går på morgonen och promenerar sedan de tre minuterna till Kabalana för en surf.",
  },
  {
    id: "day-trips",
    category: "surf-and-the-area",
    question: "Vilka dagsutflykter ligger nära?",
    answer:
      "Galle är ungefär 30 minuter bort. Valspaning från Mirissa är ungefär 45 minuter och går från december till april. Telandet och Yala nationalpark är vardera ungefär 2 timmar med bil.",
  },
  {
    id: "cash",
    category: "practical-tips",
    question: "Behöver jag kontanter i Ahangama?",
    answer:
      "Ja, ta med kontanter till små butiker i Ahangama. Större ställen tar ofta kort, men små butiker vill oftast ha rupier. Ha lite kontanter för tuk-tuk, snacks och fruktstånd.",
  },
  {
    id: "temples",
    category: "practical-tips",
    question: "Hur ska jag klä mig vid tempel?",
    answer:
      "Klä dig respektfullt vid tempel: täck axlar och knän. Det är den vanliga seden vid tempel i Sri Lanka, även nära Ahangama och Galle. En tunn sjal räcker för de flesta besök.",
  },
  {
    id: "street-dogs",
    category: "practical-tips",
    question: "Finns det gatuhundar i Ahangama?",
    answer:
      "Ja, det finns gatuhundar i Ahangama. Om du vill hjälpa till, sök upp @thedzikoproject. Ge hundarna utrymme i stan och mata dem inte vid hotellets grind.",
  },
  {
    id: "best-time",
    category: "practical-tips",
    question: "När är det bäst att resa hit?",
    answer:
      "Det är varmt året runt i Ahangama. November till april är den bästa perioden för väder och surf. December till mars är som mest fullbokat. Maj till oktober är lugnare och fortfarande en bra tid att bo här.",
  },
]

const groups: FaqGroup[] = categories.map((category) => ({
  id: category.id,
  title: category.title,
  items: items.filter((item) => item.category === category.id),
}))

export const faqSv = {
  title: "Vanliga frågor: Att bo på The Papaya Tree, Ahangama | Boutiquehotell Sri Lanka",
  description:
    `Svar om rum från ${exampleRates.double} USD, avbokning, poolen, mat på plats och hur du tar dig till The Papaya Tree i Ahangama. Osäker? Skriv till oss på WhatsApp.`,
  updated: "oktober 2026",
  categories,
  items,
  groups,
  seed: {
    book: items.filter((item) => item.id === "cancellation" || item.id === "cheaper-direct"),
    surf: items.filter((item) => item.id === "surf-season" || item.id === "beginners"),
    gettingHere: items.filter((item) => item.id === "airport" || item.id === "train"),
  },
}
