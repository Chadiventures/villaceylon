import { AreaGroup } from "../../components/AreaGroup"
import { Cta } from "../../components/Cta"
import { InfoList } from "../../components/InfoList"
import { PageHeader } from "../../components/PageHeader"
import { Section } from "../../components/Section"
import { photos } from "../../lib/photos"

const stiltFishing = photos.activities.stiltfishing

export default function ThingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Things to do"
        title={<>Small days,<br />well <em>spent</em></>}
        lead="You do not need a packed itinerary here. A few gentle things, close by, that make the days feel long in the best way."
      />
      <Section>
        <InfoList items={[
          { meta: "Dawn", title: "Stilt fishermen at Koggala", text: "The old way of fishing, best in the soft early light before the day heats up.", image: stiltFishing, imageAlt: "Stilt fisherman at Koggala, near The Papaya Tree in Ahangama" },
          { meta: "Afternoon", title: "Sauna and ice bath", text: "A wood-fired sauna and cold plunge near the beach, for after a long surf." },
          { meta: "Dusk", title: "River safari", text: "A quiet boat up the mangroves as the birds come in to roost." },
        ]} />
        <div className="area-list">
          <AreaGroup
            title="Snorkel with turtles"
            items={[
              { name: "Morning swim at Polhena", desc: "Go out with Aja, +94 774 220 007, to snorkel alongside green sea turtles close to shore." },
            ]}
          />
          <AreaGroup
            title="Shopping and a little pampering"
            items={[
              { name: "Hathu Roots", desc: "Jewellery, skincare, clothes and tattoos, in Ahangama." },
              { name: "Azure Swim and Azure Beauty", desc: "Swimwear and good sunscreen, plus manicures and pedicures, in Polhena." },
              { name: "Secret Root Spa", desc: "A relaxing massage in a peaceful garden, +94 773 294 332." },
            ]}
          />
          <AreaGroup
            title="After dark, in Ahangama"
            items={[
              { name: "Lamana", desc: "Skate sessions and parties, check their Instagram for what's on." },
              { name: "Trax", desc: "Drinks and dancing." },
            ]}
          />
        </div>
      </Section>
      <Cta />
    </>
  )
}
