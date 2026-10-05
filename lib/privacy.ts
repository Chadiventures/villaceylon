import { tx, type L10n } from "./copy"

export const privacyAdopted = tx("Adopted 14-09-2026, Version: 1.1", "Antagen 14-09-2026, version 1.1")

export const privacyUpdated = tx(
  "Privacy Policy last updated: 14-09-2026",
  "Integritetspolicyn uppdaterades senast: 14-09-2026",
)

export type PrivacyBlock =
  | { kind: "p"; text: L10n }
  | { kind: "list"; items: readonly L10n[] }
  | { kind: "cookies"; text: L10n }
  | { kind: "email" }
  | { kind: "whatsapp" }

export type PrivacySection = {
  heading: L10n
  blocks: readonly PrivacyBlock[]
  children?: readonly PrivacySection[]
}

function p(en: string, sv: string): PrivacyBlock {
  return { kind: "p", text: tx(en, sv) }
}

function list(items: readonly (readonly [string, string])[]): PrivacyBlock {
  return { kind: "list", items: items.map(([en, sv]) => tx(en, sv)) }
}

function section(
  en: string,
  sv: string,
  blocks: readonly PrivacyBlock[],
  children?: readonly PrivacySection[],
): PrivacySection {
  return { heading: tx(en, sv), blocks, children }
}

