import { AreaGroup } from "../../components/AreaGroup"
import { Cta } from "../../components/Cta"
import { PageHeader } from "../../components/PageHeader"
import { Section } from "../../components/Section"

export default function EatPage() {
  return (
    <>
      <PageHeader eyebrow="Eat & drink" title="Where we actually eat" oneLine />
      <Section>
        <div className="sheet">
          <AreaGroup
            title="At the house"
            items={[
              { name: "Our own restaurant", desc: "Breakfast and easy plates on the ground floor, whenever you don't feel like going out." },
              { name: "The rooftop bar", desc: "A cold drink and a good view for the sunset, right upstairs." },
            ]}
            sections={[
              {
                title: "Food to your door",
                items: [
                  { name: "Uber Eats and Sri Delivery", desc: "Cover most local restaurants, for the nights you'd rather stay in." },
                ],
              },
            ]}
          />
          <AreaGroup
            title="In Ahangama"
            note="Food City, the grocery shop opposite Ceylon Sliders, covers anything you need day to day."
            items={[
              { name: "Ceylon Sliders", desc: "Brunch and dinner, and the Saturday sunset sessions once the season picks up." },
              { name: "Crust Ahangama", desc: "Wood-fired pizza and good drinks." },
              { name: "Moochies", desc: "Easy, unfussy breakfast and brunch." },
              { name: "Hotel De Uncle's", desc: "A beach bar built for sunset drinks." },
              { name: "Cocos Kitchen", desc: "Local and western plates, side by side." },
              { name: "Thelenis", desc: "Dinner with your feet almost in the sand." },
              { name: "Cafe Ceylon", desc: "A quiet coffee by the pool." },
              { name: "Odara", desc: "Local food and snacks, kept simple." },
            ]}
          />
          <AreaGroup
            title="Mirissa and Kamburugamuwa"
            items={[
              { name: "Petti Petti", desc: "Pool days and people watching, with events most weekends." },
              { name: "Paradise Beach Club", desc: "A big pool with food and drinks, though service can be slow." },
              { name: "Zouk, Central Beach, Mirissa Eye, Surf View", desc: "Casual, seafood-led restaurants right on the sand." },
              { name: "Zephyr Ceylon", desc: "Beachfront in Kamburugamuwa, five minutes past Mirissa, with an unusual fusion menu worth the detour." },
              { name: "Lost Paradise", desc: "A build-your-own brunch, meat options included." },
              { name: "Shady Lane", desc: "Vegetarian and stylish, a lovely brunch spot." },
              { name: "Milky Wave", desc: "Italian, pasta, gnocchi and gelato." },
              { name: "O Mirissa / Deltano's", desc: "The best pizza around, and a good rainy day plan." },
              { name: "No. 1 Dewmini Roti Shop", desc: "Cheap, honest rotis, fresh juice, and they teach a cooking class too." },
            ]}
          />
          <AreaGroup
            title="Weligama"
            items={[
              { name: "Hangtime", desc: "Breakfast, lunch and dinner looking over Weligama Bay." },
              { name: "Dulnetha", desc: "Local rice and curry, done well." },
              { name: "Nomad", desc: "The best brunch in the south, by our count." },
              { name: "Weligama Fish Market", desc: "Pick your seafood and sit on the beach while the day's catch is cooked local style. Fresh and delicious." },
              { name: "Kurumba Bay", desc: "Restaurants, bars, gelato, a pool and the beach in one place." },
              { name: "Kai Beach Club", desc: "A beachfront hangout with a pool." },
            ]}
          />
          <AreaGroup
            title="Matara and Polhena"
            items={[
              { name: "Matara Rest House", desc: "A colonial building with good local food and drinks." },
              { name: "The Dutchman Street", desc: "A cosy little beach cafe." },
              { name: "The Doctors House", desc: "Live music on Saturdays, DJs on Wednesdays, fine dining upstairs." },
            ]}
          />
          <AreaGroup
            title="Unawatuna"
            items={[
              { name: "The Hideout", desc: "Mexican food and great cocktails, in Unawatuna." },
              { name: "Skinny Tom's Deli", desc: "One of the best brunch spots on this stretch of coast." },
              { name: "Wild & The Sage", desc: "Cafe, bookshop and a book club, all in one." },
            ]}
          />
        </div>
      </Section>
      <Cta />
    </>
  )
}
