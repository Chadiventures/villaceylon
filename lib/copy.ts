import type { Locale } from "./i18n"
import { exampleRates } from "./prices"

export type L10n = { readonly en: string; readonly sv: string }

export function tx(en: string, sv: string): L10n {
  return { en, sv }
}

export function pick(locale: Locale, text: L10n) {
  return text[locale]
}

const doubleUsd = exampleRates.double
const familyUsd = exampleRates.family

export const copy = {
  meta: {
    homeTitle: tx(
      "The Papaya Tree | Boutique Surf Hotel in Ahangama",
      "The Papaya Tree | Boutiquehotell vid surfen i Ahangama",
    ),
    homeDescription: tx(
      `A seven-room garden hotel in Ahangama, three minutes from the surf. Cool AC rooms from $${doubleUsd}, a pool under the palms. Book direct, free cancellation.`,
      `Ett trädgårdshotell med sju rum i Ahangama, tre minuter från surfen. Svala rum med AC från ${doubleUsd} USD, en pool under palmerna. Boka direkt, fri avbokning.`,
    ),
    homeSocial: tx(
      "Seven rooms in a garden, three minutes from the surf in Ahangama. Book direct, no fees.",
      "Sju rum i en trädgård, tre minuter från surfen i Ahangama. Boka direkt, inga avgifter.",
    ),
    homeTwitter: tx(
      "Boutique surf hotel in Ahangama. Book direct.",
      "Boutiquehotell vid surfen i Ahangama. Boka direkt.",
    ),
    hotel: tx(
      "A seven-room garden hotel in Ahangama, three minutes from the surf.",
      "Ett trädgårdshotell med sju rum i Ahangama, tre minuter från surfen.",
    ),
    roomsTitle: tx(
      `Rooms from $${doubleUsd} a Night in Ahangama`,
      `Rum från ${doubleUsd} USD per natt i Ahangama`,
    ),
    roomsDescription: tx(
      `Six deluxe doubles and one four-bed room at The Papaya Tree. Cool AC rooms from $${doubleUsd} a night, three minutes from Kabalana surf. Book direct.`,
      `Sex deluxe double och ett four-bed på The Papaya Tree. Svala rum med AC från ${doubleUsd} USD per natt, tre minuter från Kabalana. Boka direkt.`,
    ),
    houseTitle: tx(
      "The House: A Garden Hotel, Not a Resort",
      "Huset: ett trädgårdshotell, inte en resort",
    ),
    houseDescription: tx(
      "A small garden hotel in Ahangama with AC rooms, a quiet pool and the sea just past the gate. See what is on site at The Papaya Tree.",
      "Ett litet trädgårdshotell i Ahangama med AC-rum, en lugn pool och havet strax utanför grinden. Se vad som finns på The Papaya Tree.",
    ),
    guideTitle: tx(
      "Ahangama Guide: Surf, Eat, Explore",
      "Ahangama-guiden: surf, mat, utflykter",
    ),
    guideDescription: tx(
      "A local Ahangama guide: where the waves break, where to eat, and what is worth the drive. Free 15-page PDF, yours to keep whether you book or not.",
      "En lokal guide till Ahangama: var vågorna bryter, var man äter och vad som är värt resan. Gratis PDF på 15 sidor, din att behålla oavsett om du bokar eller inte.",
    ),
    bookTitle: tx("Book Direct, No Fees", "Boka direkt, inga avgifter"),
    bookDescription: tx(
      `Reserve a room at The Papaya Tree in Ahangama from $${doubleUsd} a night. Book direct for the best rate and free cancellation up to five days before arrival.`,
      `Boka ett rum på The Papaya Tree i Ahangama från ${doubleUsd} USD per natt. Boka direkt för bästa priset och fri avbokning upp till fem dagar före ankomst.`,
    ),
    bookLead: tx(
      `Rooms from $${doubleUsd} a night. Book direct for the best rate and free cancellation up to five days before you arrive.`,
      `Rum från ${doubleUsd} USD per natt. Boka direkt för bästa priset och fri avbokning upp till fem dagar före ankomst.`,
    ),
    privacyTitle: tx("Privacy Policy | The Papaya Tree", "Integritetspolicy | The Papaya Tree"),
    privacyDescription: tx(
      "How The Papaya Tree collects, uses and protects your information when you enquire or book a room in Ahangama.",
      "Hur The Papaya Tree samlar in, använder och skyddar dina uppgifter när du frågar eller bokar ett rum i Ahangama.",
    ),
    termsTitle: tx("Return Policy | The Papaya Tree", "Returpolicy | The Papaya Tree"),
    termsDescription: tx(
      "Return policy and business terms for The Papaya Tree: prices shown in USD and charged in LKR, a two-night minimum, and free cancellation up to 5 days before arrival.",
      "Returpolicy och affärsvillkor för The Papaya Tree: priser visas i USD och debiteras i LKR, minst två nätter, och fri avbokning upp till 5 dagar före ankomst.",
    ),
    businessTermsTitle: tx("Business Terms & Conditions | The Papaya Tree", "Business Terms & Conditions | The Papaya Tree"),
    businessTermsDescription: tx(
      "Booking terms for The Papaya Tree in Ahangama: prices in USD charged in LKR, a two-night minimum, payment options, and cancellation rules.",
      "Booking terms for The Papaya Tree in Ahangama: prices in USD charged in LKR, a two-night minimum, payment options, and cancellation rules.",
    ),
    cookiesTitle: tx("Cookie Policy | The Papaya Tree", "Cookiepolicy | The Papaya Tree"),
    cookiesDescription: tx(
      "Which cookies thepapayatree.com uses, and how to accept or decline non-essential cookies.",
      "Vilka cookies thepapayatree.com använder, och hur du godkänner eller avvisar icke-nödvändiga cookies.",
    ),
    skip: tx("Skip to content", "Hoppa till innehållet"),
    ogAlt: tx("The Papaya Tree, Ahangama", "The Papaya Tree, Ahangama"),
    amenityAc: tx("Air conditioning", "Luftkonditionering"),
    amenityWifi: tx("Free WiFi", "Gratis wifi"),
    amenityPool: tx("Outdoor pool", "Utomhuspool"),
    amenityRestaurant: tx("Restaurant", "Restaurang"),
    amenityRoof: tx("Rooftop lounge and bar", "Taklounge och bar"),
  },
  nav: {
    rooms: tx("Rooms", "Rum"),
    house: tx("The House", "Huset"),
    guide: tx("Ahangama Guide", "Ahangama-guiden"),
    faq: tx("FAQ", "Vanliga frågor"),
    book: tx("Book now", "Boka nu"),
    primary: tx("Primary", "Huvudmeny"),
    mobile: tx("Mobile", "Mobilmeny"),
    menu: tx("Menu", "Meny"),
    open: tx("Open menu", "Öppna menyn"),
    close: tx("Close menu", "Stäng menyn"),
    whatsapp: tx("WhatsApp us", "WhatsAppa oss"),
    home: tx("Home", "Hem"),
    currency: tx("Choose display currency", "Välj valuta"),
  },
  footer: {
    blurb: tx(
      "Seven rooms in a garden of papaya and palms, three minutes from the surf in Ahangama.",
      "Sju rum i en trädgård av papaya och palmer, tre minuter från surfen i Ahangama.",
    ),
    visit: tx("Visit", "Besök"),
    rooms: tx("The rooms", "Rummen"),
    house: tx("The house", "Huset"),
    book: tx("Book direct", "Boka direkt"),
    guide: tx("Guide", "Guiden"),
    download: tx("Download the guide (PDF)", "Ladda ner guiden (PDF)"),
    contact: tx("Contact", "Kontakt"),
    privacy: tx("Privacy Policy", "Integritetspolicy"),
    terms: tx("Return Policy", "Returpolicy"),
    businessTerms: tx("Business Terms & Conditions", "Business Terms & Conditions"),
    cookies: tx("Cookie Policy", "Cookiepolicy"),
    credit: tx("Built and designed by Shoreline Tech Studio", "Byggd och designad av Shoreline Tech Studio"),
  },
  cookie: {
    label: tx("Cookie preferences", "Cookie-inställningar"),
    body: tx(
      "We use a few cookies to remember your preferences and, if you accept, to understand how guests use the site. See our",
      "Vi använder några cookies för att komma ihåg dina val och, om du godkänner, för att förstå hur gäster använder sajten. Läs vår",
    ),
    policy: tx("cookie policy", "cookiepolicy"),
    decline: tx("Decline non-essential", "Avvisa icke-nödvändiga"),
    accept: tx("Accept", "Godkänn"),
  },
  home: {
    eyebrow: tx("Ahangama, Sri Lanka's south coast", "Ahangama, Sri Lankas sydkust"),
    title: tx("Seven rooms, one garden, three minutes from the", "Sju rum, en trädgård, tre minuter från"),
    titleEm: tx("surf", "surfen"),
    seoTitle: tx("Boutique surf hotel in Ahangama", "Boutiquehotell vid surfen i Ahangama"),
    lead: tx(
      "A small hotel in Ahangama. Pool under the palms, a rooftop for sunset, and Ahangama's surf breaks a short walk away.",
      "Ett litet hotell i Ahangama. Pool under palmerna, ett tak för solnedgången och Ahangamas surfbreaks en kort promenad bort.",
    ),
    seeRooms: tx("See the rooms", "Se rummen"),
    roomCaption: tx("The room, opening to the garden", "Rummet, öppet mot trädgården"),
    roomsEyebrow: tx("The rooms", "Rummen"),
    roomsTitle: tx("Six doubles and a family room", "Sex dubbelrum och ett familjerum"),
    roomsLead: tx(
      "Seven rooms around the garden. Six deluxe doubles on the first and second floors, each 34 square metres with a king size bed, a private balcony and a view of the garden and pool. One deluxe four-bed on the ground floor, with a king size bed, a bunk bed, a private patio and a garden view.",
      "Sju rum runt trädgården. Sex deluxe double på första och andra våningen, 34 kvadratmeter med kingsize-säng, privat balkong och utsikt över trädgård och pool. Ett deluxe four-bed på bottenvåningen, med kingsize-säng, våningssäng, privat uteplats och utsikt över trädgården.",
    ),
    specAc: tx("Air conditioning", "Luftkonditionering"),
    specNet: tx("Internet cable and wifi", "Internetkabel och wifi"),
    specBath: tx("Bathroom", "Badrum"),
    specOutdoor: tx("Balcony or patio", "Balkong eller uteplats"),
    from: tx("from", "från"),
    perNightTwo: tx("/ night, two guests", "/ natt, två gäster"),
    onSite: tx("On site", "På plats"),
    houseTitle: tx("Your home under the palms", "Ditt hem under palmerna"),
    houseLead: tx(
      "Brand new AC rooms to slip into after the sun, a pool ringed with green, and the sea just past the gate. Everything you need, and nothing you have to think about.",
      "Nya rum med AC att sjunka in i efter solen, en pool omgiven av grönt och havet strax utanför grinden. Allt du behöver, och inget du måste tänka på.",
    ),
  },
  bento: {
    pool: tx("The pool, ringed with green", "Poolen, omgiven av grönt"),
    seaTitle: tx("The sea, three minutes on", "Havet, tre minuter bort"),
    sea: tx(
      "The waves and the little town both a barefoot walk or a short tuk-tuk from the gate.",
      "Vågorna och den lilla staden, en barfotapromenad eller en kort tuk-tuk från grinden.",
    ),
    foodTitle: tx("Restaurant, lounge and rooftop bar", "Restaurang, lounge och bar på taket"),
    food: tx(
      "Lazy breakfasts on the ground floor, and a cold drink in the rooftop lounge as the sun drops into the sea.",
      "Långsamma frukostar på bottenvåningen, och en kall drink i takloungen när solen går ner i havet.",
    ),
    sleepTitle: tx("Sleep well", "Sov gott"),
    sleep: tx(
      "Air conditioning, fresh linen and cold filtered water.",
      "Luftkonditionering, rena lakan och kallt filtrerat vatten.",
    ),
    quote: tx(
      "Wake, swim, wander down to the waves, and let the day find its own slow shape.",
      "Vakna, simma, vandra ner till vågorna och låt dagen hitta sin egen långsamma form.",
    ),
    quoteBy: tx("A day at the Papaya Tree", "En dag på Papaya Tree"),
  },
  building: {
    eyebrow: tx("The building", "Byggnaden"),
    title: tx("More than a room", "Mer än ett rum"),
    lead: tx(
      "Seven rooms wrapped around a garden and a pool, with places to gather from the ground floor up to the roof.",
      "Sju rum runt en trädgård och en pool, med platser att samlas från bottenvåningen upp till taket.",
    ),
    groundTitle: tx("Ground floor", "Bottenvåning"),
    ground: tx(
      "Reception, a lounge to sink into, a restaurant, a quiet workspace for the odd email, and fast wifi throughout.",
      "Reception, en lounge att sjunka ner i, restaurang, en lugn arbetsplats för det enstaka mejlet och snabbt wifi i hela våningen.",
    ),
    roofTitle: tx("Rooftop", "Taket"),
    roof: tx(
      "A lounge and bar above the palms, made for a cold drink and a long look at the coast as the sun goes down.",
      "En lounge och bar ovanför palmerna, för en kall drink och en lång blick mot kusten när solen går ner.",
    ),
    gardenTitle: tx("Garden and pool", "Trädgård och pool"),
    garden: tx(
      "A pool ringed with papaya, banana and coconut palms, with shade for the hottest part of the day.",
      "En pool omgiven av papaya, banan och kokospalmer, med skugga när dagen är som varmast.",
    ),
  },
  houseCards: {
    poolTitle: tx("Pool", "Pool"),
    pool: tx("A quiet pool in the garden, open all day.", "En lugn pool i trädgården, öppen hela dagen."),
    restaurantTitle: tx("Restaurant", "Restaurang"),
    restaurant: tx(
      "Breakfast and easy plates downstairs, whenever you're hungry.",
      "Frukost och enkla rätter på bottenvåningen, när du är hungrig.",
    ),
    roofTitle: tx("Rooftop", "Taket"),
    roof: tx(
      "A lounge and bar, and the best sunset seat in the house.",
      "En lounge och bar, och husets bästa plats i solnedgången.",
    ),
    gardenTitle: tx("Garden", "Trädgård"),
    garden: tx("Papaya and palm, with a hammock if you want one.", "Papaya och palm, med en hängmatta om du vill."),
  },
  why: {
    eyebrow: tx("Why book direct", "Varför boka direkt"),
    rate: tx("Best rate, always", "Bästa priset, alltid"),
    flex: tx("Flexible cancellation", "Flexibel avbokning"),
    person: tx("A real person answers on WhatsApp", "En riktig person svarar på WhatsApp"),
  },
  guide: {
    eyebrow: tx("The Ahangama guide", "Ahangama-guiden"),
    title: tx("Everything we'd tell a friend", "Allt vi skulle berätta för en vän"),
    titleBefore: tx("Everything we'd tell a", "Allt vi skulle berätta för en"),
    titleEm: tx("friend", "vän"),
    lead: tx(
      "We live here. This is the guide we wish we'd had: where the waves break, where to eat, and what is worth the drive. Yours to keep, whether you book or not.",
      "Vi bor här. Det här är guiden vi önskar att vi hade haft: var vågorna bryter, var man äter och vad som är värt resan. Din att behålla, oavsett om du bokar eller inte.",
    ),
    download: tx("Download the guide (PDF)", "Ladda ner guiden (PDF)"),
    downloadAria: tx(
      "Download the Ahangama guide as a PDF, 15 pages, yours to keep",
      "Ladda ner Ahangama-guiden som PDF, 15 sidor, din att behålla",
    ),
    coverAria: tx("Download the Ahangama guide PDF", "Ladda ner Ahangama-guiden som PDF"),
    pages: tx("15 pages", "15 sidor"),
    format: tx("A5, print or phone", "A5, utskrift eller telefon"),
    free: tx("Free, no sign-up", "Gratis, ingen registrering"),
    coverAlt: tx("The Papaya Tree Ahangama Guide, cover", "The Papaya Tree Ahangama-guiden, omslag"),
    homeCaption: tx("Free. 15 pages. Surf, eat, explore.", "Gratis. 15 sidor. Surf, mat, utflykter."),
    inside: tx("See what's inside", "Se vad som finns inuti"),
    taste: tx("A taste of what's inside", "En smak av innehållet"),
    peek: tx("Sneak peek", "En tjuvtitt"),
    closeTitle: tx("Get the full guide", "Hämta hela guiden"),
    closeCaption: tx("Yours to keep, whether you book or not.", "Din att behålla, oavsett om du bokar eller inte."),
    hint: tx("15 pages, yours to keep", "15 sidor, din att behålla"),
    cards: {
      surf: {
        label: tx("Surf & fitness", "Surf och träning"),
        desc: tx(
          "Breaks from beginner to reef, the best months, and yoga, pilates and gym studios nearby.",
          "Breaks från nybörjare till rev, de bästa månaderna, och yoga, pilates och gym i närheten.",
        ),
      },
      eat: {
        label: tx("Eat & drink", "Mat och dryck"),
        desc: tx(
          "Brunch, wood-fired pizza, beach bars and local curries, from Ahangama to Mirissa and Weligama.",
          "Brunch, vedeldad pizza, strandbarer och lokala curryrätter, från Ahangama till Mirissa och Weligama.",
        ),
      },
      "things-to-do": {
        label: tx("Things to do", "Att göra"),
        desc: tx(
          "Stilt fishermen at dawn, snorkelling with turtles, spas and a little nightlife.",
          "Styltfiskare i gryningen, snorkling med sköldpaddor, spa och lite nattliv.",
        ),
      },
      "day-trips": {
        label: tx("Day trips", "Dagsutflykter"),
        desc: tx("Galle Fort, tea country and Yala safari.", "Galle Fort, telandet och Yala-safari."),
      },
      "getting-here": {
        label: tx("Getting here", "Hitta hit"),
        desc: tx(
          "From Colombo or Mattala by car, or the slow coastal train to Ahangama station.",
          "Från Colombo eller Mattala med bil, eller det långsamma kusttåget till Ahangama station.",
        ),
      },
      "good-things-to-know": {
        label: tx("Good things to know", "Bra att veta"),
        desc: tx(
          "Tap water, getting around, cash, temple etiquette and the street dogs.",
          "Kranvatten, att ta sig runt, kontanter, tempelvana och gatuhundarna.",
        ),
      },
    },
    peeks: [
      tx(
        "Nomad in Weligama: the best brunch in the south, by our count.",
        "Nomad i Weligama: den bästa brunchen i söder, enligt oss.",
      ),
      tx(
        "Weligama Bay is the best bay on the coast for beginner and intermediate surfers.",
        "Weligama Bay är den bästa bukten på kusten för nybörjare och medelsurfare.",
      ),
      tx(
        "The Doctors House: live music on Saturdays, DJs on Wednesdays, fine dining upstairs.",
        "The Doctors House: livemusik på lördagar, DJ på onsdagar, finare middag en trappa upp.",
      ),
    ],
  },
  rooms: {
    crumb: tx("Rooms", "Rum"),
    doubleCaption: tx("Deluxe double", "Deluxe double"),
    doubleEyebrow: tx("Deluxe double", "Deluxe double"),
    doublePlain: tx(
      `A 34 m² room with a king size bed, a private balcony, air conditioning, an internet cable, WiFi and a bathroom. The view is over the garden and the pool. From $${doubleUsd} a night.`,
      `Ett rum på 34 kvm med kingsize-säng, privat balkong, AC, internetkabel, wifi och badrum. Utsikt över trädgård och pool. Från ${doubleUsd} USD per natt.`,
    ),
    doubleTitle: tx("A room for two, up in the light", "Ett rum för två, uppe i ljuset"),
    doubleMeta: tx("Sleeps 2 · King size bed · First and second floors", "2 gäster · Kingsize-säng · Första och andra våningen"),
    perNightTwo: tx("/ night, two guests", "/ natt, två gäster"),
    near: tx("Surf two minutes away. Restaurants nearby.", "Surfen två minuter bort. Restauranger i närheten."),
    seeGuide: tx("See the Ahangama guide", "Se Ahangama-guiden"),
    availability: tx("Check availability", "Se tillgänglighet"),
    whatsapp: tx("WhatsApp", "WhatsApp"),
    familyEyebrow: tx("Deluxe four-bed", "Deluxe four-bed"),
    familyCaption: tx("Deluxe four-bed", "Deluxe four-bed"),
    familyPlain: tx(
      "A 34 m² ground-floor room with a king size bed and a bunk bed, a private patio, air conditioning, an internet cable, WiFi and a bathroom. The view is over the garden, not the pool.",
      "Ett rum på 34 kvm på bottenvåningen med kingsize-säng och våningssäng, privat uteplats, AC, internetkabel, wifi och badrum. Utsikt över trädgården, inte poolen.",
    ),
    familyTitle: tx("Room for the whole crew", "Plats för hela sällskapet"),
    familyMeta: tx("Sleeps 4 · King size bed + bunk · Ground floor", "4 gäster · Kingsize-säng + våningssäng · Bottenvåning"),
    perNightFour: tx("/ night, four guests", "/ natt, fyra gäster"),
    includesLead: tx("Every room includes", "Alla rum har"),
    includes: tx(
      "air conditioning, a bathroom, an internet cable and WiFi. The six Deluxe Doubles have a private balcony and a view of the garden and pool. The Deluxe Four-Bed has a private patio and a view of the garden.",
      "luftkonditionering, badrum, internetkabel och wifi. De sex Deluxe Double har privat balkong och utsikt över trädgård och pool. Deluxe Four-Bed har privat uteplats och utsikt över trädgården.",
    ),
    faqNote: tx("See the FAQ for our", "Se vanliga frågor för vår"),
    cancelLink: tx("cancellation policy", "avbokningspolicy"),
    and: tx("and", "och"),
    priceLink: tx("room prices", "rumspriser"),
    schemaDouble: tx(
      `A double room of 34 m2 with a king size bed, a private balcony, air conditioning, an internet cable, WiFi and a bathroom. View of the garden and pool, from $${doubleUsd} a night.`,
      `Ett dubbelrum på 34 kvm med kingsize-säng, privat balkong, AC, internetkabel, wifi och badrum. Utsikt över trädgård och pool, från ${doubleUsd} USD per natt.`,
    ),
    schemaFamily: tx(
      `A ground-floor room of 34 m2 with a king size bed and a bunk bed, a private patio, air conditioning, an internet cable, WiFi and a bathroom. Garden view, not the pool. From $${familyUsd} a night.`,
      `Ett rum på bottenvåningen, 34 kvm, med kingsize-säng och våningssäng, privat uteplats, AC, internetkabel, wifi och badrum. Utsikt över trädgården, inte poolen. Från ${familyUsd} USD per natt.`,
    ),
  },
  compare: {
    eyebrow: tx("Compare", "Jämför"),
    title: tx("Choose your room", "Välj rum"),
    double: tx("Deluxe double", "Deluxe double"),
    family: tx("Deluxe four-bed", "Deluxe four-bed"),
    sleeps: tx("Sleeps", "Gäster"),
    bed: tx("Bed", "Säng"),
    floor: tx("Floor", "Våning"),
    size: tx("Size", "Yta"),
    from: tx("From", "Från"),
    king: tx("King size", "Kingsize"),
    kingBunk: tx("King size + bunk", "Kingsize + våningssäng"),
    floors: tx("1st / 2nd", "1 / 2"),
    ground: tx("Ground", "Botten"),
    perNight: tx("/ night", "/ natt"),
  },
  house: {
    eyebrow: tx("On site", "På plats"),
    title: tx("A small house with a big garden", "Ett litet hus med en stor trädgård"),
    seoTitle: tx("The House: A Garden Hotel, Not a Resort", "Huset: ett trädgårdshotell, inte en resort"),
    lead: tx(
      "Seven rooms around the pool. Breakfast downstairs, a drink on the roof, and nothing you have to rush.",
      "Sju rum runt poolen. Frukost på bottenvåningen, en drink på taket, och inget du måste skynda dig till.",
    ),
    crumb: tx("The House", "Huset"),
    near: tx("Surf two minutes away. Restaurants nearby. FAQ:", "Surfen två minuter bort. Restauranger i närheten. Vanliga frågor:"),
    pool: tx("the pool", "poolen"),
    food: tx("food and drink", "mat och dryck"),
    dayEyebrow: tx("A day at The Papaya Tree", "En dag på The Papaya Tree"),
    dayTitle: tx("An unhurried kind of day", "En dag utan brådska"),
    map: tx(
      "Munidasa Mawatha, Ahangama. A three-minute walk to Kabalana, one of Ahangama's different surf breaks.",
      "Munidasa Mawatha, Ahangama. Tre minuters promenad till Kabalana, ett av Ahangamas olika surfbreaks.",
    ),
    more: tx("Want more? Read the full", "Vill du ha mer? Läs hela"),
    guide: tx("Ahangama guide", "Ahangama-guiden"),
    or: tx(", or see", ", eller se"),
    getting: tx("getting here in the FAQ", "hitta hit i vanliga frågor"),
  },
  day: [
    {
      time: tx("Dawn", "Gryning"),
      title: tx("First light on the water", "Första ljuset över vattnet"),
      text: tx(
        "The garden is quiet. A few guests are already gone, boards under their arms, down the lane to Kabalana before the wind picks up.",
        "Trädgården är tyst. Några gäster har redan gått, brädor under armen, nerför gränden till Kabalana innan vinden tar i.",
      ),
    },
    {
      time: tx("Morning", "Morgon"),
      title: tx("Breakfast, slowly", "Frukost, långsamt"),
      text: tx(
        "Fruit, eggs, good coffee, on the ground floor with the doors open to the garden. No rush. Nobody here is on a schedule.",
        "Frukt, ägg, gott kaffe, på bottenvåningen med dörrarna öppna mot trädgården. Ingen brådska. Ingen här har ett schema.",
      ),
    },
    {
      time: tx("Midday", "Middag"),
      title: tx("The pool, or nothing at all", "Poolen, eller ingenting alls"),
      text: tx(
        "The heat settles in. Most people are in the pool, in a hammock, or back in their room with the AC on and a book open.",
        "Värmen lägger sig. De flesta är i poolen, i en hängmatta, eller tillbaka på rummet med AC:n på och en bok uppslagen.",
      ),
    },
    {
      time: tx("Afternoon", "Eftermiddag"),
      title: tx("Out, or still in", "Ute, eller kvar"),
      text: tx(
        "Some days it's a tuk-tuk to Galle Fort or lunch in Mirissa. Other days it's just the garden, and that is enough.",
        "Vissa dagar blir det en tuk-tuk till Galle Fort eller lunch i Mirissa. Andra dagar räcker trädgården.",
      ),
    },
    {
      time: tx("Sunset", "Solnedgång"),
      title: tx("Up on the roof", "Upp på taket"),
      text: tx(
        "The rooftop lounge and bar fill slowly as the light goes gold, then pink. It's the one appointment most guests keep every day.",
        "Takloungen och baren fylls långsamt när ljuset blir guld, sedan rosa. Det är den enda tiden de flesta gäster håller varje dag.",
      ),
    },
    {
      time: tx("Night", "Kväll"),
      title: tx("Easy and early", "Lugnt och tidigt"),
      text: tx(
        "Dinner in or out, then bed with the ceiling fan on and the sea somewhere in the dark past the gate. Tomorrow starts the same way.",
        "Middag inne eller ute, sedan säng med takfläkten på och havet någonstans i mörkret bortom grinden. I morgon börjar på samma sätt.",
      ),
    },
  ],
  cta: {
    eyebrow: tx("Book direct", "Boka direkt"),
    title: tx("Your room is waiting", "Ditt rum väntar"),
    lead: tx(
      "Seven rooms. Three minutes to the waves. Book direct and we will look after the rest.",
      "Sju rum. Tre minuter till vågorna. Boka direkt så tar vi hand om resten.",
    ),
    availability: tx("Check availability", "Se tillgänglighet"),
    whatsapp: tx("Message on WhatsApp", "Meddelande på WhatsApp"),
  },
  sticky: {
    from: tx("From", "Från"),
    night: tx("/ night", "/ natt"),
    availability: tx("Check availability", "Se tillgänglighet"),
  },
  whatsapp: {
    label: tx("Message The Papaya Tree on WhatsApp", "Meddelande till The Papaya Tree på WhatsApp"),
  },
  faqPage: {
    eyebrow: tx("FAQ", "Vanliga frågor"),
    title: tx("Questions, answered", "Frågor, besvarade"),
    lead: tx(
      "Everything about staying at The Papaya Tree in Ahangama, Sri Lanka. Can't find it?",
      "Allt om att bo på The Papaya Tree i Ahangama, Sri Lanka. Hittar du det inte?",
    ),
    message: tx("Message us on WhatsApp", "Skriv till oss på WhatsApp"),
    updated: tx("Last updated:", "Senast uppdaterad:"),
    sections: tx("FAQ sections", "Avsnitt"),
    pdf: tx("Want our local tips? Download the Ahangama guide (PDF)", "Vill du ha våra lokala tips? Ladda ner Ahangama-guiden (PDF)"),
    download: tx("Download the guide (PDF)", "Ladda ner guiden (PDF)"),
    more: tx("Learn more", "Läs mer"),
    quick: tx("Quick answers", "Korta svar"),
    booking: tx("Booking answers", "Svar om bokning"),
    month: tx("October 2026", "oktober 2026"),
  },
  book: {
    eyebrow: tx("Book direct", "Boka direkt"),
    title: tx("Book your stay", "Boka din vistelse"),
    crumb: tx("Book", "Boka"),
    loading: tx("Loading booking form…", "Laddar bokningsformuläret…"),
    cancel: tx("Cancellation policy", "Avbokningspolicy"),
    why: tx("why book direct", "varför boka direkt"),
    find: tx("Find us", "Hitta oss"),
  },
  policy: {
    title: tx("Return policy and Business Terms & Conditions", "Returpolicy och affärsvillkor"),
    hint: tx("Free cancellation up to 5 days before arrival. Full refund.", "Fri avbokning upp till 5 dagar före ankomst. Full återbetalning."),
    items: [
      tx(
        "Prices are displayed in USD, but the transaction is in LKR.",
        "Priser visas i USD, men transaktionen sker i LKR.",
      ),
      tx("Minimum stay is two nights.", "Minsta vistelse är två nätter."),
      tx(
        "When you book direct, you can pay for two nights and pay for the additional nights at the hotel on arrival, or pay for the whole stay at once. Either way the same cancellation rules apply.",
        "Vid direktbokning kan du betala för två nätter och betala resterande nätter på hotellet vid ankomst, eller betala hela vistelsen på en gång. Samma avbokningsregler gäller i båda fallen.",
      ),
      tx(
        "Cancellation is free up to 5 days before arrival, with a full refund.",
        "Avbokning är kostnadsfri upp till 5 dagar före ankomst, med full återbetalning.",
      ),
      tx("Late cancellation or no-show: no refund.", "Sen avbokning eller utebliven ankomst: ingen återbetalning."),
      tx(
        "The same cancellation rules apply to airport pickup and transfer.",
        "Samma avbokningsregler gäller för flygplatsupphämtning och transfer.",
      ),
      tx("Check-in from 14:00. Check-out at 11:00.", "Incheckning från 14:00. Utcheckning kl. 11:00."),
      tx(
        "Shortening your stay less than 5 days before arrival: the removed nights are non-refundable.",
        "Om du kortar vistelsen mindre än 5 dagar före ankomst är de borttagna nätterna inte återbetalningsbara.",
      ),
      tx(
        "Approved refunds return to your original payment method within 5 to 10 business days.",
        "Godkända återbetalningar går tillbaka till samma betalningssätt inom 5 till 10 arbetsdagar.",
      ),
      tx(
        "The same cancellation terms apply whether you book here, on Airbnb or on Booking.com.",
        "Samma avbokningsvillkor gäller oavsett om du bokar här, på Airbnb eller på Booking.com.",
      ),
    ],
  },
  search: {
    checkIn: tx("Check in", "Incheckning"),
    checkOut: tx("Check out", "Utcheckning"),
    addDate: tx("Add date", "Välj datum"),
    guests: tx("Guests", "Gäster"),
    availability: tx("Check availability", "Se tillgänglighet"),
    chooseIn: tx("Choose check in", "Välj incheckning"),
    chooseOut: tx("Choose check out", "Välj utcheckning"),
    chooseGuests: tx("Choose guests", "Välj antal gäster"),
    lessGuests: tx("Decrease guests", "Färre gäster"),
    moreGuests: tx("Increase guests", "Fler gäster"),
    done: tx("Done", "Klar"),
    prevMonth: tx("Previous month", "Föregående månad"),
    nextMonth: tx("Next month", "Nästa månad"),
    clear: tx("Clear", "Rensa"),
    suggested: tx("Suggested:", "Förslag:"),
    or: tx(", or ", ", eller "),
    night: tx("night", "natt"),
    nights: tx("nights", "nätter"),
    pickDates: tx("Pick your dates, max", "Välj datum, max"),
    maxNights: tx("nights", "nätter"),
    minStay: tx("Minimum stay is 2 nights.", "Minsta vistelse är 2 nätter."),
  },
  form: {
    datesMissing: tx("Choose your dates in the search bar above.", "Välj datum i sökfältet ovan."),
    nameMissing: tx("Let us know your name.", "Skriv ditt namn."),
    emailMissing: tx("Add an email so we can reply.", "Lägg till en e-postadress så vi kan svara."),
    rooms: tx("Rooms", "Rum"),
    guests: tx("Guests", "Gäster"),
    upTo: tx("Up to", "Upp till"),
    guest: tx("guest", "gäst"),
    guestsWord: tx("guests", "gäster"),
    room: tx("room", "rum"),
    roomsWord: tx("rooms", "rum"),
    done: tx("Done", "Klar"),
    picker: tx("Rooms and guests", "Rum och gäster"),
    lessRooms: tx("Decrease", "Minska"),
    moreRooms: tx("Increase", "Öka"),
    name: tx("Name", "Namn"),
    namePh: tx("Your name", "Ditt namn"),
    email: tx("Email", "E-post"),
    note: tx("Anything we should know", "Något vi bör veta"),
    notePh: tx("Arrival time, surf plans, anything at all", "Ankomsttid, surfplaner, vad som helst"),
    to: tx("to", "till"),
    taxes: tx("Taxes and fees included.", "Skatter och avgifter ingår."),
    minStay: tx("Minimum stay is two nights.", "Minsta vistelse är två nätter."),
    payLegend: tx("How you pay", "Hur du betalar"),
    payDeposit: tx("Pay 2 nights now", "Betala 2 nätter nu"),
    payDepositNote: tx("The rest is paid at the hotel on arrival.", "Resten betalas på hotellet vid ankomst."),
    payFull: tx("Pay the whole stay now", "Betala hela vistelsen nu"),
    dueNow: tx("Due now", "Att betala nu"),
    atHotel: tx("Pay at the hotel", "Betalas på hotellet"),
    stayTotal: tx("Stay total", "Vistelsen totalt"),
    freeCancel: tx("Free cancellation up to 5 days before check-in.", "Fri avbokning upp till 5 dagar före incheckning."),
    live: tx("Live availability. Book and pay securely in one step.", "Tillgänglighet i realtid. Boka och betala säkert i ett steg."),
    book: tx("Book now", "Boka nu"),
    availability: tx("Check availability", "Se tillgänglighet"),
    continue: tx("Choose your dates to continue.", "Välj datum för att fortsätta."),
    thanks: tx("Thanks! Your booking details are on their way to us now.", "Tack! Dina bokningsuppgifter är på väg till oss nu."),
    questions: tx("Questions?", "Frågor?"),
    message: tx("Message us", "Skriv till oss"),
    addDates: tx("Add your dates to see your price.", "Lägg till datum för att se priset."),
    fit: tx("These rooms fit", "De här rummen rymmer"),
    youHave: tx(", you have", ", du har"),
  },
  map: {
    open: tx("Open in Google Maps", "Öppna i Google Maps"),
    title: tx("Map of The Papaya Tree in Ahangama", "Karta över The Papaya Tree i Ahangama"),
  },
  gallery: {
    close: tx("Close", "Stäng"),
    prev: tx("Previous photo", "Föregående bild"),
    next: tx("Next photo", "Nästa bild"),
  },
  concierge: {
    greeting: tx(
      "Hi, I'm Amaya, the virtual concierge for The Papaya Tree. Ask me anything about the rooms, the property, or getting here.",
      "Hej, jag är Amaya, den virtuella conciergen på The Papaya Tree. Fråga mig om rummen, huset eller hur du tar dig hit.",
    ),
    fallback: tx(
      "Sorry, I can't reach the desk just now. Message the team on WhatsApp and they'll help you right away.",
      "Jag når inte receptionen just nu. Skriv till teamet på WhatsApp så hjälper de dig direkt.",
    ),
    rate: tx(
      "You've sent quite a few notes this hour. Message the team on WhatsApp and they'll pick it up.",
      "Du har skickat ganska många meddelanden den här timmen. Skriv till teamet på WhatsApp så tar de vid.",
    ),
    title: tx("Amaya · Virtual Concierge", "Amaya · Virtuell concierge"),
    chat: tx("Chat with Amaya", "Chatta med Amaya"),
    close: tx("Close chat", "Stäng chatten"),
    typing: tx("Amaya is typing", "Amaya skriver"),
    whatsapp: tx("Message on WhatsApp", "Meddelande på WhatsApp"),
    placeholder: tx("Ask about your stay", "Fråga om din vistelse"),
    message: tx("Message Amaya", "Meddelande till Amaya"),
    send: tx("Send", "Skicka"),
    ask: tx("Ask us anything", "Fråga oss vad som helst"),
  },
  notFound: {
    title: tx("This path washed away", "Den här stigen spolades bort"),
    lead: tx("We can't find that page. It may have moved, or the tide took it.", "Vi hittar inte sidan. Den kan ha flyttats, eller så tog tidvattnet den."),
    availability: tx("Check availability", "Se tillgänglighet"),
    rooms: tx("See the rooms", "Se rummen"),
    guide: tx("Open the guide", "Öppna guiden"),
  },
  error: {
    eyebrow: tx("Something went wrong", "Något gick fel"),
    title: tx("A small wave knocked us over", "En liten våg välte oss"),
    lead: tx("Try again in a moment, or go back to somewhere steadier.", "Försök igen om en stund, eller gå tillbaka till något stadigare."),
    again: tx("Try again", "Försök igen"),
    rooms: tx("See the rooms", "Se rummen"),
    guide: tx("Open the guide", "Öppna guiden"),
    availability: tx("Check availability", "Se tillgänglighet"),
  },
  legal: {
    eyebrow: tx("Legal", "Juridiskt"),
    privacyCrumb: tx("Privacy", "Integritet"),
    privacyTitle: tx("Privacy Policy", "Integritetspolicy"),
    privacySeo: tx("Privacy Policy", "Integritetspolicy"),
    termsCrumb: tx("Terms", "Villkor"),
    termsTitle: tx("Return Policy", "Returpolicy"),
    termsSeo: tx("Return Policy", "Returpolicy"),
    businessTermsTitle: tx("Business Terms & Conditions", "Business Terms & Conditions"),
    businessTermsSeo: tx("Business Terms & Conditions", "Business Terms & Conditions"),
    businessTermsUpdated: tx("Last updated: 6 October 2026", "Last updated: 6 October 2026"),
    cookiesCrumb: tx("Cookies", "Cookies"),
    cookiesTitle: tx("Cookie Policy", "Cookiepolicy"),
    cookiesSeo: tx("Cookie Policy", "Cookiepolicy"),
  },
  terms: [
    {
      h: tx("Changes to a booking", "Ändringar av en bokning"),
      p: tx(
        "To change your dates or room, message us on WhatsApp or email. We will do our best to move your booking where availability allows.",
        "För att ändra datum eller rum, skriv på WhatsApp eller e-post. Vi gör vårt bästa för att flytta bokningen när det finns plats.",
      ),
    },
    {
      h: tx("Questions", "Frågor"),
      p: tx(
        "Write to us or message us on WhatsApp and we will help directly.",
        "Skriv till oss eller skicka ett meddelande på WhatsApp så hjälper vi dig direkt.",
      ),
    },
  ],
  cookies: [
    {
      h: tx("Essential cookies", "Nödvändiga cookies"),
      p: tx(
        "A small cookie remembers your currency, your language and whether you have answered the cookie banner. The site uses these to keep your choices.",
        "En liten cookie kommer ihåg din valuta, ditt språk och om du har svarat på cookie-bannern. Sajten använder dem för att behålla dina val.",
      ),
    },
    {
      h: tx("Analytics cookies", "Analyscookies"),
      p: tx(
        "We only load analytics after you choose Accept in the cookie banner. You can change your mind at any time by clearing your browser cookies for this site.",
        "Vi laddar bara analys efter att du valt Godkänn i cookie-bannern. Du kan ändra dig när som helst genom att rensa webbläsarens cookies för den här sajten.",
      ),
    },
    {
      h: tx("Your choice", "Ditt val"),
      p: tx(
        "Choosing Decline non-essential keeps analytics switched off. Either choice lets you browse and book normally.",
        "Om du väljer Avvisa icke-nödvändiga är analys avstängd. Båda valen låter dig läsa och boka som vanligt.",
      ),
    },
  ],
} as const

