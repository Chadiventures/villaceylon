import { AreaGroup } from "../../components/AreaGroup"
import { Cta } from "../../components/Cta"
import { GuideCard } from "../../components/GuideCard"
import { PageHeader } from "../../components/PageHeader"
import { BasketIcon, BoardIcon, BoltIcon, BugIcon, CameraIcon, CardIcon, ClockIcon, DropIcon, PalmIcon, PawIcon, PermitIcon, RainIcon, RoadIcon, ScooterIcon, SimIcon, SunIcon, SunsetIcon, TempleIcon, TukIcon, WaveIcon, WildIcon } from "../../components/Icons"
import { Section } from "../../components/Section"

export default function AhangamaPage() {
  return (
    <>
      <PageHeader eyebrow="Good things to know" title="A few things worth knowing" />
      <Section>
        <div className="sheet">
          <AreaGroup
            title="Tap water"
            items={[
              { name: "Safe to drink, straight from the tap", desc: "The Papaya Tree is supplied with treated government water, so you can drink directly from the tap during your stay. Skip the plastic bottles, refill your glass and enjoy Sri Lanka with a little less waste.", icon: <DropIcon /> },
            ]}
          />
          <AreaGroup
            title="Getting around"
            items={[
              { name: "A driving permit", desc: "If you'd like to drive during your stay, you'll need the appropriate Sri Lankan driving permit. Tourists can arrange a temporary permit at Bandaranaike International Airport (BIA), or through approved local providers.", icon: <PermitIcon /> },
              { name: "Tuk-tuks", desc: "Tuk-tuks are one of the easiest ways to get around Ahangama and the surrounding coast. For longer journeys, we can help you arrange a local driver.", icon: <TukIcon /> },
              { name: "Scooters", desc: "A scooter is a great way to explore the south coast, from Ahangama and Kabalana to Midigama, Weligama and beyond. Sri Lanka drives on the left, so take your time, wear a helmet and make sure you have the correct permit and insurance.", icon: <ScooterIcon /> },
            ]}
          />
          <AreaGroup
            title="Everyday things"
            items={[
              { name: "Cash is still useful", desc: "Cards are accepted at many hotels, restaurants and cafes, but smaller local businesses, tuk-tuks and beach spots often prefer cash. It's always good to have some Sri Lankan rupees with you.", icon: <CardIcon /> },
              { name: "SIM cards and mobile data", desc: "Local SIM cards and eSIMs are easy to arrange. You can pick up a local SIM card at any communication shop, or arrange an eSIM before you arrive. Mobile data is useful for maps, WhatsApp, PickMe and staying connected while exploring the coast.", icon: <SimIcon /> },
              { name: "Food and groceries", desc: "Ahangama has everything from small local shops to supermarkets, bakeries, cafes and restaurants. Food City, opposite Ceylon Sliders, covers snacks, drinks and everyday essentials.", icon: <BasketIcon /> },
            ]}
          />
          <AreaGroup
            title="While you're here"
            items={[
              { name: "Support the street dogs", desc: "Sri Lanka has many free-roaming dogs. They are part of everyday life here, but please avoid approaching unfamiliar animals. Rabies is present in Sri Lanka. If you are bitten or scratched by a dog, cat or other potentially infected animal, wash the wound thoroughly with soap and running water and seek medical attention immediately. Don't wait for symptoms. If you'd like to help, follow @thedzikoproject.", icon: <PawIcon /> },
            ]}
          />
          <AreaGroup
            title="The ocean"
            items={[
              { name: "Swim with care", desc: "The ocean can look calm while currents are still strong. Check local conditions before swimming and ask locals or your surf instructor where conditions are suitable.", icon: <WaveIcon /> },
              { name: "Surf culture", desc: "Ahangama is surrounded by some of the south coast's best-known surf breaks. Whether you're a complete beginner or an experienced surfer, there are waves for different levels nearby.", icon: <BoardIcon /> },
            ]}
          />
          <AreaGroup
            title="Tropical life"
            items={[
              { name: "Mosquitoes", desc: "Mosquitoes are part of life in the tropics. We recommend bringing or buying insect repellent, especially around sunrise and sunset.", icon: <BugIcon /> },
              { name: "The sun is stronger than it feels", desc: "Even when the sky is cloudy, the tropical sun can be intense. Sunscreen, water and a hat will go a long way.", icon: <SunIcon /> },
              { name: "Tropical rain is normal", desc: "Ahangama can get sudden tropical showers, especially during the changing seasons. They often pass quickly, so don't let a little rain ruin your plans.", icon: <RainIcon /> },
            ]}
          />
          <AreaGroup
            title="Local culture"
            items={[
              { name: "Dress respectfully", desc: "Beach towns are relaxed, but temples and religious sites are more conservative. Cover your shoulders and knees when visiting temples and remove your shoes and hat where requested.", icon: <TempleIcon /> },
              { name: "Ask before taking photos", desc: "Always ask before photographing people, particularly monks, children or religious ceremonies.", icon: <CameraIcon /> },
            ]}
          />
          <AreaGroup
            title="Good to know"
            items={[
              { name: "Power cuts", desc: "Occasional power interruptions can happen in Sri Lanka. Keeping your phone and power bank charged is always a good idea.", icon: <BoltIcon /> },
              { name: "Left-side driving", desc: "Sri Lanka drives on the left-hand side of the road. Traffic can feel very different from what you're used to, especially on a scooter.", icon: <RoadIcon /> },
              { name: "Island time", desc: "Things don't always happen exactly on schedule here. A tuk-tuk might arrive a little late, lunch might take a little longer and plans can change with the weather. That's part of the island experience.", icon: <ClockIcon /> },
            ]}
          />
          <AreaGroup
            title="Wildlife"
            items={[
              { name: "Wildlife is wild", desc: "You may encounter monkeys, cows, dogs and other animals during your travels. Enjoy them from a distance and never feed wild animals.", icon: <WildIcon /> },
            ]}
          />
          <AreaGroup
            title="Explore beyond Ahangama"
            items={[
              { name: "Make the south coast your playground", desc: "Ahangama is a great base for exploring the south coast. Kabalana, Midigama, Weligama, Unawatuna, Galle and some of the area's quieter beaches are all within easy reach.", icon: <PalmIcon /> },
            ]}
          />
          <AreaGroup
            title="Take it slow"
            items={[
              { name: "Don't plan every minute", desc: "Some of the best moments in Sri Lanka aren't on an itinerary. Follow the coast, stop for a coconut, watch the sunset, find a small local cafe and see where the day takes you.", icon: <SunsetIcon /> },
            ]}
          />
        </div>
        <GuideCard plain page />
      </Section>
      <Cta />
    </>
  )
}
