import { Bento } from "../../components/Bento"
import { Building } from "../../components/Building"
import { Cta } from "../../components/Cta"
import { GuideBand } from "../../components/GuideCard"
import { PageHeader } from "../../components/PageHeader"
import { Section } from "../../components/Section"

export default function HousePage() {
  return (
    <>
      <PageHeader eyebrow="On site" title="Your home under the palms" oneLine lead="Brand new AC rooms, a pool ringed with green, and the sea just past the gate. Everything you need, and nothing you have to think about." />
      <Section decor={<div className="blob" style={{ top: "12%", left: "-6%", width: 320, height: 320, background: "radial-gradient(circle,#7FA894,transparent 70%)" }} />}>
        <Bento />
      </Section>
      <Section decor={<div className="blob" style={{ top: "10%", right: "-6%", width: 320, height: 320, background: "radial-gradient(circle,#E3A24C,transparent 70%)" }} />}>
        <Building />
      </Section>
      <GuideBand />
      <Cta />
    </>
  )
}
