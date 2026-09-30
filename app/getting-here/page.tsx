import { Cta } from "../../components/Cta"
import { InfoList } from "../../components/InfoList"
import { PageHeader } from "../../components/PageHeader"
import { Section } from "../../components/Section"

export default function GettingHerePage() {
  return (
    <>
      <PageHeader
        eyebrow="Getting here"
        title={<>Finding the garden <em>gate</em></>}
        lead="Ahangama sits on the south coast, an easy drive or a slow scenic train from Colombo. Here is how most guests arrive."
      />
      <Section>
        <InfoList items={[
          { meta: "Airport", title: "From Colombo (CMB)", text: "About 2 to 2.5 hours by car down the southern expressway. The easiest and most common route." },
          { meta: "Airport", title: "From Mattala (HRI)", text: "About 1.5 hours from the smaller southern airport, when flights line up." },
          { meta: "Train", title: "The coastal line", text: "A slow, beautiful train hugs the coast from Colombo to Ahangama station, a few minutes from the house." },
          { meta: "On arrival", title: "Getting around", text: "Tuk-tuks are everywhere and cheap. The surf and the town are both about three minutes away." },
        ]} />
      </Section>
      <Cta />
    </>
  )
}