export const privacyPolicy: readonly PrivacySection[] = [
  section(
    "Summary of data protection at The Papaya Tree (Private) Limited",
    "Sammanfattning av dataskydd hos The Papaya Tree (Private) Limited",
    [
      p(
        "This privacy policy (“Privacy Policy”) describes how The Papaya Tree (Private) Limited (“The Papaya Tree”) uses information that we collect, or that you as a guest, customer or supplier provide to us, for the following main reasons:",
        "Den här integritetspolicyn (“integritetspolicyn”) beskriver hur The Papaya Tree (Private) Limited (“The Papaya Tree”) använder information som vi samlar in, eller som du som gäst, kund eller leverantör lämnar till oss, av följande huvudsakliga skäl:",
      ),
      list([
        [
          "To be able to manage and administer your booking at our hotel.",
          "För att kunna hantera och administrera din bokning på vårt hotell.",
        ],
        [
          "In order to be able to respond to questions or comments received via e-mail, we need to process e-mail, name and any other personal data provided via e-mail.",
          "För att kunna svara på frågor eller kommentarer som vi får via e-post behöver vi behandla e-postadress, namn och andra personuppgifter som lämnas via e-post.",
        ],
        [
          "In order to be able to fulfil the legal obligations imposed on us by, for example, the Accounting Act, we need to store accounting data, which may contain personal data, for a prescribed period of time.",
          "För att kunna fullgöra de rättsliga skyldigheter som åligger oss enligt till exempel bokföringslagen behöver vi lagra bokföringsuppgifter, som kan innehålla personuppgifter, under föreskriven tid.",
        ],
        [
          "We have security in place to protect ourselves against external and internal threats and process technical logs where personal data may be found.",
          "Vi har säkerhet på plats för att skydda oss mot externa och interna hot och behandlar tekniska loggar där personuppgifter kan förekomma.",
        ],
      ]),
      p(
        "You can find information on how to contact us under the heading “Who do you contact if you have any questions” below.",
        "Du hittar information om hur du kontaktar oss under rubriken “Vem kontaktar du om du har frågor” nedan.",
      ),
    ],
  ),
  section(
    "1. Background, scope and responsibility for personal data",
    "1. Bakgrund, omfattning och ansvar för personuppgifter",
    [
      p(
        "This privacy policy (“Privacy Policy”) describes how The Papaya Tree processes your Personal Data within the framework of the Hotel’s operations. “Personal Data” means any information that can be directly or indirectly linked to a physical, living person.",
        "Den här integritetspolicyn (“integritetspolicyn”) beskriver hur The Papaya Tree behandlar dina personuppgifter inom ramen för hotellets verksamhet. Med “personuppgifter” avses all information som direkt eller indirekt kan kopplas till en fysisk, levande person.",
      ),
      p(
        "In this Privacy Policy, we describe the situations in which The Papaya Tree processes your Personal Data, the legal basis on which we rely for this, how we protect your data and how you can exercise your data rights under applicable data protection legislation.",
        "I den här integritetspolicyn beskriver vi i vilka situationer The Papaya Tree behandlar dina personuppgifter, vilken rättslig grund vi stödjer oss på, hur vi skyddar dina uppgifter och hur du kan utöva dina rättigheter enligt tillämplig dataskyddslagstiftning.",
      ),
      p(
        "The Papaya Tree is an independent data controller for the customer and is registered and stored in a central system for booking and invoicing. The Papaya Tree is also an independent data controller for the processing of personal data collected via our website.",
        "The Papaya Tree är en självständig personuppgiftsansvarig för kunden, och uppgifterna registreras och lagras i ett centralt system för bokning och fakturering. The Papaya Tree är också självständig personuppgiftsansvarig för behandling av personuppgifter som samlas in via vår webbplats.",
      ),
      p(
        "The responsibility relates to the administration of your personal data in connection with:",
        "Ansvaret avser administrationen av dina personuppgifter i samband med:",
      ),
      list([
        ["Booking of hotel rooms", "Bokning av hotellrum"],
        ["Invoicing of hotel rooms and ordered services", "Fakturering av hotellrum och beställda tjänster"],
      ]),
      p(
        "We process your Personal Data when you use our services (the “Services”) in the manner set out below in this Privacy Policy. We care about your privacy and comply with applicable legislation that aims to protect you as an individual. This Privacy Policy sets out the basis on which we process the Personal Data you provide to us or that we collect about you when you use the Services. For some of our Services, there are also specific terms and conditions that you must agree to before use.",
        "Vi behandlar dina personuppgifter när du använder våra tjänster (“tjänsterna”) på det sätt som anges nedan i den här integritetspolicyn. Vi värnar om din integritet och följer tillämplig lagstiftning som syftar till att skydda dig som individ. Den här integritetspolicyn anger grunden för hur vi behandlar de personuppgifter du lämnar till oss eller som vi samlar in om dig när du använder tjänsterna. För vissa av våra tjänster finns också särskilda villkor som du måste godkänna innan användning.",
      ),
      p(
        "If we make material changes to the Privacy Policy, we will notify you. The method of notifying you varies depending on which of our Services you use and when. You will always find our updated terms and conditions published on The Papaya Tree’s website.",
        "Om vi gör väsentliga ändringar i integritetspolicyn meddelar vi dig. Hur vi meddelar dig varierar beroende på vilken av våra tjänster du använder och när. Du hittar alltid våra uppdaterade villkor publicerade på The Papaya Trees webbplats.",
      ),
    ],
  ),
  section(
    "2. Collection and processing of personal data",
    "2. Insamling och behandling av personuppgifter",
    [
      p(
        "It is important to us that you feel safe with us. We always protect your privacy and take various measures to protect you as an individual. In this section, we describe how we collect and process your Personal Data.",
        "Det är viktigt för oss att du känner dig trygg hos oss. Vi skyddar alltid din integritet och vidtar olika åtgärder för att skydda dig som individ. I det här avsnittet beskriver vi hur vi samlar in och behandlar dina personuppgifter.",
      ),
      p(
        "Depending on which of our Services you use, the method of collection, the purposes and means of the processing may vary. Below is a description of the purposes for which The Papaya Tree processes your personal data.",
        "Beroende på vilken av våra tjänster du använder kan insamlingsmetod, ändamål och medel för behandlingen variera. Nedan beskrivs de ändamål för vilka The Papaya Tree behandlar dina personuppgifter.",
      ),
    ],
    [
      section("2.1 Bookings", "2.1 Bokningar", [], [
        section("2.1.1 Hotel reservation", "2.1.1 Hotellbokning", [
          p(
            "When you book a hotel room, optional products and services with us, regardless of whether the booking is made via our website, via an online booking channel, via a travel agency, or directly through our hotel, we process your Personal Data for the purpose of (a) giving you the opportunity to book a room according to your wishes, (b) administering and charging for your booking, (c) confirming the booking to you (booking confirmation) and (d) providing communications related to your stay, such as information on optional products and services.",
            "När du bokar ett hotellrum, tillval och tjänster hos oss, oavsett om bokningen görs via vår webbplats, via en onlinebokningskanal, via en resebyrå eller direkt genom vårt hotell, behandlar vi dina personuppgifter i syfte att (a) ge dig möjlighet att boka ett rum enligt dina önskemål, (b) administrera och ta betalt för din bokning, (c) bekräfta bokningen till dig (bokningsbekräftelse) och (d) lämna information som rör din vistelse, till exempel om tillval och tjänster.",
          ),
        ]),
      ]),
      section("2.2 Other services related to our hotel", "2.2 Övriga tjänster kopplade till vårt hotell", [
        p(
          "At The Papaya Tree, we offer services such as restaurant and bar, breakfast, room service, pool, laundry, parking, taxi order, free Wi-Fi, and similar services. If you use any of these Services at our hotel, your personal data may be processed in order to (a) administer those bookings and use of such additional service, (b) communicate and inform you about these bookings through our communication channels (e.g. email, SMS or phone), and (c) manage the costs incurred for such additional Services and/or facilities.",
          "På The Papaya Tree erbjuder vi tjänster som restaurang och bar, frukost, rumsservice, pool, tvätt, parkering, taxibeställning, gratis wifi och liknande tjänster. Om du använder någon av dessa tjänster på vårt hotell kan dina personuppgifter behandlas för att (a) administrera bokningarna och användningen av den tilläggstjänsten, (b) kommunicera och informera dig om bokningarna via våra kommunikationskanaler (till exempel e-post, sms eller telefon) och (c) hantera kostnader för sådana tilläggstjänster och anläggningar.",
        ),
      ]),
      section("2.3 Hotel check-in and check-out", "2.3 In- och utcheckning", [
        p(
          "When you stay at The Papaya Tree, we process your Personal Data for the purpose of (a) managing your arrival and departure from our hotel, (b) assigning you a key or key card to the booked room, (c) handling information about credit cards and/or other means of payment to ensure payment for your stay, (d) handling payment for your stay, (e) preparing, printing or sending an invoice for your stay, and (f) handling any customer service matters.",
          "När du bor på The Papaya Tree behandlar vi dina personuppgifter i syfte att (a) hantera din ankomst och avresa, (b) tilldela dig nyckel eller nyckelkort till det bokade rummet, (c) hantera uppgifter om kreditkort och andra betalningsmedel för att säkerställa betalning för vistelsen, (d) ta betalt för vistelsen, (e) upprätta, skriva ut eller skicka en faktura för vistelsen och (f) hantera eventuella kundärenden.",
        ),
        p(
          "If you fail to show up without cancellation or make your cancellation too late in accordance with The Papaya Tree’s booking rules, we will process your personal data for the purpose of (a) cancelling your stay and other bookings you may have made and (b) managing, processing and settling any outstanding amounts that may have fallen due.",
          "Om du uteblir utan avbokning eller avbokar för sent enligt The Papaya Trees bokningsregler behandlar vi dina personuppgifter i syfte att (a) avboka din vistelse och andra bokningar du kan ha gjort och (b) hantera, behandla och reglera eventuella utestående belopp som förfallit.",
        ),
      ]),
      section("2.4 Handling of personal data in e-mail", "2.4 Hantering av personuppgifter i e-post", [
        p(
          "In our daily work, we communicate with guests, partners and employees. Some of this contact is handled by e-mail and in connection with this, we also normally process personal data.",
          "I det dagliga arbetet kommunicerar vi med gäster, partners och medarbetare. En del av den kontakten sker via e-post, och i samband med det behandlar vi normalt också personuppgifter.",
        ),
      ]),
      section("2.5 Legal obligations", "2.5 Rättsliga skyldigheter", [
        p(
          "The Papaya Tree will, as a result of law, court or government decision, process your Personal Data for the purpose of complying with a legal obligation imposed on us (e.g. obligations we have under the Tax Act, the Accounting Act, decisions from the police or other authorities) and the personal data that will be processed is that which is required by law, court or government decision. The personal data may include information about your name, payment information, booking details, contact details (e.g. email address, telephone number, address) or other details of your completed purchases (receipts, and similar records).",
          "The Papaya Tree kommer, till följd av lag, domstols- eller myndighetsbeslut, att behandla dina personuppgifter i syfte att fullgöra en rättslig skyldighet som åligger oss (till exempel skyldigheter enligt skattelag, bokföringslag samt beslut från polis eller andra myndigheter). De personuppgifter som behandlas är de som krävs enligt lag, domstol eller myndighetsbeslut. Personuppgifterna kan omfatta namn, betalningsinformation, bokningsuppgifter, kontaktuppgifter (till exempel e-postadress, telefonnummer, adress) eller andra uppgifter om dina genomförda köp (kvitton och liknande underlag).",
        ),
      ]),
      section("2.6 Handling of customer service matters", "2.6 Hantering av kundärenden", [
        p(
          "We or our customer service subcontractor will process your Personal Data for the purpose of answering, assisting, following up or handling your customer service request. This includes the processing necessary to answer any questions you have asked us by phone, chat, email, social media or any of our other communication channels. We process your Personal Data, within the scope of this purpose, in order to investigate complaints or provide support, including technical support, to you.",
          "Vi eller vår underleverantör för kundservice behandlar dina personuppgifter i syfte att besvara, hjälpa till med, följa upp eller hantera ditt kundärende. Det omfattar den behandling som behövs för att svara på frågor du ställt till oss via telefon, chatt, e-post, sociala medier eller någon av våra andra kommunikationskanaler. Inom ramen för det här ändamålet behandlar vi dina personuppgifter för att utreda klagomål eller ge support, inklusive teknisk support.",
        ),
        p(
          "Personal data and other information that you provide to us via social media in connection with a customer service case will also be processed by the company behind the social media service (e.g. Meta). The provider of the social media channel will process your Personal Data as a data processor to us (e.g. when the supplier processes data on our behalf for the purpose of reporting statistics about individuals who have communicated with us via our channels) or as a separate data controller (e.g. for the provision and administration of their service).",
          "Personuppgifter och annan information som du lämnar till oss via sociala medier i samband med ett kundärende behandlas också av företaget bakom den sociala medietjänsten (till exempel Meta). Leverantören av kanalen behandlar dina personuppgifter som personuppgiftsbiträde till oss (till exempel när leverantören behandlar uppgifter för vår räkning för att rapportera statistik om personer som kommunicerat med oss via våra kanaler) eller som självständig personuppgiftsansvarig (till exempel för att tillhandahålla och administrera sin tjänst).",
        ),
      ]),
      section("2.7 Social media and online reviews", "2.7 Sociala medier och omdömen online", [
        p(
          "We may process your personal data when you communicate with us via our social media channels (e.g. Facebook, Instagram) or if you give us reviews via e.g. TripAdvisor. The purpose of the processing is to (a) be able to respond to your questions or complaints that you have written on social media, (b) monitor what is written about us and what reviews you leave about us, and (c) to be able to identify opportunities and also improve our Services.",
          "Vi kan behandla dina personuppgifter när du kommunicerar med oss via våra kanaler i sociala medier (till exempel Facebook, Instagram) eller om du lämnar omdömen via till exempel TripAdvisor. Syftet med behandlingen är att (a) kunna svara på frågor eller klagomål som du skrivit i sociala medier, (b) följa vad som skrivs om oss och vilka omdömen du lämnar om oss och (c) kunna identifiera möjligheter och förbättra våra tjänster.",
        ),
        p(
          "It is possible to write your own content on our social platforms. Keep in mind that everything that is written on our pages will be available to everyone who visits our pages and that you should therefore be careful about disclosing your personal data on these platforms.",
          "Det går att skriva eget innehåll på våra sociala plattformar. Tänk på att allt som skrivs på våra sidor är tillgängligt för alla som besöker sidorna, och att du därför bör vara försiktig med att lämna personuppgifter där.",
        ),
        p(
          "Please also read the respective Privacy Policy and Cookie Policy applicable to the social media platforms you use.",
          "Läs också den integritetspolicy och cookiepolicy som gäller för de sociala medieplattformar du använder.",
        ),
      ]),
      section("2.8 Camera surveillance at our hotel", "2.8 Kameraövervakning på vårt hotell", [
        p(
          "We use camera surveillance at our hotel for the purpose of preventing and investigating crime, accidents and/or damage to our hotel. Before any camera surveillance is carried out, we perform a balancing test in which the interests behind the surveillance at the individual hotel are weighed against the individual’s interest in not being monitored. Camera surveillance is only carried out if and to the extent we deem such surveillance necessary and the individual’s interest in not being monitored is overridden by the interests behind the surveillance.",
          "Vi använder kameraövervakning på vårt hotell i syfte att förebygga och utreda brott, olyckor och skada på vårt hotell. Innan kameraövervakning sker gör vi en intresseavvägning där intressena bakom övervakningen på det enskilda hotellet vägs mot individens intresse av att inte bli övervakad. Kameraövervakning sker bara om och i den utsträckning vi bedömer att den är nödvändig och individens intresse av att inte bli övervakad får stå tillbaka för intressena bakom övervakningen.",
        ),
      ]),
    ],
  ),
  section("3. How long is your personal data stored?", "3. Hur länge lagras dina personuppgifter?", [
    p(
      "Your Personal Data is stored for as long as it is necessary to fulfil the purposes of our processing. Thereafter, we will securely delete or de-identify your Personal Data so that it is no longer possible to link it to you. Under each processing as stated above, there is a defined storage period. Please note, however, that we may retain information about you for a longer period of time if litigation is initiated or if required by applicable law.",
      "Dina personuppgifter lagras så länge det behövs för att uppfylla ändamålen med vår behandling. Därefter raderar eller avidentifierar vi dina personuppgifter på ett säkert sätt så att de inte längre kan kopplas till dig. För varje behandling som anges ovan finns en fastställd lagringstid. Observera att vi kan behålla uppgifter om dig under längre tid om en tvist inleds eller om tillämplig lag kräver det.",
    ),
    p(
      "The Papaya Tree deletes Personal Data in accordance with the law applicable from time to time and in accordance with the criteria set out above. This means, for example, that The Papaya Tree deletes or de-identifies your Personal Data when the purpose of the processing has been fulfilled.",
      "The Papaya Tree raderar personuppgifter i enlighet med den lag som gäller vid varje tidpunkt och enligt kriterierna ovan. Det innebär till exempel att The Papaya Tree raderar eller avidentifierar dina personuppgifter när ändamålet med behandlingen har uppfyllts.",
    ),
  ]),
  section("4. How is your personal data protected?", "4. Hur skyddas dina personuppgifter?", [
    p(
      "Protecting your personal data is of the utmost importance to The Papaya Tree, which is why we have implemented the necessary organizational and technical security measures to ensure that your Personal Data is protected against e.g. loss, manipulation and unauthorized access. These measures include, among other things, training for our employees, processes for how we handle information and how we build our IT infrastructure.",
      "Att skydda dina personuppgifter är av största vikt för The Papaya Tree. Därför har vi infört de organisatoriska och tekniska säkerhetsåtgärder som behövs för att dina personuppgifter ska skyddas mot till exempel förlust, manipulation och obehörig åtkomst. Åtgärderna omfattar bland annat utbildning av våra medarbetare, processer för hur vi hanterar information och hur vi bygger vår it-infrastruktur.",
    ),
    p(
      "The purpose of our information security activities is to implement an appropriate level of information asset protection and preventive risk measures.",
      "Syftet med vårt informationssäkerhetsarbete är att åstadkomma en lämplig skyddsnivå för informationstillgångar och förebyggande riskåtgärder.",
    ),
    p(
      "Our employees receive training in data protection and are responsible for fulfilling their obligations. Our partners are also obliged to ensure that their employees comply with the same regulations as we do, and that their employees meet the requirements for processing personal data.",
      "Våra medarbetare får utbildning i dataskydd och ansvarar för att fullgöra sina skyldigheter. Våra partners är också skyldiga att se till att deras medarbetare följer samma regler som vi, och att deras medarbetare uppfyller kraven för behandling av personuppgifter.",
    ),
    p(
      "We continuously adapt our security measures to technological developments in order to maintain a high level of security.",
      "Vi anpassar löpande våra säkerhetsåtgärder till den tekniska utvecklingen för att hålla en hög säkerhetsnivå.",
    ),
  ]),
  section("5. Cookies", "5. Cookies", [
    {
      kind: "cookies",
      text: tx(
        "The Papaya Tree uses cookies through its digital Services that automatically collect Personal Data about you (e.g. IP address and behaviour patterns). We use cookies in order to improve your experience and the security of our digital Services. See our",
        "The Papaya Tree använder cookies via sina digitala tjänster som automatiskt samlar in personuppgifter om dig (till exempel IP-adress och beteendemönster). Vi använder cookies för att förbättra din upplevelse och säkerheten i våra digitala tjänster. Läs vår",
      ),
    },
  ]),
  section("Who do you contact if you have any questions", "Vem kontaktar du om du har frågor", [
    { kind: "email" },
    { kind: "whatsapp" },
    p(privacyUpdated.en, privacyUpdated.sv),
  ]),
]
