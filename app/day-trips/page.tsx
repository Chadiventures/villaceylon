import { AreaGroup } from "../../components/AreaGroup"
import { Cta } from "../../components/Cta"
import { GuideFollow } from "../../components/GuideCard"
import { PageHeader } from "../../components/PageHeader"
import { Section } from "../../components/Section"

export default function DayTripsPage() {
  return (
    <>
      <PageHeader eyebrow="Day trips" title="Worth the drive" />
      <Section>
        <div className="area-cards row">
          <AreaGroup
            title="Close to the garden"
            items={[
              { name: "Handunugoda Tea Estate", desc: "A working tea garden a short ride inland. Walk the bushes, then sit down for a cup." },
              { name: "Koggala Lake", desc: "A boat out to cinnamon island. Go in the morning, when the water is still." },
              { name: "The coastal train", desc: "The line runs past the gate. Ride a few stops toward Galle or Weligama, then come back the same way." },
              { name: "A quiet swim", desc: "Kabalana is the easy one. Dalawella, toward Unawatuna, is the quieter cove when you want more space." },
            ]}
          />
          <AreaGroup
            title="Galle and the bays"
            items={[
              { name: "Galle Fort", desc: "Dutch ramparts, cafes and little shops inside the old walls. The easiest wander, by tuk-tuk or bus." },
              { name: "Jungle Beach", desc: "A small cove just over the headland at Unawatuna. A short path down, and clear water at the bottom." },
              { name: "Japanese Peace Pagoda", desc: "A white stupa on Rumassala, with a long view back along the coast." },
              { name: "Yatagala Temple", desc: "A rock temple in the forest inland from Unawatuna. Usually still, and cool under the trees." },
            ]}
          />
          <AreaGroup
            title="A full day"
            items={[
              { name: "Tea country", desc: "Cool green hills, a tea estate and a slower pace. A long day, and a memorable one." },
              { name: "Yala safari", desc: "Leopards, elephants and buffalo in the park to the east. Leave early, before the heat." },
              { name: "Mulkirigala", desc: "A painted cave temple above the plains, near Tangalle. Climb in the morning." },
              { name: "Dondra Head", desc: "The lighthouse at the island's southern tip, about forty minutes east, with the sea on both sides." },
            ]}
          />
        </div>
      </Section>
      <GuideFollow />
      <Cta />
    </>
  )
}