export function photoOpen(locale: Locale, index: number, total: number, alt: string) {
  return locale === "sv"
    ? `Öppna bild ${index} av ${total}: ${alt}`
    : `Open photo ${index} of ${total}: ${alt}`
}

export function photoShow(locale: Locale, index: number, alt?: string) {
  if (locale === "sv") return alt ? `Visa bild ${index}: ${alt}` : `Visa bild ${index}`
  return alt ? `Show photo ${index}: ${alt}` : `Show photo ${index}`
}

export function photoGroup(locale: Locale, caption: string) {
  return locale === "sv" ? `${caption}, bilder` : `${caption} photos`
}

export function nightLabel(locale: Locale, count: number) {
  if (locale === "sv") return count === 1 ? "natt" : "nätter"
  return count === 1 ? "night" : "nights"
}

export function guestWord(locale: Locale, count: number) {
  if (locale === "sv") return count === 1 ? "gäst" : "gäster"
  return count === 1 ? "guest" : "guests"
}

export function roomWord(locale: Locale, count: number) {
  if (locale === "sv") return "rum"
  return count === 1 ? "room" : "rooms"
}

export function checkTimes(locale: Locale, checkIn: string, checkOut: string) {
  return locale === "sv"
    ? `Incheckning från ${checkIn}. Utcheckning senast ${checkOut}. Skriv på WhatsApp om du behöver komma tidigare eller åka senare, så försöker vi hjälpa till.`
    : `Check-in is from ${checkIn}. Check-out is by ${checkOut}. Message us on WhatsApp if you need to arrive earlier or leave later and we will try to help.`
}

export function termsContact(locale: Locale, email: string, phone: string) {
  return locale === "sv"
    ? `Skriv till oss på ${email} eller WhatsApp ${phone} så hjälper vi dig direkt.`
    : `Write to us at ${email} or message us on WhatsApp at ${phone} and we will help directly.`
}

export function fitMessage(locale: Locale, cap: number, guests: number) {
  return locale === "sv"
    ? `De här rummen rymmer ${cap} ${guestWord(locale, cap)}, du har ${guests}.`
    : `These rooms fit ${cap} ${guestWord(locale, cap)}, you have ${guests}.`
}
